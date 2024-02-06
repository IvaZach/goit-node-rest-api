import { HttpError } from "../helpers/index.js";

const isEmptyBody = async (req, res, next) => {
  const keys = Object.keys(req.body);
  console.log(keys)
  if (!keys.length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};
export default isEmptyBody;
