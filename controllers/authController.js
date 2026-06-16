import jwt from 'jsonwebtoken'
import User from '../modules/User.js'

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
}

const register = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.create({ username, password })
    const token = generateToken(user._id)

    res.status(201).json({
      exitoso: true,
      mensaje: 'Usuario registrado',
      token
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        exitoso: false,
        mensaje: 'Credenciales inválidas'
      })
    }

    const token = generateToken(user._id)
    res.status(200).json({
      exitoso: true,
      token
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

export { register, login }
