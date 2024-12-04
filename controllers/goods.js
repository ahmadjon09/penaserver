import Goods from '../models/goods.js';
const sendErrorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ message });
};

export const GetAllGoods = async (_, res) => {
    try {
        const goods = await Goods.find().sort({ createdAt: -1 });
        return res.json({
            data: goods,
        });
    } catch (error) {
        return sendErrorResponse(res, 500, "Ички сервер хатоси.");
    }
};

export const GoodsCreateOne = async (req, res) => {
    try {
        const { name, price, weight, count } = req.body;
        const newGoods = new Goods({
            name,
            price,
            weight,
            count,
        });
        newGoods.save();
        return res.status(201).json({
            data: newGoods
        });
    } catch (error) {
        return sendErrorResponse(res, 500, "Ички сервер хатоси.D");
    }
};
        
export const UpdateGoods = async (req, res) => {
    const goodsId = req.params.id;
    const { name, price, weight, count } = req.body;
    try {
        const updatedGoods = {
            name,
            price,
            weight,
            count,
        };

        const goods = await Goods.findByIdAndUpdate(goodsId, updatedGoods, {
            new: true,
            runValidators: true,
        });

        if (!goods) {
            return sendErrorResponse(res, 404, "Bu tavar topilmadi !");
        }

        return res.status(200).json({ data: goods });
    } catch (error) {
        return sendErrorResponse(res, 500, "Ички сервер хатоси.");
    }
};

export const GetOneGoods = async (req, res) => {
    const goodsId = req.params.id;
    try {
        const goods = await Goods.findById(goodsId);
        if (!goods) {
            return sendErrorResponse(res, 409, "Tavar topilmadi!");
        }
        return res.status(201).json({ data: goods });
    } catch (error) {
        return sendErrorResponse(res, 500, "Ички сервер хатоси.");
    }
};

export const DeleteGoods = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedGoods = await Goods.findByIdAndDelete(id);
        if (!deletedGoods) {
            return sendErrorResponse(res, 404, "Tavar topilmadi!");
        }
        return res.status(200).json({ message: "Tavar olib tashlandi" });
    } catch (error) {
        return sendErrorResponse(res, 500, "Ички сервер хатоси.C");
    }
};  