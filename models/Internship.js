import mongoose from 'mongoose';

const InternshipSchema = new mongoose.Schema({
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
    default: '💼'
  },
  role: {
    type: String,
    required: [true, 'Please add internship role']
  },
  location: {
    type: String,
    required: [true, 'Please specify location']
  },
  salary: {
    type: String,
    default: 'Unpaid'
  },
  duration: {
    type: String,
    default: '3 Months'
  },
  skillsRequired: [String],
  description: String
}, { timestamps: true });

export default mongoose.model('Internship', InternshipSchema);
