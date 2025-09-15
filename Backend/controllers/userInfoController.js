import mongoose from "mongoose";
import Obj from "../models/objSchema.js";

export const userInfo = async (req, res, next) => {
  const { name, bio, location } = req.body;
  const userId = req.user.id;
  if (
    typeof name !== "string" ||
    typeof bio !== "string" ||
    typeof location !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Invalid Format" });
  }
  if (!userId || mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or no Id" });
  }
  try {
    const validUser = await Obj.findById(userId);
    if (!validUser) {
      return res.status(400).json({ success: false, message: "Invalid User" });
    }
    const userData = await Obj.findOneAndUpdate(
      { user: userId },
      { name, bio, location },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({
      success: true,
      message: "Info Updated",
      userInfo: {
        user: validUser.id,
        name: userData.name,
        bio: userData.bio,
        location: userData.location,
      },
    });
  } catch (error) {
    next(error);
  }
};
