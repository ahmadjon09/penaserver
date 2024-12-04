import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    phoneNumber: { type: Number, required: true }
  },
  { timestamps: true }
)

const Client = mongoose.model('Client', ClientSchema)
export default Client
