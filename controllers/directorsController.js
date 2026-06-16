import Director from '../modules/Directors.js'

const getDirectors = async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)

    const directors = await Director.find().skip((page - 1) * limit).limit(limit)

    if (directors.length === 0) {
      return res.status(200).json({
        mensaje: 'no hay datos'
      })
    }

    res.status(200).json({
      exitoso: true,
      cantidad: directors.length,
      datos: directors
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'error en el servidor',
      error: err.message
    })
  }
}

const getDirector = async (req, res) => {
  try {
    const { id } = req.params
    const director = await Director.findById(id)

    if (!director) {
      return res.status(404).json({
        exitoso: false,
        mensaje: 'Director no encontrado'
      })
    }

    res.status(200).json({
      exitoso: true,
      datos: director
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

const postDirector = async (req, res) => {
  try {
    const { name, nationality, birthYear } = req.body

    const newDirector = new Director({
      name,
      nationality,
      birthYear
    })

    const saveDirector = await newDirector.save()

    res.status(201).json({
      exitoso: true,
      mensaje: 'Director guardado',
      datos: saveDirector
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error del servidor',
      error: err.message
    })
  }
}

const putDirector = async (req, res) => {
  try {
    const { id } = req.params

    const newDirector = req.body

    const updateDirector = await Director.findByIdAndUpdate(
      id,
      newDirector,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    res.status(200).json({
      exitoso: true,
      mensaje: 'Director actualizado',
      datos: updateDirector
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error con el servidor',
      error: err.message
    })
  }
}

const deleteDirector = async (req, res) => {
  try {
    const { id } = req.params

    const deletedDirector = await Director.findByIdAndDelete(id)

    if (!deletedDirector) {
      return res.status(404).json({
        exitoso: false,
        mensaje: 'Director no encontrado'
      })
    }

    res.status(200).json({ mensaje: 'Director eliminado' })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

export {
  getDirectors,
  getDirector,
  postDirector,
  putDirector,
  deleteDirector
}
