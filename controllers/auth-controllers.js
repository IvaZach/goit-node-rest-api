import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import User from "../models/User.js";
import gravatar from "gravatar";
import path from "path";
import Jimp from "jimp";
import { HttpError, notFoundResult } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;
const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL: avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Password is wrong");
  }
  const { subscription } = user;
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({});
};

const getCurrent = async (req, res) => {
  const { _id, email, subscription } = req.user;
  res.json({ _id, email, subscription });
};

const changeAvatar = async (req, res) => {
  const { _id } = req.user;

  if (req.file === undefined) {
    throw HttpError(400, "Bad path to file");
  }
  
  const { path: oldPath, filename } = req.file;

  console.log(req.file);

  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  Jimp.read(newPath, (err, image) => {
    if (err) throw HttpError(400, "Bad path to file");
    image.resize(250, 250).write(newPath);
  });

  const avatarURL = path.join("avatars", filename);

  const result = await User.findOneAndUpdate(_id, { avatarURL });
  notFoundResult(result);

  res.json({ avatarURL });
};

const changeSubscription = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;

  const result = await User.findOneAndUpdate(id, req.body);
  notFoundResult(result);
  res.json({ email, subscription: result.subscription });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  changeSubscription: ctrlWrapper(changeSubscription),
  changeAvatar: ctrlWrapper(changeAvatar),
};
