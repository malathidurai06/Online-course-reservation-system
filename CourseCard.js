// ============================================================
// src/components/CourseCard.js - Reusable course listing card
// Displays a course thumbnail, key info, and a link to details
// ============================================================

import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

// Helper: render filled/empty stars based on a rating out of 5
const StarRating = ({ rating }) => {
  const stars = Math.round(rating);
  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  );
};

const CourseCard = ({ course }) => {
  const { _id, title, description, price, duration, instructor, category, image, rating, enrolledCount } = course;

  return (
    <div className="course-card card">
      {/* Course thumbnail */}
      <div className="course-card-img">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <div className="course-card-placeholder">📚</div>
        )}
        {/* Category badge overlaid on image */}
        <span className="course-card-badge badge badge-primary">{category}</span>
      </div>

      {/* Card body */}
      <div className="course-card-body">
        <h3 className="course-card-title">{title}</h3>
        <p className="course-card-desc">{description.slice(0, 100)}…</p>

        {/* Instructor and duration meta */}
        <div className="course-card-meta">
          <span>👨‍🏫 {instructor}</span>
          <span>⏱ {duration}</span>
        </div>

        {/* Rating row */}
        <div className="course-card-rating">
          <StarRating rating={rating} />
          <span className="rating-value">{rating.toFixed(1)}</span>
          <span className="rating-count">({enrolledCount?.toLocaleString()} students)</span>
        </div>

        {/* Footer: price + action */}
        <div className="course-card-footer">
          <span className="course-price">${price.toFixed(2)}</span>
          <Link to={`/courses/${_id}`} className="btn btn-primary">
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
