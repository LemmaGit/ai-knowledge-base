const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      set: (val) =>
        val
          .trim()
          .split(" ")
          .filter(Boolean)
          .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
          .join(" "),
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
