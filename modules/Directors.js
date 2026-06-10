import mongoose from 'mongoose'

const directorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  nationality: {
    type: String,
    trim: true
  },
  birthYear: {
    type: Number,
    required: true,
    min: 1850,
    max: 2010,
    validate: {
      validator: Number.isInteger,
      message: 'El año debe ser un numero entero'
    }
  }
}, { timestamps: true })

export default mongoose.model('Director', directorSchema)
