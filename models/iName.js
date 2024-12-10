import mongoose from 'mongoose'

const WorkerNameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    g: { type: [Object], default: [] } 
  },
  { timestamps: true }
)

const WorkerName = mongoose.model('WorkerName', WorkerNameSchema)
export default WorkerName
