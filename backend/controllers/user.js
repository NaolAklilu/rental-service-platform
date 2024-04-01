import User from "../models/user.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { fullName, username, email, phoneNumber, password, address } =
    req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }

    const rounds = 10;
    const passwordSalt = bcrypt.genSaltSync(rounds);
    const hashedPassword = bcrypt.hashSync(password, passwordSalt);

    const newUser = await User.create({
      password: hashedPassword,
      fullName,
      username,
      email,
      address,
      phoneNumber,
    });

    const token = Jwt.sign(
      { username: newUser.username, id: newUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User Registered Successfully!",
      newUser: newUser,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credential" });
    }

    const token = Jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: "User logged in successfully!", existingUser, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { register, login };
