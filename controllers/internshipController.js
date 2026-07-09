import mongoose from 'mongoose';
import Internship from '../models/Internship.js';
import { localInternships } from '../config/localDb.js';

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: localInternships });
    }
    const internships = await Internship.find({});
    res.json({ success: true, data: internships });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create internship (Company only)
// @route   POST /api/internships
// @access  Private/Company
export const createInternship = async (req, res) => {
  try {
    const { role, location, salary, duration, skillsRequired, description } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const internship = {
        _id: 'int-' + Date.now(),
        company: req.user._id,
        companyName: req.user.companyName || req.user.name,
        logo: req.user.logo || '🏢',
        role,
        location,
        salary,
        duration,
        skillsRequired: Array.isArray(skillsRequired) ? skillsRequired : skillsRequired.split(',').map(s => s.trim()),
        description
      };
      localInternships.push(internship);
      return res.status(201).json({ success: true, data: internship });
    }

    const internship = await Internship.create({
      company: req.user._id,
      companyName: req.user.companyName || req.user.name,
      logo: req.user.logo || '🏢',
      role,
      location,
      salary,
      duration,
      skillsRequired,
      description
    });

    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
