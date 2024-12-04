import express from 'express'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import {
  DeleteGish,
  GetAllGish,
  GetOneGish,
  GishCreateOne,
  UpdateGish
} from '../controllers/g.js'

const router = express.Router()

router.get('/', isExisted, IsAdmin, GetAllGish)
router.post('/create', isExisted, IsAdmin, GishCreateOne)
router.put('/:id', isExisted, UpdateGish)
router.delete('/:id', isExisted, IsAdmin, DeleteGish)
router.get('/getone/:id', isExisted, IsAdmin, GetOneGish)
export default router
