# Online-course-reservation-system
Create a complete full-stack web application using the MERN stack (MongoDB, Express.js, React.js, Node.js) for an "Online Course Reservation System".

Requirements:

1. Backend (Node.js + Express):
- Create REST APIs for:
  - User registration and login (JWT authentication)
  - Fetch all courses
  - Book/register for a course
  - Payment simulation API (no real payment gateway, just mock success)
- Use MongoDB with Mongoose
- Preload database with sample data:
  - At least 5 users
  - At least 10 courses (title, description, price, duration, instructor)
- Use proper folder structure (models, routes, controllers)

2. Frontend (React):
- Pages:
  - Login / Register page
  - Home page (list of courses)
  - Course details page
  - Booking/Checkout page
  - My Courses dashboard
- Use Axios for API calls
- Use React Router for navigation
- Simple UI (no need for heavy styling, but clean layout)

3. Features:
- User can:
  - Register & login
  - View available courses
  - Select a course
  - Register/book the course
  - Simulate payment (success message)
- Store bookings in database

4. Additional:
- Add comments in code explaining each part
- Provide `.env` example file
- Include instructions to run:
  - Backend: npm install + npm start
  - Frontend: npm install + npm start
- Use separate folders:
  - /backend
  - /frontend

5. Output Format:
- Provide complete project code
- Clearly separate frontend and backend files
- Include sample MongoDB seed data script

Goal:
The project should run directly after installing dependencies and setting MongoDB connection, without needing extra coding.
