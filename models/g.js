import mongoose from 'mongoose'

const GishSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    count: { type: Number, required: true }
  },
  { timestamps: true }
)

const Gish = mongoose.model('g', GishSchema)
export default Gish
