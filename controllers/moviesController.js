import Movie from '../modules/Movies.js'

const getMovies = async (req, res) => {
  try {
    const limit = Number(req.query.limit)
    const page = Number(req.query.page)

    const movies = await Movie.find()

    if (!limit || !page) {
      return res.status(200).json({
        exitoso: true,
        datos: movies
      })
    }

    const start = (page - 1) * limit
    const end = start + limit

    const moviesQuery = movies.slice(start, end)

    res.status(200).json({
      exitoso: true,
      cantidad: movies.length,
      datos: moviesQuery
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'error al obtener el recurso',
      error: err.message
    })
  }
}

const getMovie = async (req, res) => {
  try {
    const { id } = req.params
    const findMovie = await Movie.findById(id)

    if (!findMovie) {
      return res.status(404).json({
        exitoso: false,
        mensaje: 'pelicula no encontrado',
      })
    }

    res.status(200).json({
      exitoso: true,
      datos: findMovie
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'error en el servidor',
      error: err.message
    })
  }
}

const postMovie = async (req, res) => {
  try {
    const { title, year, director, duration, poster, genre, rate } = req.body

    const newMovie = new Movie({
      title,
      year,
      director,
      duration,
      poster,
      genre,
      rate
    })

    const saveMovie = await newMovie.save()

    res.status(201).json({
      exitoso: true,
      mensaje: 'Pelicula nueva añadida',
      datos: saveMovie
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

const putMovie = async (req, res) => {
  try {
    const { id } = req.params
    const updateMovie = req.body

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateMovie,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!updatedMovie) {
      return res.status(404).json({
        exitoso: false,
        mensaje: 'pelicula no encontrada'
      })
    }
    res.status(200).json({
      exitoso: true,
      mensaje: 'pelicula actualizada'
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'error en el servidor',
      error: err.message
    })
  }
}

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params
    const deletedMovie = await Movie.findByIdAndDelete(id)

    if (!deletedMovie) {
      return res.status(404).json({
        exitoso: false,
        mensaje: 'pelicula no encontrada'
      })
    }

    res.status(200).json({
      mensaje: 'Pelicula eliminada'
    })
  } catch (err) {
    res.status(500).json({
      exitoso: false,
      mensaje: 'Error en el servidor',
      error: err.message
    })
  }
}

export {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie
}
