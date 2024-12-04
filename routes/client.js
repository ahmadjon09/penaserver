import express from "express";
import {
  ClientCreate,
  DeleteClient,
  GetAllClients,
  GetOneClient,
  UpdateClient,
} from "../controllers/client.js";
import isExisted from "../middlewares/isExisted.js";
import IsAdmin from "../middlewares/IsAdmin.js";

const router = express.Router();

router.get("/", isExisted, IsAdmin, GetAllClients);
router.post("/create", ClientCreate);
router.put("/:id", isExisted, UpdateClient);
router.delete("/:id", isExisted, IsAdmin, DeleteClient);
router.get("/getone/:id", isExisted, IsAdmin, GetOneClient)
export default router;
