import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT ?? 1234

const servidor = app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

process.on('unhandledRejection', err => {
  console.log('Promise reject', err)
  servidor.close(() => process.exit(1))
})
