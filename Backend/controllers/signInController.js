import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import CrudUser from "../models/userSchema.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Required Fields Missing" });
  }
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).josn({ success: false, message: "invalid Format" });
  }
  try {
    const validUser = await CrudUser.findOne({ email });
    if (!validUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    /* catch handle this
    if (!token) {
      console.log("Error Generating token");
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }*/
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "User Signed In",
      user: {
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
      },
    });
  } catch (error) {
    next(err);
  }
};
