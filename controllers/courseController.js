import mongoose from 'mongoose';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { localCourses, localUsers } from '../config/localDb.js';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
export const getCourses = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: localCourses });
    }
    const courses = await Course.find({});
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Enroll student in a course
// @route   POST /api/courses/:id/enroll
// @access  Private/Student
export const enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    if (mongoose.connection.readyState !== 1) {
      const course = localCourses.find(c => c._id === courseId || c.id === courseId);
      if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

      const studentIdx = localUsers.findIndex(u => u._id === req.user._id);
      if (studentIdx === -1) return res.status(404).json({ success: false, message: 'Student not found' });

      const enrolled = localUsers[studentIdx].enrolledCourses || [];
      const matchId = course._id || course.id;
      if (enrolled.includes(matchId)) {
        return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
      }

      enrolled.push(matchId);
      localUsers[studentIdx].enrolledCourses = enrolled;
      localUsers[studentIdx].careerReadinessScore = Math.min((localUsers[studentIdx].careerReadinessScore || 78) + 2, 100);

      return res.json({ success: true, user: localUsers[studentIdx] });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);

    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    user.enrolledCourses.push(course._id);
    user.careerReadinessScore = Math.min(user.careerReadinessScore + 2, 100);

    if (course.category.includes('Communication') || course.category.includes('Leadership')) {
      const idx = user.softSkills.findIndex(s => s.name === 'Communication');
      if (idx !== -1) user.softSkills[idx].score = Math.min(user.softSkills[idx].score + 5, 100);
    }

    await user.save();
    const populatedUser = await User.findById(user._id).populate('enrolledCourses');

    res.json({ success: true, user: populatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
