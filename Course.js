// ============================================================
// models/Course.js - Mongoose schema/model for courses
// Represents each course available for booking in the system
// ============================================================

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    // Course title shown in listings and details page
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },

    // Full description of what the course covers
    description: {
      type: String,
      required: [true, 'Course description is required'],
    },

    // Price in USD (stored as a number for arithmetic operations)
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },

    // Duration as a human-readable string, e.g. "6 weeks", "10 hours"
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },

    // Name of the instructor who teaches this course
    instructor: {
      type: String,
      required: [true, 'Instructor name is required'],
    },

    // Category tag for filtering (e.g. "Web Development", "Data Science")
    category: {
      type: String,
      default: 'General',
    },

    // URL for the course thumbnail/cover image
    image: {
      type: String,
      default: '',
    },

    // Average rating out of 5
    rating: {
      type: Number,
      default: 4.0,
      min: 0,
      max: 5,
    },

    // Total number of students who have enrolled
    enrolledCount: {
      type: Number,
      default: 0,
    },

    // Whether the course is currently available for booking
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
