import { Router } from 'express'
import {
  getDirectors,
  getDirector,
  postDirector,
  putDirector,
  deleteDirector
} from '../controllers/directorsController.js'

const router = Router()

router.get('/', getDirectors)

router.get('/:id', getDirector)

router.post('/', postDirector)

router.put('/:id', putDirector)

router.delete('/:id', deleteDirector)

export default router
