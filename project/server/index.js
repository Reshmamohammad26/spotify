import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/auth-demo')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Auth Middleware
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Protected Route Example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});