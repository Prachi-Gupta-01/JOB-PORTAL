/**register mai kya hota hai req se data lena hai ar agr pehle se hai to already exist else create kr denge */
import User from "../models/userModel.js";
export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //create new user
    const newUser = await User.create({ name, email, password });
    //generate token
    const token = newUser.generateToken();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      newUser: {
        name: newUser.name,
        email: newUser.email,
        locations: newUser.locations,
        lastName: newUser.lastName,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = user.generateToken();

    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        locations: user.locations,
        lastName: user.lastName,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
