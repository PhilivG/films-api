import mongoose from 'mongoose'
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El titulo es requerido'],
    trim: true,
    maxlength: 50,
  },
  year: {
    type: Number,
    min: 1900,
    max: 2026,
    validate: {
      validator: Number.isInteger,
      message: 'El año debe ser un número entero',
    }
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Director',
    minlength: 2,
    maxlength: 50
  },
  duration: {
    type: Number,
    min: 60,
    validate: {
      validator: Number.isInteger,
      message: 'La duracion debe ser un numero entero'
    }
  },
  poster: {
    type: String,
    validate: {
      validator: (v) => /^https?:\/\/.+\..+/.test(v),
      message: 'La URL no es válida',
    }
  },
  genre: {
    type: [String],
    enum: [
      'Action',
      'Adventure',
      'Animation',
      'Biography',
      'Crime',
      'Drama',
      'Fantasy',
      'Romance',
      'Sci-Fi',
    ]
  },
  rate: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Movie', movieSchema)
