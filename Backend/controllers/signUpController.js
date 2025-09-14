import bcrypt from "bcrypt";
import CrudUser from "../models/userSchema.js";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Required Fields Missing" });
  }
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Invalid Format" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ success: false, message: "Password too short" });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    /*if (!hashedPassword) { catch block handles these
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }*/
    const newUser = new CrudUser({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();
    /*if (!savedUser) { catch block handles these
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }*/
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists!" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(500)
        .json({ success: false, message: "DataBase Validation Error!", error });
    }
    next(error);
  }
};
