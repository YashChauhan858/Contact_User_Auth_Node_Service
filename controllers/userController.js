import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

// @desc register a user
// @route POST /api/user/register
// @access public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(400);
      throw new Error("User already exist");
    }
    const hashpassword = await bcrypt.hash(password, 10);
    await userModel.create({
      username,
      email,
      password: hashpassword,
    });
    res.status(201).json({ _id: user._id, email: user.email });
  } catch (error) {
    next(error);
  }
};

// @desc login a user
// @route POST /api/user/login
// @access public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Fields are required");
    }
    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // jwt.sign(<payload_object>, secret, <o  ptions>)
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(404);
      throw new Error("Incorrect password or email");
    }
  } catch (error) {
    next(error);
  }
};

// @desc get current user info and is a private method
// @route POST /api/user/current
// @access private
const getCurrentUser = (req, res, next) => {
  res.status(200).json(req.userInfo);
};

export { registerUser, loginUser, getCurrentUser };
