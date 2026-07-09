import mongoose from 'mongoose';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { localProjects } from '../config/localDb.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: localProjects });
    }
    const projects = await Project.find({}).populate('company', 'name companyName logo industry location');
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const project = localProjects.find(p => p._id === req.params.id || p.id === req.params.id);
      if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
      return res.json({ success: true, data: project });
    }
    const project = await Project.findById(req.params.id).populate('company', 'name companyName logo industry location');
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a project (Company only)
// @route   POST /api/projects
// @access  Private/Company
export const createProject = async (req, res) => {
  try {
    const { title, description, businessProblem, requiredSkills, budget, timeline, difficulty } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const project = {
        _id: 'proj-' + Date.now(),
        company: req.user._id,
        companyName: req.user.companyName || req.user.name,
        logo: req.user.logo || '🏢',
        title,
        description,
        businessProblem,
        requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : requiredSkills.split(',').map(s => s.trim()),
        budget: Number(budget),
        timeline,
        difficulty,
        status: 'Open',
        applicantsCount: 0,
        applicants: []
      };
      localProjects.push(project);
      return res.status(201).json({ success: true, data: project });
    }

    const project = await Project.create({
      company: req.user._id,
      companyName: req.user.companyName || req.user.name,
      logo: req.user.logo || '🏢',
      title,
      description,
      businessProblem,
      requiredSkills,
      budget,
      timeline,
      difficulty
    });

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = localProjects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      
      const fields = ['title', 'description', 'businessProblem', 'requiredSkills', 'budget', 'timeline', 'difficulty', 'status', 'studentTeam', 'supervisor'];
      fields.forEach(field => {
        if (req.body[field] !== undefined) {
          localProjects[idx][field] = req.body[field];
        }
      });
      return res.json({ success: true, data: localProjects[idx] });
    }

    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.company.toString() !== req.user._id.toString() && req.user.role !== 'university') {
      return res.status(403).json({ success: false, message: 'Not authorized to edit this project' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Company
export const deleteProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = localProjects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });
      localProjects.splice(idx, 1);
      return res.json({ success: true, message: 'Project removed' });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    if (project.company.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this project' });
    }

    await project.deleteOne();
    res.json({ success: true, message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Apply for a project (Student only)
// @route   POST /api/projects/:id/apply
// @access  Private/Student
export const applyForProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = localProjects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });

      // Calculate score
      let matchCount = 0;
      const skillsReq = localProjects[idx].requiredSkills || [];
      const studentSkills = req.user.skills || [];
      skillsReq.forEach(reqSkill => {
        if (studentSkills.some(studentSkill => studentSkill.toLowerCase() === reqSkill.toLowerCase())) {
          matchCount++;
        }
      });
      
      const matchScore = skillsReq.length > 0 
        ? Math.round((matchCount / skillsReq.length) * 100) 
        : 80;

      const applicant = {
        student: req.user._id,
        studentName: req.user.name,
        studentDegree: req.user.degree || 'B.S. in Computer Science',
        matchScore,
        supervisor: 'Dr. Evelyn Foster'
      };

      // Set In Progress for simulation simplicity
      localProjects[idx].status = 'In Progress';
      localProjects[idx].studentTeam = req.user.name;
      localProjects[idx].supervisor = 'Dr. Evelyn Foster';
      localProjects[idx].applicants.push(applicant);
      localProjects[idx].applicantsCount = localProjects[idx].applicants.length;

      return res.json({ success: true, data: localProjects[idx] });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const alreadyApplied = project.applicants.some(app => app.student.toString() === req.user._id.toString());
    if (alreadyApplied) {
      return res.status(400).json({ success: false, message: 'You have already applied for this challenge' });
    }

    let matchCount = 0;
    project.requiredSkills.forEach(reqSkill => {
      if (req.user.skills.some(studentSkill => studentSkill.toLowerCase() === reqSkill.toLowerCase())) {
        matchCount++;
      }
    });
    
    const matchScore = project.requiredSkills.length > 0 
      ? Math.round((matchCount / project.requiredSkills.length) * 100) 
      : 80;

    const applicant = {
      student: req.user._id,
      studentName: req.user.name,
      studentDegree: req.user.degree || 'B.S. in Computer Science',
      matchScore,
      supervisor: 'Dr. Evelyn Foster'
    };

    project.applicants.push(applicant);
    project.applicantsCount = project.applicants.length;
    project.status = 'In Progress';
    project.studentTeam = req.user.name;

    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Submit project solution (Student only)
// @route   POST /api/projects/:id/submit
// @access  Private/Student
export const submitProjectSolution = async (req, res) => {
  try {
    const { submissionNotes, submissionLink } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const idx = localProjects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });

      localProjects[idx].submissionNotes = submissionNotes;
      localProjects[idx].submissionLink = submissionLink;
      localProjects[idx].status = 'Completed';
      localProjects[idx].submittedAt = new Date();

      return res.json({ success: true, data: localProjects[idx] });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.submissionNotes = submissionNotes;
    project.submissionLink = submissionLink;
    project.status = 'Completed';
    project.submittedAt = Date.now();

    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Purchase project solution (Company only)
// @route   POST /api/projects/:id/purchase
// @access  Private/Company
export const purchaseProject = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const idx = localProjects.findIndex(p => p._id === req.params.id || p.id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Project not found' });

      localProjects[idx].status = 'Purchased';
      return res.json({ success: true, data: localProjects[idx] });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    project.status = 'Purchased';
    await project.save();
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
