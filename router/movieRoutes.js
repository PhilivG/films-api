import { Router } from 'express'
import {
  getMovies,
  getMovie,
  postMovie,
  putMovie,
  deleteMovie
} from '../controllers/moviesController.js'
import { protect } from '../middlewares/auth.js'

const router = Router()

router.get('/', getMovies)

router.get('/:id', getMovie)

router.post('/', protect, postMovie)
router.put('/:id', protect, putMovie)
router.delete('/:id', protect, deleteMovie)

export default router
