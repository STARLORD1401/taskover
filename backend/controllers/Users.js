import express from "express";
import Cors from "cors";
import Users from "../models/Users.js";
import bcrypt from "bcrypt";
var router = express.Router();
router.use(express.json());
router.use(Cors());
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const register = router.post("/register", async (req, res) => {
  const creds = req.body.creds;
  creds.password = bcrypt.hashSync(creds.password, bcrypt.genSaltSync());
  const parameterFound = await findByParameter({
    username: creds.username,
    email: creds.email,
  });
  if (parameterFound) {
    return res.status(500).send(`${parameterFound} already exists!`);
  }
  const newUser = new Users(creds);
  const token = createToken(newUser._id);
  res.status(201).send(token);
  await newUser.save();
});
const checkUser = router.post("/check-user", async (req, res) => {
  const username = req.body.username;
  const userFound = await findByParameter({ username });
  if (userFound) {
    res.status(200).send("User found!");
  } else {
    res.status(500).send("User does not exist");
  }
});
async function findByParameter(creds) {
  try {
    for (const cred in creds) {
      const user = await findUser({ [cred]: [creds[cred]] });
      if (user) {
        return cred;
      }
    }
  } catch (error) {
    return error;
  }
}
async function findUser(object) {
  const user = await Users.findOne(object);
  return user;
}
const login = router.post("/login", async (req, res) => {
  const creds = req.body.creds;
  try {
    const user = await findUser({ username: creds.username });
    if (user) {
      const match = bcrypt.compareSync(creds.password, user.password);
      if (match) {
        const token = createToken(user._id);
        res.status(200).send({
          user: { username: user.username, email: user.email },
          token,
        });
      } else {
        res.status(500).send("Incorrect password");
      }
    } else {
      res.status(404).send("User does not exist.");
    }
  } catch (err) {}
});
export default { register, login, checkUser };
