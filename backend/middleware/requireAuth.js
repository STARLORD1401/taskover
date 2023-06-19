import Users from "../models/Users.js";
import jwt from "jsonwebtoken";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send("Authorization Token required");
  } else {
    const token = authorization?.split(" ")[1];
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
      req.user = await Users.findOne({ _id }).select("_id");
      next();
    } catch (err) {
      console.log(err);
      res.status(401).send("Request is not authorized");
    }
  }
};

export default requireAuth;
