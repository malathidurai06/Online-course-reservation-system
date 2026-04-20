// ============================================================
// models/Booking.js - Mongoose schema/model for course bookings
// Links a User to a Course and tracks payment status
// ============================================================

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    // Reference to the user who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Reference to the booked course
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    // Amount paid at the time of booking (snapshot in case price changes later)
    amountPaid: {
      type: Number,
      required: true,
    },

    // Payment status lifecycle
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },

    // Mock transaction ID returned by the payment simulation
    transactionId: {
      type: String,
      default: '',
    },

    // Current enrollment status of the booking
    status: {
      type: String,
      enum: ['active', 'cancelled', 'completed'],
      default: 'active',
    },

    // Date when the booking was confirmed (set after payment success)
    bookedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// ── Compound Index ────────────────────────────────────────────
// Prevent a user from booking the same course more than once
bookingSchema.index({ user: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
