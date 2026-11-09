import {
  Code2, Database, BrainCircuit, Cpu, BarChart3, Layers, Flame,
  Sparkles, Bot, Workflow, Binary, Table, LineChart, Eye,
  Cloud, Server, Zap, Network, Boxes, GitBranch, Github
} from 'lucide-react';

export const CUBE_FACES_DATA = [
  // 1. Programming Face (Front)
  {
    id: 'programming',
    faceName: 'Front Face',
    category: 'Programming',
    title: 'Programming & Logic',
    badge: 'Core Languages',
    icon: Code2,
    color: '#00f0ff',
    targetRot: { x: 0, y: 0 },
    description: 'Foundational programming and relational query languages powering intelligent backend architectures, algorithmic pipelines, and automated test frameworks.',
    skills: [
      {
        name: 'Python',
        level: 96,
        tag: 'Primary Core Language',
        desc: 'Advanced Python for AI/ML, asynchronous microservices, Boto3 automation, and enterprise Pytest suites (100% pass rate).',
        icon: Code2
      },
      {
        name: 'SQL',
        level: 90,
        tag: 'Relational Database Queries',
        desc: 'Complex joins, window functions, query plan optimization, indexing strategies, and normalized schema design.',
        icon: Database
      }
    ]
  },

  // 2. AI & Machine Learning Face (Right)
  {
    id: 'aiml',
    faceName: 'Right Face',
    category: 'AI & Machine Learning',
    title: 'Machine & Deep Learning',
    badge: 'Predictive & Neural Models',
    icon: BrainCircuit,
    color: '#a855f7',
    targetRot: { x: 0, y: -90 },
    description: 'Predictive modeling, deep convolutional neural networks, feature engineering pipelines, and loss function optimization.',
    skills: [
      {
        name: 'Machine Learning',
        level: 92,
        tag: 'Supervised & Unsupervised',
        desc: 'Classification, regression, ensemble algorithms, cross-validation, and performance evaluation metrics.',
        icon: BrainCircuit
      },
      {
        name: 'Deep Learning',
        level: 90,
        tag: 'Neural Architectures',
        desc: 'Convolutional neural networks (CNNs), backpropagation, gradient descent, and custom loss functions.',
        icon: Cpu
      },
      {
        name: 'Scikit-learn',
        level: 92,
        tag: 'Predictive Pipelines',
        desc: 'End-to-end data preparation pipelines, feature scaling, grid search, and hyperparameter tuning.',
        icon: BarChart3
      },
      {
        name: 'TensorFlow',
        level: 86,
        tag: 'Deep Learning Framework',
        desc: 'Keras sequential and functional models, callbacks, dataset pipelines, and production inference.',
        icon: Layers
      },
      {
        name: 'PyTorch',
        level: 89,
        tag: 'Tensors & Autograd',
        desc: 'Dynamic computational graphs, GPU CUDA acceleration, and PyTorch deep learning vision models.',
        icon: Flame
      }
    ]
  },

  // 3. Generative AI Face (Back)
  {
    id: 'genai',
    faceName: 'Back Face',
    category: 'Generative AI',
    title: 'Generative & Agentic AI',
    badge: 'LLMs & Autonomous Agents',
    icon: Sparkles,
    color: '#38bdf8',
    targetRot: { x: 0, y: 180 },
    description: 'Large language models (LLMs), retrieval-augmented generation (RAG), vector embeddings, autonomous agentic loops, and semantic retrieval systems.',
    skills: [
      {
        name: 'Generative AI',
        level: 94,
        tag: 'LLMs & Semantic Reasoning',
        desc: 'Building applications with state-of-the-art LLMs, multi-modal generation, prompt engineering, and guardrails.',
        icon: Sparkles
      },
      {
        name: 'LLMs',
        level: 93,
        tag: 'Large Language Models',
        desc: 'Instruction tuning, fine-tuning, context window optimization, tokenization, and structured JSON outputs.',
        icon: Bot
      },
      {
        name: 'RAG',
        level: 92,
        tag: 'Retrieval-Augmented Generation',
        desc: 'Vector embeddings, chunking strategies, hybrid semantic search, and document context synthesis.',
        icon: Workflow
      },
      {
        name: 'AI Agents',
        level: 91,
        tag: 'Autonomous Function Calling',
        desc: 'Dynamic tool use, goal-oriented decision making, memory retention, and automated task execution.',
        icon: Bot
      },
      {
        name: 'Agentic AI',
        level: 90,
        tag: 'Multi-Agent Orchestration',
        desc: 'Autonomous multi-agent collaboration loops, reflection, planning, and self-correcting workflows.',
        icon: Sparkles
      }
    ]
  },

  // 4. Python Libraries Face (Left)
  {
    id: 'libraries',
    faceName: 'Left Face',
    category: 'Python Libraries',
    title: 'Data & Vision Toolkit',
    badge: 'Matrix & Computer Vision',
    icon: Binary,
    color: '#10b981',
    targetRot: { x: 0, y: 90 },
    description: 'High-performance vector mathematics, large-scale data wrangling, computer vision frame processing, and statistical data visualization.',
    skills: [
      {
        name: 'NumPy',
        level: 95,
        tag: 'Matrix Math & Vectorization',
        desc: 'Multidimensional array slicing, high-speed linear algebra, and vectorized computations eliminating loop bottlenecks.',
        icon: Binary
      },
      {
        name: 'Pandas',
        level: 96,
        tag: 'Data Wrangling & Time Series',
        desc: 'Large-scale tabular data cleaning, missing-value imputation, grouped statistics, and ETL transformation.',
        icon: Table
      },
      {
        name: 'Matplotlib',
        level: 88,
        tag: 'Scientific Data Plotting',
        desc: 'Publication-ready statistical visualizations, confusion matrices, ROC curves, and distribution plots.',
        icon: LineChart
      },
      {
        name: 'OpenCV',
        level: 92,
        tag: 'Real-Time Computer Vision',
        desc: 'Video stream acquisition, bounding box rendering, spatial heatmaps, color space transformations, and YOLO integration.',
        icon: Eye
      }
    ]
  },

  // 5. Cloud & Backend Face (Top)
  {
    id: 'cloud_backend',
    faceName: 'Top Face',
    category: 'Cloud & Backend',
    title: 'Cloud & API Architecture',
    badge: 'AWS, Azure & Asynchronous APIs',
    icon: Cloud,
    color: '#f59e0b',
    targetRot: { x: -90, y: 0 },
    description: 'Enterprise serverless cloud infrastructure, automated Boto3 orchestration scripts, high-throughput asynchronous REST APIs, and full-stack web platforms.',
    skills: [
      {
        name: 'AWS',
        level: 93,
        tag: 'EC2, S3, Lambda, IAM, RDS',
        desc: 'Virtual instances, scalable object storage, serverless micro-functions, least-privilege IAM security, and managed RDS databases.',
        icon: Cloud
      },
      {
        name: 'Azure AI',
        level: 88,
        tag: 'Certified Cloud AI (AI-900)',
        desc: 'Microsoft Certified: Azure AI Fundamentals. Leveraging Azure Cognitive Services, Computer Vision, and Responsible AI.',
        icon: Sparkles
      },
      {
        name: 'Django',
        level: 90,
        tag: 'Full-Stack Web MVC',
        desc: 'Django ORM, custom authentication, database migrations, security middleware, and administrative control panels.',
        icon: Server
      },
      {
        name: 'FastAPI',
        level: 95,
        tag: 'Async High-Throughput APIs',
        desc: 'Ultra-fast asynchronous endpoints, Pydantic request validation, automated Swagger/OpenAPI documentation, and dependency injection.',
        icon: Zap
      },
      {
        name: 'REST APIs',
        level: 94,
        tag: 'Microservices & Payloads',
        desc: 'Stateless RESTful conventions, JSON schema validation, error handling, rate limiting, and CORS configuration.',
        icon: Network
      }
    ]
  },

  // 6. Database & Tools Face (Bottom)
  {
    id: 'database_tools',
    faceName: 'Bottom Face',
    category: 'Database & Tools',
    title: 'Databases & DevOps',
    badge: 'ACID, NoSQL & Git CI/CD',
    icon: Database,
    color: '#ec4899',
    targetRot: { x: 90, y: 0 },
    description: 'Relational and NoSQL persistence layers, high-availability key-value stores, distributed Git version control, and automated GitHub Actions CI/CD workflows.',
    skills: [
      {
        name: 'MySQL',
        level: 90,
        tag: 'Relational Storage',
        desc: 'Normalized schema design, foreign key integrity, query performance indexing, and transactional operations.',
        icon: Database
      },
      {
        name: 'PostgreSQL',
        level: 92,
        tag: 'Advanced Relational & JSONB',
        desc: 'ACID compliance, JSONB semi-structured data querying, full-text search, and concurrent connection pooling.',
        icon: Database
      },
      {
        name: 'MongoDB',
        level: 86,
        tag: 'Document NoSQL Store',
        desc: 'Flexible BSON documents, multi-stage aggregation pipelines, dynamic schemas, and indexing.',
        icon: Boxes
      },
      {
        name: 'DynamoDB',
        level: 85,
        tag: 'Serverless Fast NoSQL',
        desc: 'Single-digit millisecond latency key-value retrieval, partition keys, global secondary indexes (GSI), and auto-scaling.',
        icon: Zap
      },
      {
        name: 'Git',
        level: 94,
        tag: 'Distributed Version Control',
        desc: 'Branching models, conflict resolution, interactive rebasing, commit cherry-picking, and repository workflows.',
        icon: GitBranch
      },
      {
        name: 'GitHub',
        level: 95,
        tag: 'CI/CD & Collaboration',
        desc: 'GitHub Actions automated testing regression pipelines, pull request reviews, release management, and issue tracking.',
        icon: Github
      }
    ]
  }
];

