import Obj from "../models/objSchema";

export const userInfo = (req, res, next) => {
  const { name, bio, location } = req.body;
  if (
    typeof name !== "string" ||
    typeof bio !== "string" ||
    typeof location !== "string"
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Inavlid field types" });
  }
};
