const { status } = require("http-status");
const authService = require("./../services/auth.service");
const catchAsync = require("./../utils/catchAsync");

const signup = catchAsync(async (req, res) => {
  const user = await authService.signup(req.body);
  res.status(status.CREATED).json({
    user,
    message: "User registered. Please check your email to verify your account.",
  });
});

const verifyEmail = catchAsync(async (req, res) => {
  //TODO- make sure the req.query have the things necessary DO we need this?
  const user = await authService.verifyEmail(req.query);
  if (!user)
    return res
      .status(status.BAD_REQUEST)
      .json({ error: "Invalid token or email" });
  res
    .status(status.OK)
    .json({ message: "Email verified successfully. You can now log in." });
});

const login = catchAsync(async (req, res) => {
  const { user, isMatch, tokens } = await authService.login(req.body);
  if (!user)
    return res.status(status.NOT_FOUND).json({ error: "User not found" });

  if (!user.isVerified)
    return res
      .status(status.UNAUTHORIZED)
      .json({ error: "Please verify your email first" });

  if (!isMatch)
    return res
      .status(status.UNAUTHORIZED)
      .json({ error: "Invalid email & password" });

  res.status(status.OK).json({ user, tokens });
});

const confirmSignup = catchAsync(async (req, res) => {
  const { token, email } = req.query;
  const user = await authService.confirmSuccessfulSignup(token, email);
  if (!user)
    return res.status(status.NOT_FOUND).render("error.pug", {
      message: "User not found",
      helpText: "The account associated with this link doesn't exist.",
    });

  res.send(`
        <html>
          <head>
            <title>Email Verified</title>
            <meta http-equiv="refresh" content="0; url=${process.env.FRONTEND_URL}/login" />
          </head>
          <body>
            <p>Email successfully verified. Redirecting...</p>
            <script>
              window.location.href = "${process.env.FRONTEND_URL}/login";
            </script>
          </body>
        </html>
      `);
});

const refreshAuthToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthToken(req.body.refreshToken);
  res.status(httpStatus.OK).send({ ...tokens });
});

module.exports = {
  signup,
  confirmSignup,
  login,
  verifyEmail,
  refreshAuthToken,
};
