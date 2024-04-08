import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  addCar,
  deleteCar,
  getCars,
  getUserCars,
  updateCar,
  getCar,
} from "../controllers/car.js";

const router = express.Router();

router.post("/", authenticate, addCar);
router.put("/:id", authenticate, updateCar);
router.delete("/:id", authenticate, deleteCar);
router.get("/user", authenticate, getUserCars);
router.get("/:id", getCar);
router.get("/", getCars);

export default router;
