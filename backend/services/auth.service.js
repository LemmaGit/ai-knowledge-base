const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { sendEmail } = require("./../utils/email");
const { User } = require("../models");
const { tokenService } = require(".");
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

  const tokens = await tokenService.generateAuthTokens(user._id);

  return { user, isMatch, tokens };
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
  verifyEmail,
  login,
  refreshAuthToken,
  getUserByEmail,
  getUserById,
};
