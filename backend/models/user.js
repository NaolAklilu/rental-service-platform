import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: { type: String, require: true },
  username: { type: String, require: true },
  email: { type: String, require: true },
  phoneNumber: { type: String, require: true },
  password: { type: String, require: true },
  address: {
    country: { type: String, require: true },
    city: { type: String, require: true },
    street: { type: String },
    kebele: { type: String },
  },
});

const User = mongoose.model("User", userSchema);
export default User;
