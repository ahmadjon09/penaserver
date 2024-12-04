import mongoose from 'mongoose';

const WarehouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: Number, required: true }
}, { timestamps: true });

const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
export default Warehouse;
