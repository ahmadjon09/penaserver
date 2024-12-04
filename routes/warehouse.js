import express from "express";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";
import { DeleteWarehouse, GetAllWarehouse, GetOneWarehouse, UpdateWarehouse, WarehouseCreateOne } from "../controllers/warehouse.js";

const router = express.Router();

router.get("/",  GetAllWarehouse);
router.post("/create", WarehouseCreateOne);
router.put("/:id", isExisted, UpdateWarehouse);
router.delete("/:id", isExisted, IsAdmin, DeleteWarehouse);
router.get("/getone/:id", isExisted, IsAdmin, GetOneWarehouse)
export default router;
