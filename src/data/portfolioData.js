export const PERSONAL_INFO = {
  name: "Jeevan Kumar",
  fullName: "Jiyyani Jeevan Kumar",
  title: "AI Engineer | Machine Learning | Generative AI & Cloud",
  roles: [
    "AI & GenAI Engineer",
    "Agentic AI & LLM Specialist",
    "Machine Learning & DL Developer",
    "Python & FastAPI Architect",
    "AWS & Azure Cloud Certified"
  ],
  bio: "Hi, I'm Jeevan Kumar, a Computer Science graduate passionate about building practical, testable intelligent applications, developing Generative AI, LLM & Agentic AI solutions, exploring Deep Learning, and architecting scalable Cloud pipelines on AWS & Azure.",
  email: "jiyyanijeevankumar@gmail.com",
  altEmail: "jeevankumar15102003@gmail.com",
  phone: "+91-9391340978",
  location: "Hyderabad, Telangana, India",
  availableForHire: true,
  social: {
    github: "https://github.com/Jeevankumar1510",
    linkedin: "https://www.linkedin.com/in/jeevan-kumar-jiyyani-364a882a9",
    email: "mailto:jiyyanijeevankumar@gmail.com",
    phone: "tel:+919391340978"
  },
  stats: [
    { label: "Projects Completed", value: "10+", icon: "Code2" },
    { label: "Cloud Certifications", value: "2", icon: "Award" },
    { label: "Internships Completed", value: "2", icon: "Briefcase" },
    { label: "API Test Pass Rate", value: "100%", icon: "CheckCircle2" }
  ]
};

export const TECH_SKILLS_CATEGORIES = [
  {
    id: "genai",
    title: "Generative AI & Agentic AI",
    badge: "Cutting-Edge Intelligence",
    description: "Architecting autonomous systems, prompt strategies, semantic search, and retrieval pipelines.",
    color: "#00f0ff",
    accent: "from-cyan-500/20 to-violet-500/20",
    skills: [
      { name: "LLMs & Prompt Engineering", level: 90, tag: "GPT-4, Llama, Claude", desc: "Few-shot prompting, chain-of-thought, system prompts & output guardrails" },
      { name: "Agentic AI & Tool-Calling", level: 88, tag: "LangChain, AutoGPT", desc: "Autonomous agentic loops, dynamic function calling & memory persistence" },
      { name: "RAG & Vector Embeddings", level: 92, tag: "ChromaDB, FAISS", desc: "Retrieval-augmented generation, chunking strategies & semantic search" },
      { name: "Information Extraction", level: 86, tag: "NLP, Spacy", desc: "Structured entity recognition, JSON parsing & document intelligence" }
    ]
  },
  {
    id: "mldl",
    title: "Machine Learning & Deep Learning",
    badge: "Predictive Models & Vision",
    description: "Training, evaluating, and fine-tuning predictive algorithms and deep neural networks.",
    color: "#ec4899",
    accent: "from-pink-500/20 to-purple-500/20",
    skills: [
      { name: "Deep Learning & Neural Networks", level: 88, tag: "PyTorch, TensorFlow, Keras", desc: "CNNs, transformers, loss optimization & model inference pipelines" },
      { name: "Computer Vision & YOLOv8", level: 92, tag: "OpenCV, DeepSORT", desc: "Real-time multi-object tracking, spatial heatmaps & edge inference" },
      { name: "Machine Learning Algorithms", level: 90, tag: "Scikit-learn", desc: "Supervised & unsupervised classification, regression, SVM, Random Forests" },
      { name: "Hyperparameter Tuning & EDA", level: 89, tag: "GridSearchCV, Metrics", desc: "Cross-validation, ROC-AUC, Precision/Recall, model selection" }
    ]
  },
  {
    id: "backend",
    title: "Backend & Frameworks",
    badge: "High-Performance APIs",
    description: "Developing robust, asynchronous, and scalable web architectures and microservices.",
    color: "#10b981",
    accent: "from-emerald-500/20 to-teal-500/20",
    skills: [
      { name: "FastAPI", level: 92, tag: "Async, OpenAPI", desc: "Ultra-fast asynchronous Python endpoints with Pydantic validation" },
      { name: "Django", level: 88, tag: "ORM, MVC, Auth", desc: "Production-ready web applications, secure REST APIs & admin interfaces" },
      { name: "Python Core & Pytest", level: 95, tag: "OOP, Automation", desc: "Enterprise test automation frameworks (78 test cases, 100% pass rate)" },
      { name: "Streamlit & React.js", level: 87, tag: "Interactive UI", desc: "Rapid AI dashboard prototypes and reactive modern client interfaces" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud Technologies & DevOps",
    badge: "Certified Cloud Architecture",
    description: "Orchestrating cloud infrastructure, serverless pipelines, and continuous integration.",
    color: "#f59e0b",
    accent: "from-amber-500/20 to-orange-500/20",
    skills: [
      { name: "AWS (EC2, S3, Lambda, IAM)", level: 90, tag: "AWS CCP Certified", desc: "Automated provisioning, serverless architecture, Boto3 workflows" },
      { name: "Microsoft Azure", level: 84, tag: "AI-900 Certified", desc: "Azure Cognitive Services, Azure ML workspace, cloud AI integration" },
      { name: "CI/CD (GitHub Actions)", level: 88, tag: "DevOps Automation", desc: "Automated regression suites, HTML test reporting, continuous delivery" },
      { name: "Docker & Linux", level: 82, tag: "Containers, Bash", desc: "Containerized application packaging, shell scripting, environment isolation" }
    ]
  },
  {
    id: "data",
    title: "Data Science & Databases",
    badge: "Analytical Precision",
    description: "Data preparation, exploratory data analysis, relational modeling, and NoSQL stores.",
    color: "#8b5cf6",
    accent: "from-purple-500/20 to-indigo-500/20",
    skills: [
      { name: "Pandas & NumPy", level: 94, tag: "Numerical Analysis", desc: "High-volume data manipulation, vectorization, missing-value imputation" },
      { name: "Matplotlib & Seaborn", level: 88, tag: "Data Visualization", desc: "Statistical distribution plots, correlation matrices, heatmaps" },
      { name: "SQL (PostgreSQL / MySQL)", level: 88, tag: "Relational Modeling", desc: "Complex joins, indexing, query optimization, database design" },
      { name: "MongoDB & NoSQL", level: 82, tag: "Document Stores", desc: "Flexible document schemas, aggregation pipelines, vector storage" }
    ]
  }
];

export const EDUCATION_DATA = [
  {
    id: "btech",
    degree: "B.Tech. in Computer Science and Engineering",
    institution: "GIET Engineering College",
    location: "Rajahmundry, Andhra Pradesh",
    period: "2022 – 2025",
    grade: "CGPA: 8.12 / 10",
    badge: "Graduating 2025",
    highlights: [
      "Focused on Advanced Python, Artificial Intelligence, Machine Learning algorithms, and Cloud Architecture.",
      "Developed key engineering projects in AI Crowd Detection and Automated Testing frameworks.",
      "Active participant in technical symposiums, coding hackathons, and cloud workshops."
    ],
    skills: ["Python", "Algorithms", "Cloud Computing", "AI/ML", "DBMS", "Operating Systems"]
  },
  {
    id: "diploma",
    degree: "Diploma in Mechanical Engineering",
    institution: "M.R.A.G.R Government Polytechnic College",
    location: "Vizianagaram, Andhra Pradesh",
    period: "2019 – 2022",
    grade: "CGPA: 8.84 / 10",
    badge: "First Class with Distinction",
    highlights: [
      "Built a rock-solid foundation in analytical problem-solving, precision engineering, and logical thinking.",
      "Secured outstanding academic distinction with 8.84 CGPA.",
      "Spearheaded technical model designs and transitioned passionately into computer science and software development."
    ],
    skills: ["Analytical Thinking", "Applied Mathematics", "System Design", "Problem Solving"]
  },
  {
    id: "ssc",
    degree: "Secondary School Certificate (SSC)",
    institution: "AP Model School",
    location: "Narsipatnam, Andhra Pradesh",
    period: "2018 – 2019",
    grade: "CGPA: 9.5 / 10",
    badge: "High Honor Roll",
    highlights: [
      "Excellence in Mathematics, Physical Sciences, and Computer Fundamentals.",
      "Graduated with top 1% academic merit score of 9.5 CGPA."
    ],
    skills: ["Mathematics", "Sciences", "Logical Reasoning"]
  }
];

export const INTERNSHIP_DATA = [
  {
    id: "aws-techwing",
    role: "AWS Cloud Intern",
    company: "Techwing",
    location: "Rajahmundry, India",
    period: "February 2024 – August 2024",
    duration: "6 Months",
    summary: "Spearheaded cloud automation and infrastructure deployment across AWS core services.",
    frontDetails: [
      "Automated Python-based cloud provisioning workflows across 4 core AWS services: EC2, S3, Lambda, and IAM.",
      "Achieved ~40% improvement in deployment efficiency through custom script automation.",
      "Engineered robust IAM roles and security policies following least-privilege cloud security principles."
    ],
    responsibilities: [
      "Architected Python Boto3 scripts to automate recurring serverless functions and storage management.",
      "Configured fine-grained IAM roles, group access policies, and permission boundaries.",
      "Monitored server health, automated billing alerts, and optimized cloud resource allocation.",
      "Facilitated seamless deployment pipelines bridging local development with AWS staging environments."
    ],
    technologies: ["AWS EC2", "AWS S3", "AWS Lambda", "AWS IAM", "Cloud Deployment", "Monitoring", "Python Boto3"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
    accentColor: "#00f0ff"
  },
  {
    id: "aiml-blackbucks",
    role: "AI/ML & Data Science Intern",
    company: "Blackbucks",
    location: "Tirupati, India",
    period: "May 2023 – June 2023",
    duration: "2 Months",
    summary: "Engineered predictive machine learning pipelines, conducted dataset preprocessing, and evaluated model performance.",
    frontDetails: [
      "Prepared high-quality datasets through rigorous data cleaning, missing-value imputation, and feature engineering.",
      "Developed end-to-end predictive models utilizing Python, Pandas, NumPy, and Scikit-learn.",
      "Evaluated supervised learning models using precision, recall, F1-score, and ROC-AUC metrics."
    ],
    responsibilities: [
      "Engineered exploratory data analysis (EDA) pipelines with interactive data visualization.",
      "Implemented and benchmarked multiple classification and regression algorithms.",
      "Optimized hyperparameters using GridSearchCV and cross-validation techniques.",
      "Analyzed model outputs and error distributions to guide final model selection and deployment readiness."
    ],
    technologies: ["Python", "Machine Learning", "Data Science", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    gradient: "from-purple-500/20 via-pink-500/10 to-violet-500/20",
    accentColor: "#a855f7"
  }
];

export const PROJECT_DATA = [
  {
    id: "crowd-mgmt-ai",
    number: "01",
    title: "Crowd Management Using AI",
    category: "AI & Computer Vision",
    subtitle: "Real-time AI surveillance, density estimation & threat detection",
    description: "An AI-powered crowd monitoring and public safety platform that detects people in real-time, estimates localized crowd density, identifies potential stampede or anomaly threats, generates spatial heatmaps, and triggers instant automated safety alerts.",
    features: [
      "Real-time people detection, bounding-box tracking and multi-stream counting",
      "Dynamic crowd density estimation with automated congestion thresholds",
      "Spatial density heatmap generation across monitored facility zones",
      "Dense crowd region identification to prevent severe bottleneck hazards",
      "Fire and concealed weapon hazard detection algorithms",
      "Stampede precursor detection via velocity vector analysis",
      "Real-time RTSP/CCTV camera status and stream health monitoring",
      "Automated instant email alerts with high-density incident snapshots"
    ],
    technologies: ["Python", "YOLOv8", "OpenCV", "DeepSORT", "Streamlit", "PyTorch"],
    metrics: "High-FPS Multi-object tracking with sub-second alerting",
    github: "https://github.com/Jeevankumar1510/crowd-management-ai",
    liveDemo: "https://crowd-ai-demo.streamlit.app",
    color: "#00f0ff",
    tag: "Surveillance AI",
    badgeIcon: "Cpu"
  },
  {
    id: "ai-job-connect",
    number: "02",
    title: "AI Job Connect",
    category: "Full Stack AI Platform",
    subtitle: "Intelligent vector-based candidate matching system",
    description: "An intelligent AI job-matching ecosystem that connects prospective candidates with ideal job opportunities by semantically matching candidate skill profiles, experience vectors, and job descriptions using AI scoring algorithms.",
    features: [
      "Candidate profile and multi-format portfolio asset management",
      "Skill-based job matching powered by weighted semantic scoring",
      "Deep resume vs. job description embedding comparison",
      "Relevant job recommendations with personalized match percentages",
      "High-throughput interactive job search and filtering interface",
      "Automated skill gap analysis and recommended learning roadmaps"
    ],
    technologies: ["Python", "Machine Learning", "NLP", "FastAPI", "React.js", "SQL"],
    metrics: "Instant multi-candidate ranking & semantic skill scoring",
    github: "https://github.com/Jeevankumar1510/ai-job-connect",
    liveDemo: "https://ai-job-connect.vercel.app",
    color: "#3b82f6",
    tag: "Neural Matching",
    badgeIcon: "Sparkles"
  },
  {
    id: "ai-resume-analyzer",
    number: "03",
    title: "AI Resume Analyzer",
    category: "NLP & Web Application",
    subtitle: "ATS scoring, skill extraction & smart optimization",
    description: "A comprehensive resume intelligence tool that parses resumes, extracts technical skills, calculates ATS (Applicant Tracking System) compatibility scores, and generates actionable AI-guided recommendations to maximize interview callbacks.",
    features: [
      "Multi-format resume upload (PDF, DOCX) and semantic text parsing",
      "Automated technical and domain-specific skills entity extraction",
      "ATS-based resume score evaluation with keyword density breakdown",
      "Target job role identification based on extracted candidate experience",
      "Actionable resume improvement suggestions for missing industry keywords"
    ],
    technologies: ["Python", "Django", "NLP", "HTML5", "CSS3", "JavaScript"],
    metrics: "Accurate ATS parsing across multi-format CVs",
    github: "https://github.com/Jeevankumar1510/ai-resume-analyzer",
    liveDemo: null,
    color: "#a855f7",
    tag: "ATS Intelligence",
    badgeIcon: "FileText"
  },
  {
    id: "heart-disease-detection",
    number: "04",
    title: "Heart Disease Detection",
    category: "Machine Learning / HealthTech",
    subtitle: "Predictive diagnostic risk assessment engine",
    description: "A clinical machine learning application designed to assess potential cardiovascular disease risk in patients based on biometric and clinical indicators including cholesterol, heart rate, blood pressure, and ECG readings.",
    features: [
      "Clinical dataset preprocessing and statistical anomaly mitigation",
      "Intelligent missing value imputation and robust standardization",
      "Domain-specific feature engineering maximizing predictive signal",
      "Comparative model training across Random Forest, SVM, and Logistic Regression",
      "Risk prediction with confidence intervals and ROC curve evaluation",
      "Interactive health attribute visualizer highlighting critical risk contributors"
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Machine Learning", "Streamlit"],
    metrics: "High sensitivity and precision model verification",
    github: "https://github.com/Jeevankumar1510/heart-disease-detection",
    liveDemo: "https://heart-disease-ml.streamlit.app",
    color: "#10b981",
    tag: "Predictive Healthcare",
    badgeIcon: "Activity"
  },
  {
    id: "rest-api-testing-framework",
    number: "05",
    title: "REST API Automation Testing Framework",
    category: "QA Automation & DevOps",
    subtitle: "78 Automated Test Cases | 100% Pass Rate | CI/CD Integration",
    description: "An enterprise-grade REST API automation framework built with Python, Pytest, and Requests. Automates 78 rigorous test cases covering full CRUD operations, JSON schema conformance, status code validations, and automated CI/CD regression runs.",
    features: [
      "Automated testing covering full CRUD lifecycle endpoints",
      "Strict HTTP status code validation (200, 201, 400, 401, 404, 422)",
      "Strict response body and JSON schema conformance validation",
      "Security and authentication header validation across edge cases",
      "Response time and latency threshold verification under load",
      "Modular, parameterized reusable test fixtures",
      "Headless automated test execution via GitHub Actions workflows",
      "Detailed HTML test execution reports and failure trace tracking"
    ],
    technologies: ["Python", "Pytest", "Requests", "JSON Schema", "GitHub Actions", "HTML Reports"],
    metrics: "78/78 tests passed • 100% recorded execution success",
    github: "https://github.com/Jeevankumar1510/api-automation-framework",
    liveDemo: "https://github.com/Jeevankumar1510/api-automation-framework#test-reports",
    color: "#f59e0b",
    tag: "Enterprise Testing",
    badgeIcon: "CheckSquare"
  },
  {
    id: "sentiment-analysis-ml",
    number: "06",
    title: "Sentiment Analysis Using ML",
    category: "NLP & Machine Learning",
    subtitle: "Natural Language Processing & Polarity Classification",
    description: "A machine learning-based NLP application that analyzes unstructured user feedback and social reviews to detect and quantify emotional sentiment across text corpuses.",
    features: [
      "Comprehensive text preprocessing, punctuation stripping and casing normalization",
      "Stop-word removal, regex cleaning, and intelligent tokenization",
      "TF-IDF feature extraction and n-gram vectorization",
      "Supervised sentiment classification using Multinomial Naive Bayes & Logistic Regression",
      "Precise positive, negative, and neutral sentiment polarity predictions",
      "Model evaluation with confusion matrices and F1-score benchmarks",
      "Interactive sentiment distribution charts and word-cloud visualization"
    ],
    technologies: ["Python", "Machine Learning", "NLP", "Pandas", "NumPy", "Scikit-learn"],
    metrics: "91.2% F1-Score • Multi-Class Polarity Engine",
    github: "https://github.com/Jeevankumar1510/sentiment-analysis-ml",
    liveDemo: null,
    color: "#ec4899",
    tag: "Emotional Intelligence",
    badgeIcon: "TrendingUp"
  },
  {
    id: "self-healing-ai-agent",
    number: "07",
    title: "Self-Healing AI Agent",
    category: "Agentic AI & DevOps",
    subtitle: "Autonomous Failure Diagnosis & Automated Recovery",
    description: "An intelligent autonomous AI agent designed to identify distributed server anomalies, analyze stack traces via LLM reasoning, formulate root-cause hypotheses, and execute self-healing corrective scripts with verification loops.",
    features: [
      "Automated real-time error detection and exception interception",
      "Continuous system health telemetry and latency monitoring",
      "Automated failure log analysis powered by LLM reasoning chains",
      "Root cause identification and matching against historical incident bases",
      "Intelligent recovery action selection (service restart, memory flush, fallback route)",
      "Automated recovery script execution inside secure sandboxes",
      "Post-healing health verification checks and regression validation",
      "Audit log tracking failure history, recovery duration, and system uptime"
    ],
    technologies: ["Python", "Agentic AI", "Generative AI", "LLMs", "FastAPI"],
    metrics: "Automated Zero-Downtime Recovery • Sub-30s MTTR",
    github: "https://github.com/Jeevankumar1510/self-healing-ai-agent",
    liveDemo: null,
    color: "#06b6d4",
    tag: "Autonomous Agent",
    badgeIcon: "Bot"
  }
];

export const CERTIFICATION_DATA = [
  {
    id: "aws-ccp",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2024",
    code: "AWS-CCP",
    description: "Validates comprehensive understanding of AWS Cloud concepts, core security architectures, IAM compliance, computing (EC2, Lambda), storage (S3, EBS), and global infrastructure principles.",
    credentialUrl: "https://www.credly.com/organizations/amazon-web-services/badges",
    badgeColor: "#ff9900",
    gradient: "from-amber-500/20 via-orange-500/10 to-yellow-500/20",
    skills: ["Cloud Concepts", "AWS Security", "Billing & Pricing", "Core AWS Services", "High Availability"]
  },
  {
    id: "azure-ai-900",
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft Azure",
    issueDate: "2024",
    code: "AI-900",
    description: "Validates foundational knowledge of Machine Learning workloads, Artificial Intelligence concepts on Azure, Computer Vision, Natural Language Processing, and Conversational AI services.",
    credentialUrl: "https://learn.microsoft.com/en-us/users/jeevankumar/credentials",
    badgeColor: "#0078d4",
    gradient: "from-blue-600/20 via-cyan-500/10 to-indigo-600/20",
    skills: ["Azure Cognitive Services", "Computer Vision", "Natural Language Processing", "Responsible AI", "Azure ML"]
  }
];
