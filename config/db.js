import mongoose from 'mongoose'

const conectartDB = async () => {
  try {
    const conexion = await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB conectada:', conexion.connection.host)
    return conexion
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}

export default conectartDB
