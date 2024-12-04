import mongoose from 'mongoose'

const IshchiNameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true }
  },
  { timestamps: true }
)

const IshchiName = mongoose.model('Worker-name', IshchiNameSchema)
export default IshchiName
