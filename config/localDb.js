// In-memory Database Fallback when MongoDB is offline

export const localUsers = [
  {
    _id: "65eb26d36e2f1f3a5e8b4567",
    name: "Alex Rivera",
    email: "alex@cairotech.edu.eg",
    password: "student123", // Matches student123
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
    enrolledCourses: ["65eb26d36e2f1f3a5e8b4501"]
  },
  {
    _id: "65eb26d36e2f1f3a5e8b4568",
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
  },
  {
    _id: "65eb26d36e2f1f3a5e8b4569",
    name: "Dean Laila Hassan",
    email: "dean@cairotech.edu.eg",
    password: "university123",
    role: "university",
    universityName: "Cairo Technological University",
    totalStudents: 1420,
    employmentRate: 84.5
  }
];

export const localProjects = [
  {
    _id: "65eb26d36e2f1f3a5e8b4511",
    id: "proj-1",
    company: "65eb26d36e2f1f3a5e8b4568",
    companyName: "NexaTech Solutions",
    logo: "⚡",
    title: "AI-Driven Customer Feedback Sentiment Pipeline",
    description: "Design and implement a real-time data ingestion pipeline that processes user reviews, applies deep learning sentiment analysis, and populates an interactive analytics dashboard.",
    businessProblem: "Our customer success team manually reviews over 10,000 feedback posts daily. We need an automated, scalable system that flags negative sentiments immediately and classifies their issues (billing, tech support, UI) with high accuracy.",
    requiredSkills: ["React", "Node.js", "Python", "Tailwind CSS", "TensorFlow", "FastAPI"],
    budget: 65000,
    timeline: "8 Weeks",
    difficulty: "Advanced",
    status: "Open",
    applicantsCount: 0,
    applicants: []
  },
  {
    _id: "65eb26d36e2f1f3a5e8b4512",
    id: "proj-2",
    company: "65eb26d36e2f1f3a5e8b4568",
    companyName: "FinFlow Analytics",
    logo: "📈",
    title: "Predictive Analytics Dashboard for Portfolio Risk",
    description: "Build an elegant, interactive dashboard using React and Chart.js that displays historical asset data, computes risk thresholds using Monte Carlo simulations, and reports alerts.",
    businessProblem: "Our asset managers need custom visualization tools that can run quick portfolio vulnerability checks based on Egyptian market indices. Stiff legacy software makes it difficult to react to volatile markets in real-time.",
    requiredSkills: ["React", "Chart.js", "Data Visualization", "JavaScript", "Python", "Financial Modeling"],
    budget: 80000,
    timeline: "12 Weeks",
    difficulty: "Intermediate",
    status: "Open",
    applicantsCount: 0,
    applicants: []
  },
  {
    _id: "65eb26d36e2f1f3a5e8b4513",
    id: "proj-3",
    company: "65eb26d36e2f1f3a5e8b4568",
    companyName: "EcoSphere Technologies",
    logo: "🌱",
    title: "IoT Carbon Emission Tracker (Web Client)",
    description: "Develop a modern web client interface that connects via WebSockets to EcoSphere's IoT sensors, visualizing live carbon levels, moisture indexes, and regional maps of the Delta region.",
    businessProblem: "Our field botanists require a fast, offline-capable dashboard to monitor forest health indicators. The interface needs to be clean, mobile-responsive, and load instantly even on slow field networks.",
    requiredSkills: ["React", "TypeScript", "Tailwind CSS", "WebSockets", "Leaflet Maps"],
    budget: 50000,
    timeline: "6 Weeks",
    difficulty: "Intermediate",
    status: "In Progress",
    studentTeam: "Alex Rivera, Marcus Chen",
    supervisor: "Dean Laila Hassan",
    applicantsCount: 1,
    applicants: []
  }
];

export const localCourses = [
  {
    _id: "65eb26d36e2f1f3a5e8b4501",
    id: "course-1",
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
    _id: "65eb26d36e2f1f3a5e8b4502",
    id: "course-2",
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
  }
];

export const localInternships = [
  {
    _id: "65eb26d36e2f1f3a5e8b4551",
    company: "65eb26d36e2f1f3a5e8b4568",
    companyName: "NexaTech Solutions",
    logo: "⚡",
    role: "AI Software Engineering Intern",
    location: "Smart Village, Giza (Hybrid)",
    salary: "EGP 12,500 / month",
    duration: "3 - 6 Months",
    skillsRequired: ["Python", "FastAPI", "React", "AI Integrations"],
    description: "Work directly with NexaTech's Core AI platform team in Egypt. You will support deploying machine learning pipelines, writing API wrappers, and upgrading client modules."
  }
];
