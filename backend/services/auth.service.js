const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { status } = require("http-status");
const { sendEmail } = require("./../utils/email");
const { User } = require("../models");

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new Error(err.message || "Something went wrong");
  }
};

const signup = async (data) => {
  const { name, email, password } = data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
  });

  // Send verification email
  await sendEmail(email, verificationToken);
  return user;
};

const verifyEmail = async (query) => {
  //TODO: Do I need to add a response where the required fields are not found or not
  const { email, token } = query;
  const user = await User.findOne({ email, verificationToken: token });
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  return user;
};

const login = async (userCredentials) => {
  const { email, password } = userCredentials;
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return { user, isMatch, token };
};

module.exports = {
  signup,
  verifyEmail,
  login,
  getUserByEmail,
};
