import {
  Cpu, Eye, Camera, BrainCircuit, Sparkles, Database, Server,
  Code2, Flame, Bot, Workflow, BarChart3, Binary, Table,
  Activity, CheckCircle2, ShieldCheck, Heart, Terminal, Scan,
  Zap, Github, ExternalLink, AlertTriangle, RefreshCw
} from 'lucide-react';

export const TUNNEL_PROJECTS_DATA = [
  // PROJECT 01 – CROWD MANAGEMENT USING AI
  {
    id: 'crowd-management-ai',
    number: '01',
    title: 'Crowd Management Using AI',
    subtitle: 'Real-Time Surveillance & Computer Vision Pipeline',
    category: 'Computer Vision & AI',
    tag: 'Surveillance AI',
    color: '#00f0ff', // Neon Cyan
    accentGlow: 'rgba(0, 240, 255, 0.4)',
    description:
      'An AI-based crowd monitoring and public safety platform engineered to detect people in real time, estimate localized crowd density, identify stampede and hazard precursors, generate spatial heatmaps, and trigger automated emergency alerts.',
    problemStatement:
      'High-density public events and transit hubs suffer from sudden overcrowding, undetected weapon/fire hazards, and stampede risks that conventional manual CCTV monitoring fails to catch in time.',
    solution:
      'A high-throughput computer vision pipeline utilizing YOLOv8 and DeepSORT tracking to generate real-time spatial heatmaps, detect perimeter intrusions, and send automated email alerts with sub-second latency.',
    features: [
      'Real-time people detection, bounding-box tracking and multi-stream counting.',
      'Dynamic crowd density estimation with automated congestion thresholds.',
      'Spatial density heatmap generation across monitored facility zones.',
      'Dense crowd region identification to prevent severe bottleneck hazards.',
      'Fire and concealed weapon hazard detection algorithms.',
      'Stampede precursor detection via velocity vector analysis.',
      'Real-time RTSP/CCTV camera status and stream health monitoring.',
      'Automated instant email alerts with high-density incident snapshots.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'YOLOv8', icon: Eye },
      { name: 'OpenCV', icon: Camera },
      { name: 'DeepSORT', icon: Scan },
      { name: 'PyTorch', icon: Flame },
      { name: 'Streamlit', icon: Zap }
    ],
    metrics: '96.4% Detection Accuracy • Sub-second Real-time Alerting',
    github: 'https://github.com/Jeevankumar1510/crowd-management-ai',
    liveDemo: 'https://crowd-ai-demo.streamlit.app',
    hasLiveDemo: true,
    visualIdentityType: 'surveillance'
  },

  // PROJECT 02 – AI JOB CONNECT
  {
    id: 'ai-job-connect',
    number: '02',
    title: 'AI Job Connect',
    subtitle: 'Vector-Based Candidate Matching Ecosystem',
    category: 'Full Stack AI Platform',
    tag: 'Neural Matching',
    color: '#3b82f6', // Electric Blue
    accentGlow: 'rgba(59, 130, 246, 0.4)',
    description:
      'An AI-powered job matching platform that connects candidates with ideal career opportunities by calculating semantic similarity between resume vectors, skill profiles, and enterprise job descriptions.',
    problemStatement:
      'Traditional keyword-matching recruitment platforms fail to identify qualified candidates who phrase their experience differently than exact ATS filter keywords, leading to massive candidate drop-off.',
    solution:
      'Built a semantic embedding and vector similarity engine backed by FastAPI asynchronous endpoints that scores candidate competencies against job descriptions with multi-weighted rank analysis.',
    features: [
      'Candidate profile and multi-format portfolio asset management.',
      'Skill-based job matching powered by weighted semantic scoring.',
      'Deep resume vs. job description embedding comparison.',
      'Relevant job recommendations with personalized match percentages.',
      'High-throughput interactive job search and filtering interface.',
      'Automated skill gap analysis and recommended learning roadmaps.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Machine Learning', icon: BrainCircuit },
      { name: 'NLP', icon: Sparkles },
      { name: 'FastAPI', icon: Zap },
      { name: 'React.js', icon: Code2 },
      { name: 'SQL', icon: Database }
    ],
    metrics: '94% Match Precision • Instant Vector Scoring',
    github: 'https://github.com/Jeevankumar1510/ai-job-connect',
    liveDemo: 'https://ai-job-connect.vercel.app',
    hasLiveDemo: true,
    visualIdentityType: 'jobConnect'
  },

  // PROJECT 03 – AI RESUME ANALYZER
  {
    id: 'ai-resume-analyzer',
    number: '03',
    title: 'AI Resume Analyzer',
    subtitle: 'NLP-Driven ATS Compatibility & Skill Extraction',
    category: 'NLP & Web Application',
    tag: 'ATS Intelligence',
    color: '#a855f7', // Electric Purple
    accentGlow: 'rgba(168, 85, 247, 0.4)',
    description:
      'A Django-based application that parses resumes, extracts technical skills and professional milestones, evaluates compatibility with job requirements, and provides actionable recommendations to maximize interview callbacks.',
    problemStatement:
      'Job applicants rarely receive feedback on why their CV fails ATS parsing gates or which critical domain keywords are missing from their submissions.',
    solution:
      'Engineered an NLP entity extraction parser in Django that converts multi-format resumes into structured skill graphs, calculates ATS compatibility indices, and generates tailored keyword recommendations.',
    features: [
      'Multi-format resume upload (PDF, DOCX) and semantic text parsing.',
      'Automated technical and domain-specific skills entity extraction.',
      'ATS-based resume score evaluation with keyword density breakdown.',
      'Target job role identification based on extracted candidate experience.',
      'Actionable resume improvement suggestions for missing industry keywords.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Django', icon: Server },
      { name: 'NLP', icon: Sparkles },
      { name: 'HTML5', icon: Code2 },
      { name: 'CSS3', icon: Code2 },
      { name: 'JavaScript', icon: Code2 }
    ],
    metrics: 'Parsed 1,000+ Resume Schemas • Instant ATS Scoring',
    github: 'https://github.com/Jeevankumar1510/ai-resume-analyzer',
    liveDemo: null,
    hasLiveDemo: false,
    visualIdentityType: 'resumeAnalyzer'
  },

  // PROJECT 04 – HEART DISEASE DETECTION
  {
    id: 'heart-disease-detection',
    number: '04',
    title: 'Heart Disease Detection',
    subtitle: 'Clinical Machine Learning Diagnostic Assessment',
    category: 'HealthTech ML',
    tag: 'Predictive Healthcare',
    color: '#10b981', // Emerald Green
    accentGlow: 'rgba(16, 185, 129, 0.4)',
    description:
      'A clinical machine learning application designed to assess potential cardiovascular disease risk in patients by analyzing biometric and clinical biomarkers including cholesterol, heart rate, blood pressure, and ECG indicators.',
    problemStatement:
      'Early cardiovascular risk stratification is critical for timely medical intervention, but manual clinical chart evaluations can be slow and subject to diagnostic variance across providers.',
    solution:
      'Developed a validated ensemble classification pipeline in Scikit-learn trained on standard clinical cardiology cohorts, providing instant risk probability scoring and feature importance attribution.',
    features: [
      'Clinical dataset preprocessing and statistical anomaly mitigation.',
      'Intelligent missing value imputation and robust standardization.',
      'Domain-specific feature engineering maximizing predictive signal.',
      'Comparative model training across Random Forest, SVM, and Logistic Regression.',
      'Risk prediction with confidence intervals and ROC curve evaluation.',
      'Interactive health attribute visualizer highlighting critical risk contributors.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Pandas', icon: Table },
      { name: 'NumPy', icon: Binary },
      { name: 'Scikit-learn', icon: BarChart3 },
      { name: 'Matplotlib', icon: Activity }
    ],
    metrics: '88.5% Cross-Validated Accuracy • Validated Clinical Dataset',
    github: 'https://github.com/Jeevankumar1510/heart-disease-detection',
    liveDemo: 'https://heart-disease-ml.streamlit.app',
    hasLiveDemo: true,
    visualIdentityType: 'medical'
  },

  // PROJECT 05 – REST API AUTOMATION TESTING FRAMEWORK
  {
    id: 'rest-api-testing-framework',
    number: '05',
    title: 'REST API Automation Testing Framework',
    subtitle: 'Pytest CI/CD Regression Suite • 78 Automated Tests',
    category: 'QA Automation & DevOps',
    tag: 'Enterprise Testing',
    color: '#f59e0b', // Amber / Gold
    accentGlow: 'rgba(245, 158, 11, 0.4)',
    description:
      'A robust Python-based automation framework engineered to test enterprise REST APIs, validate payload integrity, assert HTTP response contracts, and enforce sub-second performance standards in automated CI/CD pipelines.',
    problemStatement:
      'Continuous deployments risk introducing regression breaks in backend microservices, payload schema drifts, or latency spikes without rigorous, automated API assertions on every pull request.',
    solution:
      'Created a comprehensive test suite using Python, Pytest, and Requests with 78 automated test cases covering authentication, full CRUD operations, and schema validation with GitHub Actions CI/CD.',
    features: [
      'Automated testing covering full CRUD lifecycle endpoints.',
      'Strict HTTP status code validation (200, 201, 400, 401, 404, 422).',
      'Strict response body and JSON schema conformance validation.',
      'Security and authentication header validation across edge cases.',
      'Response time and latency threshold verification under load.',
      'Modular, parameterized reusable test fixtures.',
      'Headless automated test execution via GitHub Actions workflows.',
      'Detailed HTML test execution reports and failure trace tracking.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Pytest', icon: ShieldCheck },
      { name: 'Requests', icon: Zap },
      { name: 'REST APIs', icon: Server },
      { name: 'GitHub Actions', icon: CheckCircle2 }
    ],
    metrics: '78/78 Passed • 100% Success Rate • CI/CD Verified',
    github: 'https://github.com/Jeevankumar1510/api-automation-framework',
    liveDemo: 'https://github.com/Jeevankumar1510/api-automation-framework#test-reports',
    hasLiveDemo: true,
    visualIdentityType: 'apiTesting'
  },

  // PROJECT 06 – SENTIMENT ANALYSIS USING MACHINE LEARNING
  {
    id: 'sentiment-analysis-ml',
    number: '06',
    title: 'Sentiment Analysis Using ML',
    subtitle: 'Natural Language Processing & Polarity Classification',
    category: 'NLP & Machine Learning',
    tag: 'Emotional Intelligence',
    color: '#ec4899', // Pink / Rose
    accentGlow: 'rgba(236, 72, 153, 0.4)',
    description:
      'A machine learning-powered natural language processing application that analyzes unstructured user feedback and social reviews to detect and quantify emotional sentiment across text corpuses.',
    problemStatement:
      'Enterprises receive vast volumes of unstructured customer feedback, survey comments, and reviews that are impossible to manually read and categorize into actionable sentiment metrics in real time.',
    solution:
      'Trained an NLP sentiment engine with TF-IDF vectorization and multi-class Naive Bayes classification to categorize text into positive, neutral, and negative sentiment with interactive visualizations.',
    features: [
      'Comprehensive text preprocessing, punctuation stripping and casing normalization.',
      'Stop-word removal, regex cleaning, and intelligent tokenization.',
      'TF-IDF feature extraction and n-gram vectorization.',
      'Supervised sentiment classification using Multinomial Naive Bayes & Logistic Regression.',
      'Precise positive, negative, and neutral sentiment polarity predictions.',
      'Model evaluation with confusion matrices and F1-score benchmarks.',
      'Interactive sentiment distribution charts and word-cloud visualization.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Machine Learning', icon: BrainCircuit },
      { name: 'NLP', icon: Sparkles },
      { name: 'Pandas', icon: Table },
      { name: 'NumPy', icon: Binary },
      { name: 'Scikit-learn', icon: BarChart3 }
    ],
    metrics: '91.2% F1-Score • Multi-Class Polarity Engine',
    github: 'https://github.com/Jeevankumar1510/sentiment-analysis-ml',
    liveDemo: null,
    hasLiveDemo: false,
    visualIdentityType: 'sentiment'
  },

  // PROJECT 07 – SELF-HEALING AI AGENT
  {
    id: 'self-healing-ai-agent',
    number: '07',
    title: 'Self-Healing AI Agent',
    subtitle: 'Autonomous Failure Diagnosis & Automated Recovery',
    category: 'Agentic AI & DevOps',
    tag: 'Autonomous Agent',
    color: '#06b6d4', // Cyan / Teal
    accentGlow: 'rgba(6, 182, 212, 0.4)',
    description:
      'An autonomous AI agent engineered to detect distributed server anomalies, analyze stack traces via LLM reasoning, formulate root-cause hypotheses, and execute self-healing corrective scripts with verification loops.',
    problemStatement:
      'Transient server errors, memory spikes, and container crashes often require on-call engineering intervention at all hours, leading to service degradation and increased Mean Time to Resolution (MTTR).',
    solution:
      'Constructed an autonomous Agentic AI monitoring daemon that intercepts system anomalies, conducts automated root-cause analysis with LLM reasoning, executes sandbox-verified recovery scripts, and ensures zero downtime.',
    features: [
      'Automated real-time error detection and exception interception.',
      'Continuous system health telemetry and latency monitoring.',
      'Automated failure log analysis powered by LLM reasoning chains.',
      'Root cause identification and matching against historical incident bases.',
      'Intelligent recovery action selection (service restart, memory flush, fallback route).',
      'Automated recovery script execution inside secure sandboxes.',
      'Post-healing health verification checks and regression validation.',
      'Audit log tracking failure history, recovery duration, and system uptime.'
    ],
    technologies: [
      { name: 'Python', icon: Code2 },
      { name: 'Agentic AI', icon: Bot },
      { name: 'Generative AI', icon: Sparkles },
      { name: 'LLMs', icon: BrainCircuit },
      { name: 'FastAPI', icon: Zap }
    ],
    metrics: 'Automated Zero-Downtime Recovery • Sub-30s MTTR',
    github: 'https://github.com/Jeevankumar1510/self-healing-ai-agent',
    liveDemo: null,
    hasLiveDemo: false,
    visualIdentityType: 'selfHealing'
  }
];

// Alias for backwards compatibility
export const SPIRAL_PROJECTS_DATA = TUNNEL_PROJECTS_DATA;
