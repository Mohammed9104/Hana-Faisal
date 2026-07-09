import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'company', 'university'],
    required: [true, 'Please specify user role']
  },
  
  // Student Profiles fields
  university: String,
  degree: String,
  gpa: String,
  careerReadinessScore: {
    type: Number,
    default: 70
  },
  skills: [String],
  missingSkills: [String],
  softSkills: [
    {
      name: String,
      score: Number
    }
  ],
  learningPaths: [
    {
      name: String,
      progress: Number
    }
  ],
  completedProjects: [
    {
      title: String,
      description: String,
      skillsUsed: [String],
      grade: String
    }
  ],
  certificates: [
    {
      title: String,
      issuedBy: String,
      issueDate: String
    }
  ],
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }
  ],

  // Company Profiles fields
  companyName: String,
  logo: {
    type: String,
    default: '🏢'
  },
  industry: String,
  location: String,
  description: String,
  collaborationLevel: {
    type: String,
    default: 'Academic Sponsor'
  },

  // University Profiles fields
  universityName: String,
  totalStudents: {
    type: Number,
    default: 1000
  },
  employmentRate: {
    type: Number,
    default: 80.0
  }
}, { timestamps: true });

// Encrypt password using bcryptjs
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
