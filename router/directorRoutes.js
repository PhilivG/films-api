import { Router } from 'express'
import {
  getDirectors,
  getDirector,
  postDirector,
  putDirector,
  deleteDirector
} from '../controllers/directorsController.js'
import { protect } from '../middlewares/auth.js'

const router = Router()

router.get('/', getDirectors)

router.get('/:id', getDirector)

router.post('/', protect, postDirector)
router.put('/:id', protect, putDirector)
router.delete('/:id', protect, deleteDirector)

export default router
