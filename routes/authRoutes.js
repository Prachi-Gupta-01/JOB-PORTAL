import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

//router object
const router = express.Router();

//routes
//register route || post request
router.post("/register", registerController);

//login route || post request
router.post("/login", loginController);
//export router
export default router;
