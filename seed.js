// ============================================================
// seed.js - Database Seeder Script
// Populates MongoDB with sample users and courses
// Run with: npm run seed  OR  node seed.js
// ============================================================

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Course = require('./models/Course');
const Booking = require('./models/Booking');

dotenv.config();

// ── Sample Users ──────────────────────────────────────────────
const sampleUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password123',
  },
  {
    name: 'Carol Williams',
    email: 'carol@example.com',
    password: 'password123',
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    password: 'password123',
  },
  {
    name: 'Eva Martinez',
    email: 'eva@example.com',
    password: 'password123',
  },
];

// ── Sample Courses ────────────────────────────────────────────
const sampleCourses = [
  {
    title: 'The Complete JavaScript Bootcamp',
    description:
      'Master JavaScript from beginner to advanced. Covers ES6+, async programming, DOM manipulation, and modern JS patterns used in real-world applications.',
    price: 49.99,
    duration: '40 hours',
    instructor: 'John Doe',
    category: 'Web Development',
    rating: 4.8,
    enrolledCount: 1240,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
  },
  {
    title: 'React & Redux: The Complete Guide',
    description:
      'Build powerful React applications with Redux state management. Includes React Hooks, Context API, React Router, and deploying to production.',
    price: 59.99,
    duration: '35 hours',
    instructor: 'Jane Smith',
    category: 'Web Development',
    rating: 4.7,
    enrolledCount: 980,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
  },
  {
    title: 'Python for Data Science & Machine Learning',
    description:
      'Learn Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-Learn, and TensorFlow. Includes real-world projects and Kaggle datasets.',
    price: 79.99,
    duration: '50 hours',
    instructor: 'Dr. Emily Chen',
    category: 'Data Science',
    rating: 4.9,
    enrolledCount: 2150,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
  },
  {
    title: 'Node.js & Express: Backend Development',
    description:
      'Build scalable REST APIs with Node.js, Express, MongoDB, and JWT authentication. Covers MVC architecture, middleware, and deployment with Docker.',
    price: 54.99,
    duration: '30 hours',
    instructor: 'Michael Brown',
    category: 'Backend Development',
    rating: 4.6,
    enrolledCount: 760,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
  },
  {
    title: 'UI/UX Design with Figma',
    description:
      'Design beautiful, user-centric interfaces using Figma. Covers wireframing, prototyping, design systems, and user research methodologies.',
    price: 44.99,
    duration: '25 hours',
    instructor: 'Sarah Lee',
    category: 'Design',
    rating: 4.8,
    enrolledCount: 890,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
  },
  {
    title: 'AWS Cloud Practitioner Certification Prep',
    description:
      'Pass the AWS Cloud Practitioner exam with confidence. Covers core AWS services, security, billing, and architectural best practices.',
    price: 69.99,
    duration: '20 hours',
    instructor: 'Robert Wilson',
    category: 'Cloud & DevOps',
    rating: 4.7,
    enrolledCount: 1380,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
  },
  {
    title: 'Digital Marketing Masterclass',
    description:
      'Complete digital marketing course covering SEO, Google Ads, Facebook Marketing, email campaigns, and analytics to grow any business online.',
    price: 39.99,
    duration: '28 hours',
    instructor: 'Laura Thompson',
    category: 'Marketing',
    rating: 4.5,
    enrolledCount: 1650,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
  },
  {
    title: 'Ethical Hacking & Cybersecurity',
    description:
      'Learn penetration testing, network security, ethical hacking techniques, and how to protect systems from real-world attacks. CEH exam prep included.',
    price: 89.99,
    duration: '45 hours',
    instructor: 'Kevin Zhang',
    category: 'Cybersecurity',
    rating: 4.8,
    enrolledCount: 920,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400',
  },
  {
    title: 'Flutter & Dart: Cross-Platform Mobile Apps',
    description:
      'Build iOS and Android apps with a single codebase using Flutter and Dart. Covers navigation, state management (Provider & Bloc), and Firebase integration.',
    price: 64.99,
    duration: '38 hours',
    instructor: 'Priya Patel',
    category: 'Mobile Development',
    rating: 4.6,
    enrolledCount: 720,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
  },
  {
    title: 'SQL & Database Design for Beginners',
    description:
      'Master SQL from scratch. Learn queries, joins, subqueries, indexing, stored procedures, and database design principles with PostgreSQL and MySQL.',
    price: 34.99,
    duration: '22 hours',
    instructor: 'Anna Rodriguez',
    category: 'Databases',
    rating: 4.7,
    enrolledCount: 1120,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
  },
];

// ── Seed Function ─────────────────────────────────────────────
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/course_reservation');
    console.log('✅ Connected to MongoDB');

    // Clear existing data to avoid duplicates
    await Booking.deleteMany({});
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash passwords and insert users
    const usersWithHashedPw = await Promise.all(
      sampleUsers.map(async (u) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(u.password, salt);
        return { ...u, password: hashedPw };
      })
    );
    await User.insertMany(usersWithHashedPw);
    console.log(`👥 Inserted ${sampleUsers.length} users`);

    // Insert courses
    await Course.insertMany(sampleCourses);
    console.log(`📚 Inserted ${sampleCourses.length} courses`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('─────────────────────────────────────────');
    console.log('You can log in with any of these accounts:');
    sampleUsers.forEach((u) => {
      console.log(`  📧 ${u.email}  🔑 ${u.password}`);
    });
    console.log('─────────────────────────────────────────\n');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
};

seedDatabase();
