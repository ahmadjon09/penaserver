import express from "express";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";
import { DeleteGoods, GetAllGoods, GetOneGoods, GoodsCreateOne, UpdateGoods } from "../controllers/goods.js";

const router = express.Router();

router.get("/", isExisted, IsAdmin, GetAllGoods);
router.post("/create", isExisted, IsAdmin, GoodsCreateOne);
router.put("/:id", isExisted, UpdateGoods);
router.delete("/:id", isExisted, IsAdmin, DeleteGoods);
router.get("/getone/:id", isExisted, IsAdmin, GetOneGoods)
export default router;
