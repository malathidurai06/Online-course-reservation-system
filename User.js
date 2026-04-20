// ============================================================
// models/User.js - Mongoose schema/model for application users
// Handles password hashing before saving via a pre-save hook
// ============================================================

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Full display name of the user
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    // Unique email used as the login identifier
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // Bcrypt-hashed password (never stored in plain text)
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },

    // Optional profile picture URL
    avatar: {
      type: String,
      default: '',
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// ── Pre-save Hook ─────────────────────────────────────────────
// Hash the password before saving a new user or when password changes
userSchema.pre('save', async function (next) {
  // Only hash if the password field was modified (avoids re-hashing on other updates)
  if (!this.isModified('password')) return next();

  // Salt rounds = 10 (good balance between security and performance)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ── Instance Method ───────────────────────────────────────────
// Compare a plain-text password against the stored hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
