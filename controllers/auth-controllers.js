import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const singup = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user) {
        throw HttpError(409, "Email already in use");
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
        email: newUser.email
    })
};

export default {
  singup: ctrlWrapper(singup),
};
