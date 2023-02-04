const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(403).json({ err: "user already exists" });
    }

    if (!validateName(name)) {
      return res.status(400).json({
        err: "Invalid user name: name must be longer than two characters and must not include any numbers or special characters",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ err: "Error: Invalid email" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        err: "Error: Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: "Welcome to stackoverflow" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length == 0) {
      return res.status(406).json({ err: "credentials does not match" });
    }

    if (password.length == 0) {
      return res.status(406).json({ err: "credentials does not match" });
    }

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ err: "user not exists" });
    }

    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(406).json({ err: "credentials does not match" });
    }

    const payload = { user: { _id: existingUser._id } };

    const bearerToken = jwt.sign(payload, process.env.JWT_SECRETE);
    return res.status(200).json({
      message: "Login  successful",
      bearerToken,
      user: existingUser,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

module.exports = { signin, signup };
