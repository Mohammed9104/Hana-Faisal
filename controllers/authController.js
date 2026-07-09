import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { localUsers } from '../config/localDb.js';

// Generate Token helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d'
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  const { name, email, password, role, ...additionalData } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      // Local Memory Fallback Seeding
      const userExists = localUsers.find(u => u.email === email);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const newUser = {
        _id: 'local-' + Date.now(),
        name,
        email,
        password,
        role,
        skills: [],
        missingSkills: [],
        softSkills: [],
        completedProjects: [],
        certificates: [],
        enrolledCourses: [],
        ...additionalData
      };
      localUsers.push(newUser);
      
      return res.status(201).json({
        success: true,
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        token: generateToken(newUser._id)
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      ...additionalData
    });

    if (user) {
      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (mongoose.connection.readyState !== 1) {
      // Local Memory Login Fallback
      const user = localUsers.find(u => u.email === email);
      if (user && user.password === password) {
        return res.json({
          success: true,
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        success: true,
        data: req.user
      });
    }

    const user = await User.findById(req.user._id).populate('enrolledCourses');

    if (user) {
      res.json({
        success: true,
        data: user
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      // Local Memory Update Fallback
      const userIdx = localUsers.findIndex(u => u._id === req.user._id);
      if (userIdx !== -1) {
        const fieldsToUpdate = [
          'name', 'skills', 'missingSkills', 'softSkills', 
          'learningPaths', 'completedProjects', 'certificates',
          'enrolledCourses', 'gpa', 'university', 'degree',
          'companyName', 'logo', 'industry', 'location', 'description', 'collaborationLevel',
          'universityName', 'totalStudents', 'employmentRate'
        ];

        fieldsToUpdate.forEach(field => {
          if (req.body[field] !== undefined) {
            localUsers[userIdx][field] = req.body[field];
          }
        });

        return res.json({
          success: true,
          data: localUsers[userIdx]
        });
      } else {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
    }

    const user = await User.findById(req.user._id);

    if (user) {
      const fieldsToUpdate = [
        'name', 'skills', 'missingSkills', 'softSkills', 
        'learningPaths', 'completedProjects', 'certificates',
        'enrolledCourses', 'gpa', 'university', 'degree',
        'companyName', 'logo', 'industry', 'location', 'description', 'collaborationLevel',
        'universityName', 'totalStudents', 'employmentRate'
      ];

      fieldsToUpdate.forEach(field => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });

      const updatedUser = await user.save();
      const populated = await User.findById(updatedUser._id).populate('enrolledCourses');

      res.json({
        success: true,
        data: populated
      });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
