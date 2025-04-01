import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message:
          "User already exists with the same email. Please enter different email",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User has been aded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occures",
    });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists. Plese register first.",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        name: checkUser.name,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        name: checkUser.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occures",
    });
  }
};

//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized user",
    });
  }
};
