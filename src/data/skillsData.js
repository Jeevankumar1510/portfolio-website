import { Code2, BrainCircuit, Binary, Server, Cloud, Database } from 'lucide-react';

export const SKILL_CATEGORIES = [
  {
    id: 'all',
    name: 'All Featured',
    symbol: '🌟',
    badge: 'Core Technology Stack',
    color: '#00f0ff',
    description: 'A curated selection of primary engineering capabilities across AI, Cloud, Python, and Full-Stack APIs.'
  },
  {
    id: 'programming',
    name: 'Programming',
    symbol: '💻',
    badge: 'Core Languages',
    color: '#00f0ff',
    description: 'Foundational programming and relational query languages for intelligent backend architecture.'
  },
  {
    id: 'aiml',
    name: 'AI & Machine Learning',
    symbol: '🧠',
    badge: 'Neural & Agentic AI',
    color: '#a855f7',
    description: 'Advanced machine learning, deep neural networks, autonomous agentic loops, and generative AI.'
  },
  {
    id: 'libraries',
    name: 'Python Libraries',
    symbol: '📊',
    badge: 'Data & Vision Toolkit',
    color: '#38bdf8',
    description: 'High-performance vector mathematics, data wrangling, scientific charting, and computer vision.'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    symbol: '⚙️',
    badge: 'Production APIs',
    color: '#10b981',
    description: 'High-throughput asynchronous web frameworks, RESTful microservices, and enterprise full-stack MVC.'
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    symbol: '☁️',
    badge: 'AWS & Azure Architecture',
    color: '#f59e0b',
    description: 'Serverless compute, scalable object storage, security policy orchestration, and cognitive cloud AI.'
  },
  {
    id: 'databases',
    name: 'Databases',
    symbol: '🗄️',
    badge: 'Relational & NoSQL',
    color: '#6366f1',
    description: 'Relational ACID persistence, document stores, high-availability key-value databases, and query tuning.'
  },
  {
    id: 'tools',
    name: 'Developer Tools',
    symbol: '🛠️',
    badge: 'DevOps & Workflow',
    color: '#ec4899',
    description: 'Version control workflows, CI/CD automated deployment, developer IDEs, and exploratory notebooks.'
  }
];

export const ALL_SKILLS_DATA = [
  // 1. Programming
  {
    id: 'python',
    name: 'Python',
    category: 'programming',
    categoryLabel: 'Programming',
    iconName: 'Code2',
    color: '#00f0ff',
    level: 96,
    tag: 'Primary Core Language',
    role: 'AI/ML, Microservices, Boto3 & Automated Testing',
    desc: 'Primary language for developing AI pipelines, asynchronous REST APIs, cloud automations, and enterprise test suites (100% pass rate).'
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'programming',
    categoryLabel: 'Programming',
    iconName: 'Database',
    color: '#38bdf8',
    level: 90,
    tag: 'Relational Queries',
    role: 'Complex Joins, Indexing & Query Optimization',
    desc: 'Designing normalized schemas, writing high-performance joins, aggregations, window functions, and indexing for low-latency queries.'
  },

  // 2. AI & Machine Learning
  {
    id: 'machine-learning',
    name: 'Machine Learning',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'BrainCircuit',
    color: '#a855f7',
    level: 92,
    tag: 'Predictive Algorithms',
    role: 'Classification, Regression & Model Evaluation',
    desc: 'Engineering supervised and unsupervised learning algorithms, feature scaling, cross-validation, and metrics (Precision, Recall, ROC-AUC).'
  },
  {
    id: 'deep-learning',
    name: 'Deep Learning',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'Cpu',
    color: '#c084fc',
    level: 90,
    tag: 'Neural Architectures',
    role: 'CNNs, Backpropagation & Loss Optimization',
    desc: 'Designing deep convolutional networks and neural architectures with custom loss functions and gradient descent optimization.'
  },
  {
    id: 'generative-ai',
    name: 'Generative AI',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'Sparkles',
    color: '#00f0ff',
    level: 94,
    tag: 'LLMs & RAG',
    role: 'Prompt Strategies, Embeddings & Semantic Search',
    desc: 'Building intelligent applications with LLMs, retrieval-augmented generation (RAG), vector chunking, and contextual guardrails.'
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'Bot',
    color: '#ec4899',
    level: 90,
    tag: 'Autonomous Loops',
    role: 'Multi-Agent Systems & Dynamic Tool-Calling',
    desc: 'Architecting autonomous agentic loops, function calling, tool use, goal decomposition, and multi-step reasoning systems.'
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'Layers',
    color: '#f97316',
    level: 86,
    tag: 'Deep Learning Framework',
    role: 'Keras Models & Distributed Training',
    desc: 'Building sequential and functional neural networks, callbacks, dataset pipelines, and model deployment.'
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'Flame',
    color: '#ef4444',
    level: 89,
    tag: 'Tensors & Autograd',
    role: 'Dynamic Graphs & Computer Vision Training',
    desc: 'Developing deep learning architectures with dynamic computational graphs, CUDA acceleration, and PyTorch vision models.'
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-learn',
    category: 'aiml',
    categoryLabel: 'AI & Machine Learning',
    iconName: 'BarChart3',
    color: '#38bdf8',
    level: 92,
    tag: 'Predictive Pipelines',
    role: 'Pipelines, Feature Extraction & Grid Search',
    desc: 'Building end-to-end ML pipelines with imputation, one-hot encoding, model selection, and hyperparameter tuning.'
  },

  // 3. Python Libraries
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'libraries',
    categoryLabel: 'Python Libraries',
    iconName: 'Binary',
    color: '#00f0ff',
    level: 95,
    tag: 'Matrix Math',
    role: 'Vectorized Computations & N-D Arrays',
    desc: 'High-speed linear algebra, multidimensional array slicing, broadcasting, and vectorization eliminating Python loop bottlenecks.'
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'libraries',
    categoryLabel: 'Python Libraries',
    iconName: 'Table',
    color: '#38bdf8',
    level: 96,
    tag: 'Data Wrangling',
    role: 'DataFrames, Time Series & Aggregation',
    desc: 'Large-scale tabular data wrangling, missing-value imputation, grouped statistical summaries, and ETL data cleaning.'
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'libraries',
    categoryLabel: 'Python Libraries',
    iconName: 'LineChart',
    color: '#10b981',
    level: 88,
    tag: 'Scientific Plotting',
    role: 'Distribution Graphs, Histograms & Heatmaps',
    desc: 'Creating publication-ready statistical visualizations, confusion matrices, ROC curves, and EDA graphics.'
  },
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'libraries',
    categoryLabel: 'Python Libraries',
    iconName: 'Eye',
    color: '#f43f5e',
    level: 92,
    tag: 'Computer Vision',
    role: 'Real-Time Frame Processing & Tracking',
    desc: 'Video stream acquisition, color space transformations, bounding box rendering, spatial heatmaps, and YOLO integration.'
  },

  // 4. Backend Development
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    categoryLabel: 'Backend Development',
    iconName: 'Server',
    color: '#10b981',
    level: 90,
    tag: 'Full-Stack Framework',
    role: 'ORM, Authentication & Scalable Web Apps',
    desc: 'Developing robust web platforms with Django ORM, custom authentication, database migrations, and administrative dashboards.'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    categoryLabel: 'Backend Development',
    iconName: 'Zap',
    color: '#00f0ff',
    level: 95,
    tag: 'Async REST APIs',
    role: 'High-Throughput Endpoints & Pydantic Schemas',
    desc: 'Crafting ultra-fast asynchronous APIs, request validation, automated Swagger/OpenAPI documentation, and dependency injection.'
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'backend',
    categoryLabel: 'Backend Development',
    iconName: 'Network',
    color: '#6366f1',
    level: 94,
    tag: 'API Architecture',
    role: 'Microservices, Status Codes & Payloads',
    desc: 'Designing stateless RESTful conventions, JSON schema validation, error handling, rate limiting, and CORS security.'
  },

  // 5. Cloud Computing
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'Cloud',
    color: '#f59e0b',
    level: 92,
    tag: 'Elastic Compute',
    role: 'Virtual Server Provisioning & Auto-Scaling',
    desc: 'Deploying Linux instances, configuring security groups, SSH key pairs, elastic IPs, and automated instance monitoring.'
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'HardDrive',
    color: '#f59e0b',
    level: 94,
    tag: 'Object Storage',
    role: 'Buckets, Lifecycle Rules & Boto3 Automation',
    desc: 'Managing secure cloud object storage, bucket access policies, static asset hosting, versioning, and programmatic upload scripts.'
  },
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'Workflow',
    color: '#f59e0b',
    level: 90,
    tag: 'Serverless Compute',
    role: 'Event-Driven Functions & API Gateway',
    desc: 'Writing serverless Python micro-functions triggered by S3 uploads, HTTP API Gateway calls, and scheduled cron events.'
  },
  {
    id: 'aws-iam',
    name: 'AWS IAM',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'Shield',
    color: '#f59e0b',
    level: 92,
    tag: 'Access Security',
    role: 'Least-Privilege Roles & JSON Policies',
    desc: 'Enforcing cloud security boundaries, IAM users, groups, role delegation, multi-factor authentication, and permission policies.'
  },
  {
    id: 'aws-rds',
    name: 'AWS RDS',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'Database',
    color: '#f59e0b',
    level: 88,
    tag: 'Managed Databases',
    role: 'Relational Database Provisioning & Backups',
    desc: 'Configuring managed PostgreSQL and MySQL instances, automated snapshot backups, subnet groups, and high availability.'
  },
  {
    id: 'azure-ai',
    name: 'Azure AI',
    category: 'cloud',
    categoryLabel: 'Cloud Computing',
    iconName: 'Sparkles',
    color: '#38bdf8',
    level: 88,
    tag: 'Certified Cloud AI',
    role: 'Cognitive Services & Computer Vision (AI-900)',
    desc: 'Microsoft Certified: Azure AI Fundamentals (AI-900). Leveraging Azure Computer Vision, NLP, and Responsible AI principles.'
  },

  // 6. Databases
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'Databases',
    iconName: 'Database',
    color: '#38bdf8',
    level: 90,
    tag: 'Relational Storage',
    role: 'Transactional Tables & Foreign Key Constraints',
    desc: 'Designing structured relational tables, enforcing referential integrity, writing stored procedures, and index optimization.'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'Databases',
    iconName: 'Layers',
    color: '#6366f1',
    level: 92,
    tag: 'Advanced SQL',
    role: 'JSONB Types, Full-Text Search & Complex Joins',
    desc: 'Enterprise database management with JSONB semi-structured indexing, concurrent query handling, and ACID compliance.'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'Databases',
    iconName: 'Boxes',
    color: '#10b981',
    level: 86,
    tag: 'NoSQL Document Store',
    role: 'BSON Schemas, Aggregation & Collections',
    desc: 'Flexible document data modeling, multi-stage aggregation pipelines, geospatial indexing, and dynamic schema evolution.'
  },
  {
    id: 'dynamodb',
    name: 'DynamoDB',
    category: 'databases',
    categoryLabel: 'Databases',
    iconName: 'Zap',
    color: '#f59e0b',
    level: 85,
    tag: 'Serverless NoSQL',
    role: 'Partition Keys, Sort Keys & Fast Retrieval',
    desc: 'Single-digit millisecond latency key-value storage, partition key modeling, global secondary indexes (GSI), and auto-scaling.'
  },

  // 7. Developer Tools
  {
    id: 'git',
    name: 'Git',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    iconName: 'GitBranch',
    color: '#ef4444',
    level: 94,
    tag: 'Version Control',
    role: 'Branching Strategies, Merges & Git CLI',
    desc: 'Distributed version control, conflict resolution, rebase workflows, interactive staging, and tag management.'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    iconName: 'Github',
    color: '#a855f7',
    level: 95,
    tag: 'CI/CD & Collaboration',
    role: 'GitHub Actions, PR Reviews & Releases',
    desc: 'Automating CI/CD test regression pipelines with GitHub Actions, pull request code reviews, issue tracking, and repository security.'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    iconName: 'Code',
    color: '#38bdf8',
    level: 96,
    tag: 'Primary IDE',
    role: 'Debugging, Virtual Envs & Extensions',
    desc: 'Optimized development environment with virtual environment management, Pytest test runners, Git lens, and linters.'
  },
  {
    id: 'jupyter',
    name: 'Jupyter Notebook',
    category: 'tools',
    categoryLabel: 'Developer Tools',
    iconName: 'BookOpen',
    color: '#f97316',
    level: 95,
    tag: 'Data Science Lab',
    role: 'Interactive EDA, Prototyping & Visualizations',
    desc: 'Interactive data exploration, rapid ML algorithm prototyping, data visualization outputs, and experimental documentation.'
  }
];

// Featured skills for "all" view
export const FEATURED_SKILLS = [
  ALL_SKILLS_DATA.find((s) => s.id === 'python'),
  ALL_SKILLS_DATA.find((s) => s.id === 'generative-ai'),
  ALL_SKILLS_DATA.find((s) => s.id === 'machine-learning'),
  ALL_SKILLS_DATA.find((s) => s.id === 'pandas'),
  ALL_SKILLS_DATA.find((s) => s.id === 'numpy'),
  ALL_SKILLS_DATA.find((s) => s.id === 'fastapi'),
  ALL_SKILLS_DATA.find((s) => s.id === 'django'),
  ALL_SKILLS_DATA.find((s) => s.id === 'aws-ec2'),
  ALL_SKILLS_DATA.find((s) => s.id === 'aws-s3'),
  ALL_SKILLS_DATA.find((s) => s.id === 'azure-ai'),
  ALL_SKILLS_DATA.find((s) => s.id === 'postgresql'),
  ALL_SKILLS_DATA.find((s) => s.id === 'github')
].filter(Boolean);

export const getSkillsForCategory = (catId) => {
  if (!catId || catId === 'all') {
    return FEATURED_SKILLS;
  }
  return ALL_SKILLS_DATA.filter((s) => s.category === catId);
};

export const SKILL_CUBE_FACES = [
  {
    id: 'programming',
    faceName: 'Front Face',
    categoryName: 'Programming',
    title: 'Python & SQL Core',
    badge: 'Core Languages',
    icon: Code2,
    color: '#00f0ff',
    targetRot: { x: 0, y: 0 },
    description: 'Foundational programming and relational query languages powering intelligent backend architectures, algorithms, and automated test frameworks.',
    skills: [
      { name: 'Python', level: 96, tag: 'Primary Core Language (AI/ML & APIs)' },
      { name: 'SQL', level: 90, tag: 'Complex Joins, Indexing & Schemas' }
    ]
  },
  {
    id: 'aiml',
    faceName: 'Right Face',
    categoryName: 'AI & Machine Learning',
    title: 'Neural, Agentic & Gen AI',
    badge: 'AI Models & Agents',
    icon: BrainCircuit,
    color: '#a855f7',
    targetRot: { x: 0, y: -90 },
    description: 'Autonomous agentic loops, prompt engineering, RAG, deep neural networks, computer vision, and predictive ML classifiers.',
    skills: [
      { name: 'Generative AI', level: 94, tag: 'LLMs, Prompt Engineering & RAG' },
      { name: 'Agentic AI', level: 90, tag: 'Autonomous Multi-Agent Loops' },
      { name: 'Machine Learning', level: 92, tag: 'Supervised & Unsupervised ML' },
      { name: 'Deep Learning', level: 90, tag: 'CNNs & Neural Architectures' },
      { name: 'PyTorch & TensorFlow', level: 89, tag: 'Deep Learning Frameworks' },
      { name: 'Scikit-learn', level: 92, tag: 'Predictive Feature Pipelines' }
    ]
  },
  {
    id: 'libraries',
    faceName: 'Back Face',
    categoryName: 'Python Libraries',
    title: 'Data & Vision Toolkit',
    badge: 'High-Performance Math',
    icon: Binary,
    color: '#38bdf8',
    targetRot: { x: 0, y: 180 },
    description: 'High-speed matrix vectorization, large-scale dataset cleaning, computer vision frame acquisition, and publication-ready statistical charting.',
    skills: [
      { name: 'NumPy', level: 95, tag: 'Matrix Math & Vectorized Computations' },
      { name: 'Pandas', level: 96, tag: 'Data Wrangling, Time Series & ETL' },
      { name: 'OpenCV', level: 92, tag: 'Real-Time Frame Processing & Tracking' },
      { name: 'Matplotlib', level: 88, tag: 'Statistical Plotting & Heatmaps' }
    ]
  },
  {
    id: 'backend',
    faceName: 'Left Face',
    categoryName: 'Backend Development',
    title: 'High-Throughput APIs',
    badge: 'Production Frameworks',
    icon: Server,
    color: '#10b981',
    targetRot: { x: 0, y: 90 },
    description: 'Ultra-fast asynchronous microservices, full-stack MVC platforms, and enterprise RESTful API architectures.',
    skills: [
      { name: 'FastAPI', level: 95, tag: 'Async Endpoints & Pydantic Validation' },
      { name: 'Django', level: 90, tag: 'Full-Stack ORM, Auth & Admin' },
      { name: 'REST APIs', level: 94, tag: 'Microservices & JSON Conformance' }
    ]
  },
  {
    id: 'cloud',
    faceName: 'Top Face',
    categoryName: 'Cloud Computing',
    title: 'AWS & Azure Architecture',
    badge: 'Certified Cloud',
    icon: Cloud,
    color: '#f59e0b',
    targetRot: { x: -90, y: 0 },
    description: 'Certified cloud infrastructure orchestration, automated Boto3 provisioning scripts, serverless event pipelines, and cognitive AI services.',
    skills: [
      { name: 'AWS EC2 & S3', level: 93, tag: 'Compute Instances & Object Storage' },
      { name: 'AWS Lambda', level: 90, tag: 'Serverless Event-Driven Functions' },
      { name: 'AWS IAM & RDS', level: 92, tag: 'Access Security & Managed DBs' },
      { name: 'Azure AI (AI-900)', level: 88, tag: 'Certified Cognitive Services' }
    ]
  },
  {
    id: 'databases_tools',
    faceName: 'Bottom Face',
    categoryName: 'Databases & Tools',
    title: 'Data Stores & DevOps',
    badge: 'ACID & Workflows',
    icon: Database,
    color: '#ec4899',
    targetRot: { x: 90, y: 0 },
    description: 'Relational ACID persistence, document storage, automated CI/CD GitHub regression workflows, and developer IDE environments.',
    skills: [
      { name: 'PostgreSQL & MySQL', level: 91, tag: 'Relational ACID & Complex Queries' },
      { name: 'MongoDB & DynamoDB', level: 86, tag: 'NoSQL Documents & Key-Value Stores' },
      { name: 'Git & GitHub Actions', level: 95, tag: 'Version Control & CI/CD Regression' },
      { name: 'VS Code & Jupyter', level: 96, tag: 'IDE & Interactive Notebooks' }
    ]
  }
];

