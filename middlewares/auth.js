import jwt from 'jsonwebtoken'
import User from '../modules/User.js'

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      exitoso: false,
      mensaje: 'Token requerido'
    })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch (err) {
    res.status(401).json({
      exitoso: false,
      mensaje: 'Token inválido o expirado'
    })
  }
}

export { protect }
