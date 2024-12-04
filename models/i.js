import mongoose from 'mongoose'

const IshchiSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
)

const Ishchi = mongoose.model('Worker', IshchiSchema)
export default Ishchi
