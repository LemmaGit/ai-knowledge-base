const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("./../utils/email");
const { User } = require("../models");
const tokenService = require("./token.service");
const { tokenTypes } = require("../config/tokens");

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (id) => {
  return await User.findById(id);
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
  try {
    await sendEmail(user.name, user.email, verificationToken);
  } catch (err) {
    await user.deleteOne();
    throw new Error(err.message || "Something went wrong");
  }
  return user;
};

const login = async (userCredentials) => {
  const { email, password } = userCredentials;
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);

  const tokens = await tokenService.generateAuthTokens(user._id);

  return { user, isMatch, tokens };
};

const confirmSuccessfulSignup = async (token, email) => {
  try {
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return null;
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const refreshAuthToken = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) throw new Error();
    await refreshTokenDoc.deleteOne();
    return tokenService.generateAuthTokens(user.id);
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

module.exports = {
  signup,
  confirmSuccessfulSignup,
  login,
  refreshAuthToken,
  getUserByEmail,
  getUserById,
};
