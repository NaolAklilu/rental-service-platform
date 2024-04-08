import express from "express";
import {
  AddHouse,
  DeleteHouse,
  GetHouse,
  GetHouses,
  GetUserHouses,
  UpdateHouse,
} from "../controllers/house.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/", authenticate, AddHouse);
router.put("/:id", authenticate, UpdateHouse);
router.delete("/:id", authenticate, DeleteHouse);
router.get("/:id", GetHouse);
router.get("/", GetHouses);
router.get("/user", authenticate, GetUserHouses);

export default router;
