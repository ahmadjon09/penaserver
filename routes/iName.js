import express from 'express'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import {
  DeleteIshName,
  GetAllIshName,
  GetOneIshName,
  IshNameCreateOne,
  UpdateIshName
} from '../controllers/iName.js'

const router = express.Router()

router.get('/', isExisted, IsAdmin, GetAllIshName)
router.post('/create', isExisted, IsAdmin, IshNameCreateOne)
router.put('/:id', isExisted, UpdateIshName)
router.delete('/:id', isExisted, IsAdmin, DeleteIshName)
router.get('/getone/:id', isExisted, IsAdmin, GetOneIshName)
export default router
