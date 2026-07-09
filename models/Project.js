import mongoose from 'mongoose';

const ApplicantSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: String,
  studentDegree: String,
  matchScore: {
    type: Number,
    default: 80
  },
  supervisor: {
    type: String,
    default: 'Dr. Evelyn Foster'
  }
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    default: '🏢'
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  businessProblem: {
    type: String
  },
  requiredSkills: [String],
  budget: {
    type: Number,
    required: [true, 'Please specify a budget in EGP']
  },
  timeline: {
    type: String,
    default: '8 Weeks'
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Intermediate'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Purchased'],
    default: 'Open'
  },
  studentTeam: String,
  supervisor: {
    type: String,
    default: 'Dr. Evelyn Foster'
  },
  applicantsCount: {
    type: Number,
    default: 0
  },
  applicants: [ApplicantSchema],
  submissionNotes: String,
  submissionLink: String,
  submittedAt: Date
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
