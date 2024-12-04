import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import ClientRoutes from './routes/client.js'
import AdminRoutes from './routes/admin.js'
import GoodsRoutes from './routes/goods.js'
import WareHouse from './routes/warehouse.js'
import Worker from './routes/i.js'
import Worker_Name from './routes/iName.js'
import Gish from './routes/g.js'

dotenv.config()

const app = express()

// CORS va JSON middleware
app.use(cors())
app.use(express.json())
app.use('/admin', AdminRoutes)
app.use('/client', ClientRoutes)
app.use('/goods', GoodsRoutes)
app.use('/warehouse', WareHouse)
app.use('/worker', Worker)
app.use('/gish', Gish)
app.use('/worker-name', Worker_Name)

// MongoDB bilan bog'lanish va serverni ishga tushirish
const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    )
  } catch (error) {
    console.error(error)
  }
}

startApp()
