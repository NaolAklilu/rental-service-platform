import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: new Date().getFullYear(),
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  availabilityStatus: {
    type: String,
    required: true,
    enum: ["Available", "Booked", "Maintenance"], // Limits values
    default: "Available",
  },
  mileage: {
    type: Number,
    required: true,
    min: 0,
  },
  condition: {
    type: String,
    required: true,
    enum: ["used", "new"],
  },
  ownerId: {
    type: String,
    required: true,
  },
  carType: {
    type: String,
    enum: ["engine", "electric"],
    default: "engine",
  },
  pricing: {
    type: Number,
    required: true,
  },
  images: {
    type: String,
  },
  category: {
    type: String,
    enum: ["ordinary", "luxury"],
    default: "ordinary",
  },
  licensePlateNumber: {
    type: Number,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

export default Car;
