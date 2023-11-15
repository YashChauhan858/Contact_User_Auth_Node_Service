import express from "express";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../controllers/index.js";

import validateToken from "../middleware/validateToken.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

// Using validateToken middleware as "/current" is a protected route
userRouter.get("/current", validateToken, getCurrentUser);

export default userRouter;
