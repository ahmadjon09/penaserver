import express from 'express'
import isExisted from '../middlewares/isExisted.js'
import IsAdmin from '../middlewares/IsAdmin.js'
import {
  DeleteWorkerName,
  GetAllWorkerName,
  GetOneWorkerName,
  WorkerNameCreateOne,
  // UpdateWorkerName
} from '../controllers/iName.js'

const router = express.Router()

router.get('/', isExisted, IsAdmin, GetAllWorkerName)
router.post('/create', isExisted, IsAdmin, WorkerNameCreateOne)
// router.put('/:id', isExisted, UpdateWorkerName)
router.delete('/:id', isExisted, IsAdmin, DeleteWorkerName)
router.get('/getone/:id', isExisted, IsAdmin, GetOneWorkerName)
export default router
