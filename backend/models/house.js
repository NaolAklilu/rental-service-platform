import mongoose from "mongoose";

const houseSchema = mongoose.Schema({
  description: { type: String, require: true },
  address: {
    city: { type: String, require: true },
    state: { type: String },
    street: { type: String },
    kebele: { type: String, require: true },
  },
  houseType: {
    type: String,
    enum: ["house", "apartment", "condominium"],
    default: "house",
  },
  bedrooms: { type: Number, require: true },
  bathrooms: { type: Number, require: true },
  squareFootage: { type: Number, require: true },
  furnished: { type: Boolean, default: false },
  rentPrice: { type: Number, require: true },
  depositAmount: { type: Number, require: true },
  availableStatus: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  images: { type: String, require: true },
  petsAllowed: { type: String, default: true },
  ownerId: { type: String, require: true },
});

const House = mongoose.model("House", houseSchema);
export default House;
