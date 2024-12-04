import express from 'express'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import {
  DeleteISh,
  GetAllISh,
  GetOneISh,
  IShCreateOne,
  UpdateISh
} from '../controllers/i.js'

const router = express.Router()

router.get('/', isExisted, IsAdmin, GetAllISh)
router.post('/create', isExisted, IsAdmin, IShCreateOne)
router.put('/:id', isExisted, UpdateISh)
router.delete('/:id', isExisted, IsAdmin, DeleteISh)
router.get('/getone/:id', isExisted, IsAdmin, GetOneISh)
export default router
