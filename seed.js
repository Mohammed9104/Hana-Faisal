import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './models/User.js';
import Project from './models/Project.js';
import Course from './models/Course.js';
import Internship from './models/Internship.js';

// Resolve directory paths in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env variables (from root directory)
dotenv.config({ path: path.join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/careerbridge');
    console.log('📡 Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany({});
    await Project.deleteMany({});
    await Course.deleteMany({});
    await Internship.deleteMany({});
    console.log('🗑️ Cleared existing database collections.');

    // 1. Seed Courses (12 Egyptian market prep courses)
    const coursesToSeed = [
      {
        title: "Deep Dive into Node.js & Express",
        category: "Programming",
        instructor: "Sarah Koenig, Senior Backend Architect",
        duration: "14 hours",
        rating: 4.8,
        image: "💻",
        description: "Master backend server architecture, REST API design, Express middleware, authentication, and MongoDB integration.",
        curriculum: [
          "Introduction to Event-Driven Programming",
          "Building RESTful APIs with Express",
          "JSON Web Tokens (JWT) & Auth Middleware",
          "Database Modeling with Mongoose & MongoDB",
          "Testing Node.js applications with Jest"
        ]
      },
      {
        title: "TensorFlow & Deep Learning Fundamentals",
        category: "Artificial Intelligence",
        instructor: "Dr. Andrew Lin, AI Researcher",
        duration: "20 hours",
        rating: 4.9,
        image: "🤖",
        description: "Learn mathematical theory and coding mechanics of Neural Networks. Build computer vision models, text classifiers, and regression predictors.",
        curriculum: [
          "Tensors, Operations, and Graph Compiling",
          "Building Deep Neural Nets (Sequential vs Functional)",
          "Convolutional Neural Networks (CNNs) for Computer Vision",
          "Natural Language Processing & Recurrent Neural Nets",
          "Deploying Models with TensorFlow.js and FastAPI"
        ]
      },
      {
        title: "Interactive Data Visualization with Chart.js & D3",
        category: "Data Science",
        instructor: "Elena Rostova, Lead Analyst",
        duration: "10 hours",
        rating: 4.7,
        image: "📊",
        description: "Design dashboard visualizations that communicate insights effectively. Master animations, responsive canvas rendering, and dynamic datasets.",
        curriculum: [
          "Psychology of Color and Chart Layouts",
          "React-Chartjs-2 Configurations & Custom Plugins",
          "Introduction to SVG manipulation with D3.js",
          "Real-time streaming charts using WebSockets",
          "Optimizing rendering performance for large data"
        ]
      },
      {
        title: "Technical Communications for Engineers",
        category: "Communication Skills",
        instructor: "Marcus Aurelius, Creative Director",
        duration: "8 hours",
        rating: 4.9,
        image: "🗣️",
        description: "Bridging the gap between engineering specifications and stakeholder alignment. Learn documentation formatting, presentation frameworks, and clear product reporting.",
        curriculum: [
          "Writing Effective README and API docs",
          "Translating Complex Metrics to Non-Technical Staff",
          "Designing Impactful Visual Slides & Dashboards",
          "Active Listening & Technical Collaboration Cycles"
        ]
      },
      {
        title: "Agile Project Management: Scrum and Kanban",
        category: "Project Management",
        instructor: "Theresa May, PM Director",
        duration: "6 hours",
        rating: 4.6,
        image: "📋",
        description: "Run projects efficiently using sprint planning, backlogs, user stories, and velocity tracking matrices.",
        curriculum: [
          "Understanding the Agile Manifesto",
          "Scrum Roles: Product Owner, Scrum Master, and Devs",
          "Managing backlogs and writing detailed User Stories",
          "Sprint retrospectives and continuous improvements",
          "Tooling: Setting up Jira & Trello dashboards"
        ]
      },
      {
        title: "Leadership in Tech: High-Performing Teams",
        category: "Leadership",
        instructor: "Derrick Vance, Executive Coach",
        duration: "7 hours",
        rating: 4.8,
        image: "👑",
        description: "Formulate communication styles, handle internal team friction, set expectations, and motivate technical teams.",
        curriculum: [
          "Psychological Safety in Team Environments",
          "Conflict Resolution Strategies",
          "Mentorship and Delegation Techniques",
          "Articulating vision and alignment goals"
        ]
      },
      {
        title: "React Native: Cross-Platform Mobile Apps",
        category: "Programming",
        instructor: "Eng. Ahmed Ali, Mobile Tech Lead",
        duration: "18 hours",
        rating: 4.85,
        image: "📱",
        description: "Build robust Android and iOS applications using a unified React codebase. Master native layouts, local storage, and push notification syncs.",
        curriculum: [
          "Vite React vs React Native Frameworks",
          "Styling components using Flexbox and Native UI components",
          "Navigation using React Navigation library",
          "State Management using Redux Toolkit in Mobile",
          "Deploying to Google Play Store & Apple App Store"
        ]
      },
      {
        title: "Generative AI & LLMs in Production",
        category: "Artificial Intelligence",
        instructor: "Dr. Laila Hassan, AI Specialist",
        duration: "16 hours",
        rating: 4.95,
        image: "🧬",
        description: "Integrate OpenAI API, LangChain, and vector stores to build real-world cognitive interfaces and automated agent scripts.",
        curriculum: [
          "Introduction to Prompt Engineering & Temperature parameters",
          "Chaining prompts with LangChain library",
          "Semantic Search with Vector Databases (ChromaDB, Pinecone)",
          "Fine-tuning models and optimizing prompt token costs",
          "Ethical AI guidelines and guardrail structures"
        ]
      },
      {
        title: "Practical Machine Learning with Scikit-Learn",
        category: "Data Science",
        instructor: "Dr. Tarek Ibrahim, Data Architect",
        duration: "15 hours",
        rating: 4.75,
        image: "📉",
        description: "Implement supervised and unsupervised statistical predictors. Clean databases, balance classes, and deploy classification matrices.",
        curriculum: [
          "Data Cleaning & Feature Engineering with Pandas",
          "Supervised Classifiers: Decisions Trees, Random Forest, SVM",
          "Unsupervised Clustering: K-Means & PCA dimension reductions",
          "Evaluating metrics: F1-Score, Precision, and ROC Curves",
          "Model deployment pipelines using Flask and Docker"
        ]
      },
      {
        title: "Creative UI/UX & Interactive Prototyping in Figma",
        category: "Communication Skills",
        instructor: "Aya Radwan, Senior UI/UX Designer",
        duration: "11 hours",
        rating: 4.9,
        image: "🎨",
        description: "Master modern layouts, auto-layout variables, interactive prototypes, and atomic styling systems in Figma.",
        curriculum: [
          "Typography scales, grid grids, and absolute sizing",
          "Designing complex responsive components in Figma",
          "Interactive prototyping with smart animate and delay triggers",
          "Design Hand-off: Redlining code guidelines for React devs"
        ]
      }
    ];

    const seededCourses = await Course.insertMany(coursesToSeed);
    console.log(`✅ Seeded ${seededCourses.length} courses.`);

    // 2. Seed Users
    // Student: Alex
    const studentData = {
      name: "Alex Rivera",
      email: "alex@cairotech.edu.eg",
      password: "student123",
      role: "student",
      university: "Cairo Technological University",
      degree: "B.S. in Software Engineering (Senior Year)",
      gpa: "3.85 / 4.00",
      careerReadinessScore: 78,
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion", "Python", "Git", "UI/UX Principles"],
      missingSkills: ["Node.js", "TensorFlow", "WebSockets"],
      softSkills: [
        { name: "Communication", score: 85 },
        { name: "Leadership", score: 70 },
        { name: "Teamwork", score: 90 },
        { name: "Critical Thinking", score: 80 },
        { name: "Problem Solving", score: 85 },
        { name: "Time Management", score: 75 },
        { name: "Adaptability", score: 80 }
      ],
      learningPaths: [
        { name: "Full-Stack Web Architect", progress: 65 },
        { name: "AI Engineering Pathway", progress: 20 }
      ],
      completedProjects: [
        {
          title: "Interactive University Portal",
          description: "Designed a clean student portal using React and local databases, serving over 1,500 active mock students.",
          skillsUsed: ["React", "CSS3", "JavaScript"],
          grade: "A"
        }
      ],
      certificates: [
        {
          title: "Responsive Web Design Academy",
          issuedBy: "Apex Tech Labs",
          issueDate: "September 2025"
        }
      ],
      enrolledCourses: [seededCourses[0]._id] // Enrolled in Node.js Express course
    };

    // Company: NexaTech
    const companyData = {
      name: "NexaTech Representative",
      email: "partner@nexatech.com.eg",
      password: "company123",
      role: "company",
      companyName: "NexaTech Solutions",
      logo: "⚡",
      industry: "Artificial Intelligence & Cloud Computing",
      location: "Smart Village, Giza (Hybrid)",
      description: "NexaTech Solutions is Egypt's leading cloud provider specializing in enterprise machine learning automation, serverless scaling, and cognitive API integrations.",
      collaborationLevel: "Gold Partner"
    };

    // University Admin
    const universityAdminData = {
      name: "Dean Laila Hassan",
      email: "dean@cairotech.edu.eg",
      password: "university123",
      role: "university",
      universityName: "Cairo Technological University",
      totalStudents: 1420,
      employmentRate: 84.5
    };

    const student = await User.create(studentData);
    const company = await User.create(companyData);
    const uniAdmin = await User.create(universityAdminData);
    console.log('✅ Seeded user logins: Student (Alex), Company (NexaTech), University (Laila).');

    // 3. Seed Sponsored Projects (connecting to NexaTech company owner)
    const projectsToSeed = [
      {
        company: company._id,
        companyName: company.companyName,
        logo: company.logo,
        title: "AI-Driven Customer Feedback Sentiment Pipeline",
        description: "Design and implement a real-time data ingestion pipeline that processes user reviews, applies deep learning sentiment analysis, and populates an interactive analytics dashboard.",
        businessProblem: "Our customer success team manually reviews over 10,000 feedback posts daily. We need an automated, scalable system that flags negative sentiments immediately and classifies their issues (billing, tech support, UI) with high accuracy.",
        requiredSkills: ["React", "Node.js", "Python", "Tailwind CSS", "TensorFlow", "FastAPI"],
        budget: 65000,
        timeline: "8 Weeks",
        difficulty: "Advanced",
        status: "Open"
      },
      {
        company: company._id,
        companyName: company.companyName,
        logo: company.logo,
        title: "Predictive Analytics Dashboard for Portfolio Risk",
        description: "Build an elegant, interactive dashboard using React and Chart.js that displays historical asset data, computes risk thresholds using Monte Carlo simulations, and reports alerts.",
        businessProblem: "Our asset managers need custom visualization tools that can run quick portfolio vulnerability checks based on Egyptian market indices. Stiff legacy software makes it difficult to react to volatile markets in real-time.",
        requiredSkills: ["React", "Chart.js", "Data Visualization", "JavaScript", "Python", "Financial Modeling"],
        budget: 80000,
        timeline: "12 Weeks",
        difficulty: "Intermediate",
        status: "Open"
      },
      {
        company: company._id,
        companyName: company.companyName,
        logo: company.logo,
        title: "IoT Carbon Emission Tracker (Web Client)",
        description: "Develop a modern web client interface that connects via WebSockets to EcoSphere's IoT sensors, visualizing live carbon levels, moisture indexes, and regional maps of the Delta region.",
        businessProblem: "Our field botanists require a fast, offline-capable dashboard to monitor forest health indicators. The interface needs to be clean, mobile-responsive, and load instantly even on slow field networks.",
        requiredSkills: ["React", "TypeScript", "Tailwind CSS", "WebSockets", "Leaflet Maps"],
        budget: 50000,
        timeline: "6 Weeks",
        difficulty: "Intermediate",
        status: "In Progress",
        studentTeam: "Alex Rivera, Marcus Chen",
        supervisor: "Dean Laila Hassan"
      }
    ];

    const seededProjects = await Project.insertMany(projectsToSeed);
    console.log(`✅ Seeded ${seededProjects.length} sponsored projects.`);

    // 4. Seed Internships ( Egypt budget stipends )
    const internshipsToSeed = [
      {
        company: company._id,
        companyName: company.companyName,
        logo: company.logo,
        role: "AI Software Engineering Intern",
        location: "Smart Village, Giza (Hybrid)",
        salary: "EGP 12,500 / month",
        duration: "3 - 6 Months",
        skillsRequired: ["Python", "FastAPI", "React", "AI Integrations"],
        description: "Work directly with NexaTech's Core AI platform team in Egypt. You will support deploying machine learning pipelines, writing API wrappers, and upgrading client modules."
      },
      {
        company: company._id,
        companyName: company.companyName,
        logo: company.logo,
        role: "Quantitative Frontend Intern",
        location: "New Cairo, Egypt (Remote)",
        salary: "EGP 15,000 / month",
        duration: "6 Months",
        skillsRequired: ["React", "TypeScript", "Chart.js", "Financial Modeling"],
        description: "Implement high-frequency visual modules representing asset vulnerability. Collaborate with data quants and backend developers."
      }
    ];

    const seededInternships = await Internship.insertMany(internshipsToSeed);
    console.log(`✅ Seeded ${seededInternships.length} internships.`);

    console.log('🌟 Seeding Completed Successfully! Connection closing...');
    await mongoose.connection.close();
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
