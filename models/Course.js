import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
    unique: true
  },
  category: {
    type: String,
    required: [true, 'Please specify category']
  },
  instructor: String,
  duration: String,
  rating: {
    type: Number,
    default: 4.5
  },
  image: {
    type: String,
    default: '💻'
  },
  description: String,
  curriculum: [String],
  recommendedFor: [String] // Maps projects it prepares students for (e.g. project IDs or skill tags)
}, { timestamps: true });

export default mongoose.model('Course', CourseSchema);
