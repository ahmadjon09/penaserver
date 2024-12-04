import mongoose from 'mongoose';

const GoodsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: Number, required: true },
    count: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

const Goods = mongoose.model('Goods', GoodsSchema);
export default Goods;
