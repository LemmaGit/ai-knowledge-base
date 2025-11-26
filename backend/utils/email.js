const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
exports.sendEmail = async (username, to, token) => {
  try {
    const { emailInfo, frontendURL } = require("./../config/config");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailInfo.username,
        pass: emailInfo.password,
      },
    });

    const verificationUrl = `${frontendURL}/verify-email?token=${token}&email=${to}`;
    const templatePath = path.join(
      __dirname,
      "../views/verification-email.pug"
    );

    const html = pug.renderFile(templatePath, {
      username,
      to,
      verificationUrl,
    });

    const mailOptions = {
      from: emailInfo.username,
      to,
      subject: "Verify your AI-Knowledge-Base account",
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    throw new Error("Unable to send mail.");
  }
};
