import dns from 'dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import express from 'express'
import conectarDB from './config/db.js'
import movieRouter from './router/movieRoutes.js'
import directorRouter from './router/directorRoutes.js'
import authRouter from './router/authRoutes.js'

conectarDB()

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/movies', movieRouter)
app.use('/directors', directorRouter)

app.get('/', (req, res) => {
  res.json('API funcionando!!')
})

export default app
