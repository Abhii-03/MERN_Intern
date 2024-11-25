const User = require("../models/userData");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: false, message: "Please fill all the fielddds" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ status: false, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const jwtoken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(200).json({
      success: true,
      result: { user, token: jwtoken },
      message: "User signup successfully",
    });

    // if (user) {
    //   const existingUser = {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //   };
    //   return res.status(201).json({
    //     status: true,
    //     result: {user: existingUser, token: jwtoken },
    //     message:"signup successfull"
    //   });
    //   // res.status(201).json({ _id: user._id, name: user.name, email: user.email, pic: user.pic, token: jwtoken })
    // } else {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Failed to Create User" });
    // }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
      message: "Failed to Create User",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({
      success: true,
      result: { user: existingUser, token },
      message: "Login successfull",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
