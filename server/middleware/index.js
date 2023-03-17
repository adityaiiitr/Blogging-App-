import User from "../models/user";
import expressJwt from "express-jwt";
require("dotenv").config();

// req.user = _id
// here we are checking that does the user require sign in or not
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

// here we are checking that user role is admin or subscriber

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "Admin") {
      return res.status(403).send("Unauhorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
