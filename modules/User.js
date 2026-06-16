import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El username es requerido'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6
  }
}, { timestamps: true })

// Se ejecuta automáticamente antes de cada .save()
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next
  this.password = await bcrypt.hash(this.password, 10)
})

/* userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate()

  if (update.password) {
    update.password = await bcrypt.hash(update.password, 10)
  }

  next
}) */

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', userSchema)
