// Mock Data for CareerBridge AI - Tailored for Egypt & Enhanced Education-Labor bridging

export const INITIAL_COMPANIES = [
  {
    id: "co-1",
    name: "NexaTech Solutions",
    logo: "⚡",
    industry: "Artificial Intelligence & Cloud Computing",
    website: "https://nexatech.example.com",
    location: "Smart Village, Giza (Hybrid)",
    description: "NexaTech Solutions is Egypt's leading cloud provider specializing in enterprise machine learning automation, serverless scaling, and cognitive API integrations.",
    rating: 4.8,
    employeeCount: "500-1000",
    projectsPostedCount: 6,
    activeHires: 14,
    collaborationLevel: "Gold Partner"
  },
  {
    id: "co-2",
    name: "FinFlow Analytics",
    logo: "📈",
    industry: "Financial Technology",
    website: "https://finflow.example.com",
    location: "New Cairo, Egypt (Remote)",
    description: "FinFlow builds next-generation predictive algorithms and real-time transaction processing networks for Egyptian and regional investment banking systems.",
    rating: 4.6,
    employeeCount: "100-250",
    projectsPostedCount: 3,
    activeHires: 8,
    collaborationLevel: "Silver Partner"
  },
  {
    id: "co-3",
    name: "EcoSphere Technologies",
    logo: "🌱",
    industry: "Environmental Tech & IoT",
    website: "https://ecosphere.example.com",
    location: "Maadi, Cairo (On-site)",
    description: "EcoSphere leverages low-power wireless sensor networks and machine learning models to track, catalog, and mitigate carbon emissions for agricultural operations in Egypt.",
    rating: 4.9,
    employeeCount: "50-100",
    projectsPostedCount: 4,
    activeHires: 5,
    collaborationLevel: "Academic Sponsor"
  },
  {
    id: "co-4",
    name: "Aura Creative Agency",
    logo: "🎨",
    industry: "UI/UX & Branding",
    website: "https://aura.example.com",
    location: "Zamalek, Cairo (Remote)",
    description: "Aura is an award-winning creative agency designing interactive 3D web interfaces, unified design systems, and digital product strategies for Middle Eastern startups.",
    rating: 4.7,
    employeeCount: "20-50",
    projectsPostedCount: 2,
    activeHires: 3,
    collaborationLevel: "Creative Partner"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: "proj-1",
    companyId: "co-1",
    companyName: "NexaTech Solutions",
    logo: "⚡",
    title: "AI-Driven Customer Feedback Sentiment Pipeline",
    description: "Design and implement a real-time data ingestion pipeline that processes user reviews, applies deep learning sentiment analysis, and populates an interactive analytics dashboard.",
    businessProblem: "Our customer success team manually reviews over 10,000 feedback posts daily. We need an automated, scalable system that flags negative sentiments immediately and classifies their issues (billing, tech support, UI) with high accuracy.",
    requiredSkills: ["React", "Node.js", "Python", "Tailwind CSS", "TensorFlow", "FastAPI"],
    budget: 65000,
    timeline: "8 Weeks",
    difficulty: "Advanced",
    status: "Open", // Open, In Progress, Completed, Purchased
    applicantsCount: 5,
    matches: {
      "Alex Rivera": {
        score: 94,
        reason: "You already have React, Python, and Tailwind CSS. Acquiring Node.js or TensorFlow skills will maximize your chances of leading this project successfully."
      }
    }
  },
  {
    id: "proj-2",
    companyId: "co-2",
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
    applicantsCount: 3,
    matches: {
      "Alex Rivera": {
        score: 87,
        reason: "Matches your React and JavaScript foundations perfectly. Adding Financial Modeling or specialized Data Visualization courses will ensure a flawless application."
      }
    }
  },
  {
    id: "proj-3",
    companyId: "co-3",
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
    studentTeam: "Alex Rivera (Lead), Marcus Chen",
    supervisor: "Dr. Evelyn Foster",
    applicantsCount: 4,
    matches: {
      "Alex Rivera": {
        score: 72,
        reason: "Strong React and Tailwind CSS alignment. Learning WebSockets and TypeScript is recommended to round out the skill gap."
      }
    }
  },
  {
    id: "proj-4",
    companyId: "co-4",
    companyName: "Aura Creative Agency",
    logo: "🎨",
    title: "E-Commerce Immersive 3D Experience",
    description: "Re-imagine the conventional grid-style shopping experience by building an interactive 3D product showcase using Three.js / React Three Fiber.",
    businessProblem: "Our lifestyle brand client wants to stand out from typical e-commerce storefronts. We need a fast, visually jaw-dropping 3D scene where users can spin, dismantle, and customize products.",
    requiredSkills: ["Three.js", "React Three Fiber", "WebGL", "React", "Tailwind CSS", "Framer Motion"],
    budget: 95000,
    timeline: "10 Weeks",
    difficulty: "Advanced",
    status: "Open",
    applicantsCount: 2,
    matches: {
      "Alex Rivera": {
        score: 80,
        reason: "You possess React, Tailwind CSS, and Framer Motion expertise. Picking up Three.js or WebGL will make your visual interface pop."
      }
    }
  },
  {
    id: "proj-5",
    companyId: "co-1",
    companyName: "NexaTech Solutions",
    logo: "⚡",
    title: "Serverless DevOps Audit & Automation System",
    description: "Formulate automated cloud configuration checks to detect security holes, budget overruns, and unoptimized resource instances across multi-region serverless cloud nodes.",
    businessProblem: "Our development teams spin up cloud environments constantly. We need an automated auditing dashboard that monitors deployment health without human intervention.",
    requiredSkills: ["AWS Lambda", "Terraform", "Python", "Cloud Security", "Node.js"],
    budget: 72000,
    timeline: "8 Weeks",
    difficulty: "Advanced",
    status: "Completed",
    studentTeam: "Sarah Jenkins, Liam Patel",
    supervisor: "Prof. Kenneth Brooks",
    applicantsCount: 6,
    matches: {
      "Alex Rivera": {
        score: 45,
        reason: "This project has a high infrastructure focus. Your skill set centers around UI/UX development and Frontend React Engineering."
      }
    }
  }
];

export const INITIAL_COURSES = [
  {
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
    ],
    recommendedFor: ["proj-1", "proj-5"]
  },
  {
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
    ],
    recommendedFor: ["proj-1"]
  },
  {
    id: "course-3",
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
    ],
    recommendedFor: ["proj-2", "proj-3"]
  },
  {
    id: "course-4",
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
    ],
    recommendedFor: ["proj-4"]
  },
  {
    id: "course-5",
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
    ],
    recommendedFor: ["proj-2", "proj-3", "proj-4"]
  },
  {
    id: "course-6",
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
    ],
    recommendedFor: []
  },
  {
    id: "course-7",
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
    ],
    recommendedFor: ["proj-3"]
  },
  {
    id: "course-8",
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
    ],
    recommendedFor: ["proj-1", "proj-4"]
  },
  {
    id: "course-9",
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
    ],
    recommendedFor: ["proj-1", "proj-2"]
  },
  {
    id: "course-10",
    title: "Digital Product Management & Product-Led Growth",
    category: "Business",
    instructor: "Noha Mansour, Head of Product",
    duration: "12 hours",
    rating: 4.65,
    image: "💼",
    description: "Navigate product discovery, design sprints, customer feedback analysis, and roadmap building for software products.",
    curriculum: [
      "Introduction to Product Development Lifecycle",
      "Conducting User Interviews & Formulating Personas",
      "Creating Product Roadmaps and prioritization matrices",
      "A/B Testing and Tracking core Activation Metrics",
      "Product-led growth loops and user retention strategies"
    ],
    recommendedFor: []
  },
  {
    id: "course-11",
    title: "Growth Marketing & SEO Strategy for Startups",
    category: "Marketing",
    instructor: "Sherif Amer, Digital Marketer",
    duration: "9 hours",
    rating: 4.8,
    image: "🚀",
    description: "Scale organic website traffic, set up tracking analytics, and manage paid customer acquisition channels.",
    curriculum: [
      "Core SEO mechanics and keyword search analysis",
      "Content strategy and on-page optimization factors",
      "Setting up Google Analytics 4 and tracking conversions",
      "A/B testing ad copies and conversion rate optimization (CRO)"
    ],
    recommendedFor: []
  },
  {
    id: "course-12",
    title: "Creative UI/UX & Interactive Prototyping in Figma",
    category: "Communication Skills", // Design / UIUX
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
    ],
    recommendedFor: ["proj-4"]
  }
];

export const INITIAL_INTERNSHIPS = [
  {
    id: "int-1",
    companyId: "co-1",
    companyName: "NexaTech Solutions",
    logo: "⚡",
    role: "AI Software Engineering Intern",
    location: "Smart Village, Giza (Hybrid)",
    salary: "EGP 12,500 / month",
    duration: "3 - 6 Months",
    skillsRequired: ["Python", "FastAPI", "React", "AI Integrations"],
    description: "Work directly with NexaTech's Core AI platform team in Egypt. You will support deploying machine learning pipelines, writing API wrappers, and upgrading client modules."
  },
  {
    id: "int-2",
    companyId: "co-2",
    companyName: "FinFlow Analytics",
    role: "Quantitative Frontend Intern",
    logo: "📈",
    location: "New Cairo, Egypt (Remote)",
    salary: "EGP 15,000 / month",
    duration: "6 Months",
    skillsRequired: ["React", "TypeScript", "Chart.js", "Financial Modeling"],
    description: "Implement high-frequency visual modules representing asset vulnerability. Collaborate with data quants and backend developers."
  },
  {
    id: "int-3",
    companyId: "co-3",
    companyName: "EcoSphere Technologies",
    role: "IoT Cloud Systems Intern",
    logo: "🌱",
    location: "Maadi, Cairo (On-site)",
    salary: "EGP 9,500 / month",
    duration: "3 Months",
    skillsRequired: ["Node.js", "AWS", "WebSockets", "IoT Prototypes"],
    description: "Scale ingestion servers receiving live botanic metrics in Egypt. Test system loads, write server scripts, and manage database scaling configs."
  }
];

export const INITIAL_STUDENT_PROFILE = {
  name: "Alex Rivera",
  avatar: "👨‍💻",
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
    },
    {
      title: "React Intermediate Certification",
      issuedBy: "DevAlliance",
      issueDate: "January 2026"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      title: "New Match Identified!",
      message: "NexaTech's 'AI-Driven Customer Feedback Sentiment Pipeline' project matches 94% of your current skills.",
      time: "2 hours ago",
      read: false
    },
    {
      id: "notif-2",
      title: "Course Recommendation",
      message: "Enroll in 'Deep Dive into Node.js' to qualify for top-tier Web Services projects.",
      time: "1 day ago",
      read: true
    }
  ]
};

export const UNIVERSITY_ANALYTICS = {
  name: "Cairo Technological University",
  logo: "🏛️",
  totalStudents: 1420,
  activeProjects: 34,
  partnerCompanies: 18,
  employmentRate: 84.5, // Target 90%
  skillsDemand: [
    { skill: "React", demand: 92 },
    { skill: "Python", demand: 85 },
    { skill: "Node.js", demand: 76 },
    { skill: "SQL", demand: 68 },
    { skill: "TypeScript", demand: 62 },
    { skill: "UI/UX Figma", demand: 55 }
  ],
  activeStudents: [
    { name: "Alex Rivera", projectsCompleted: 1, currentProject: "EcoSphere IoT Tracker", rating: "4.9/5.0" },
    { name: "Sarah Jenkins", projectsCompleted: 2, currentProject: "None (Awaiting Hire)", rating: "4.85/5.0" },
    { name: "Liam Patel", projectsCompleted: 1, currentProject: "None (Hired at NexaTech)", rating: "4.95/5.0" },
    { name: "Marcus Chen", projectsCompleted: 0, currentProject: "EcoSphere IoT Tracker", rating: "4.5/5.0" }
  ],
  employmentTrend: {
    labels: ["2022", "2023", "2024", "2025", "2026 (YTD)"],
    rates: [72.3, 76.8, 80.1, 82.4, 84.5]
  }
};

export const AI_TEAM_RECOMMENDATIONS = [
  {
    id: "team-rec-1",
    projectId: "proj-1", // AI sentiment pipeline
    teamName: "Delta Analytics Squad",
    members: ["Alex Rivera (Frontend)", "Marcus Chen (Data Scientist)"],
    overallScore: 96,
    reason: "Alex Rivera brings React/Tailwind expertise. Marcus Chen covers TensorFlow and Python backend modules. Together, they have 100% skill alignment."
  },
  {
    id: "team-rec-2",
    projectId: "proj-4", // 3D immersive
    teamName: "Creative Devs Cairo",
    members: ["Sarah Jenkins (Three.js Lead)", "Alex Rivera (Framer Motion)"],
    overallScore: 92,
    reason: "Sarah Jenkins completed the Figma UX course. Alex Rivera is top-tier in animations and UI layout."
  }
];

export const LABOR_MARKET_INSIGHTS = {
  demandGrowth: [
    { field: "Artificial Intelligence", growth: 48, topJob: "LLM Systems Engineer", avgSalary: "EGP 35,000/mo" },
    { field: "Data Science & Analytics", growth: 35, topJob: "Portfolio Risk Quant", avgSalary: "EGP 28,000/mo" },
    { field: "Cloud Engineering", growth: 30, topJob: "Serverless Security Auditor", avgSalary: "EGP 32,000/mo" },
    { field: "Frontend UI/UX", growth: 22, topJob: "Interactive 3D Developer", avgSalary: "EGP 22,000/mo" }
  ],
  criticalSkillsShortage: ["TensorFlow", "Node.js", "WebSockets", "Three.js", "Financial Modeling"]
};
