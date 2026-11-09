import React from 'react';
import { X, Download, FileText, CheckCircle, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    playSuccessSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#38bdf8', '#a855f7', '#ffffff']
    });

    const resumeText = `
JIYYANI JEEVAN KUMAR
AI Engineer | Machine Learning | Generative AI & Cloud
Hyderabad, India | +91-9391340978 | jiyyanijeevankumar@gmail.com
GitHub: https://github.com/Jeevankumar1510 | LinkedIn: https://www.linkedin.com/in/jeevan-kumar-jiyyani-364a882a9

PROFESSIONAL SUMMARY
Computer Science graduate with an 8.12/10 CGPA, two completed cloud & AI certifications, and project work across computer vision, machine-learning classification, resume analysis, and AI-enabled job matching. Knowledge spans ML, Deep Learning, Data Science, and Generative AI concepts including LLMs, Retrieval-Augmented Generation (RAG), vector embeddings, and autonomous AI agents. AWS Certified Cloud Practitioner and Microsoft Certified: Azure AI Fundamentals (AI-900).

TECHNICAL SKILLS
- Programming: Python, SQL, JavaScript
- Generative AI & Agentic AI: LLM Fundamentals, Prompt Engineering, RAG Concepts, Embeddings, Semantic Search, AI Agents & Tool Calling
- Machine Learning & Deep Learning: Scikit-learn, PyTorch, TensorFlow, Keras, OpenCV, YOLOv8; Neural Networks, Object Detection, Hyperparameter Tuning
- Backend & Web: Django, FastAPI, Streamlit, REST APIs, HTML/CSS, React.js
- Cloud & Infrastructure: AWS (EC2, S3, Lambda, IAM), Microsoft Azure, Docker, Linux, CI/CD GitHub Actions
- Databases & Data Science: PostgreSQL, MySQL, MongoDB, Pandas, NumPy, Matplotlib, Seaborn

EDUCATION
- B.Tech. in Computer Science and Engineering | GIET Engineering College, Rajahmundry (2022 – 2025) | CGPA: 8.12/10
- Diploma in Mechanical Engineering | M.R.A.G.R Government Polytechnic College (2019 – 2022) | CGPA: 8.84/10
- SSC | AP Model School, Narsipatnam (2018 – 2019) | CGPA: 9.5/10

INTERNSHIPS
- AWS Cloud Intern | Techwing, Rajahmundry (Feb 2024 – Aug 2024)
  * Automated Python-based provisioning workflows across 4 AWS services: EC2, S3, Lambda, IAM.
  * Improved deployment efficiency by approximately 40% through workflow automation.
- AI & Machine Learning Intern | Blackbucks, Tirupati (May 2023 – June 2023)
  * Prepared datasets through data cleaning, preprocessing, and feature engineering.
  * Developed predictive models using Python, Pandas, NumPy, and Scikit-learn.

PROJECTS
- Crowd Management Using AI (Python, YOLOv8, OpenCV, DeepSORT, Streamlit, PyTorch)
- AI Job Connect (Python, AI/ML, SQL, React.js, FastAPI)
- AI Resume Analyzer (Python, Django, NLP, HTML, CSS, JavaScript)
- Heart Disease Detection (Python, Pandas, NumPy, Scikit-learn, Machine Learning)
- REST API Automation Testing Framework (Python, Pytest, Requests, JSON Schema, GitHub Actions)

CERTIFICATIONS
- AWS Certified Cloud Practitioner
- Microsoft Certified: Azure AI Fundamentals (AI-900)
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Jeevan_Kumar_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl glass-panel-glow rounded-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto border border-cyan-500/40 text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans">
              {PERSONAL_INFO.fullName}
            </h3>
            <p className="text-sm text-cyan-400 font-mono">
              {PERSONAL_INFO.title}
            </p>
          </div>
        </div>

        {/* Quick Contact Chips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6 text-xs font-mono">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">{PERSONAL_INFO.email}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{PERSONAL_INFO.phone}</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
            <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">Hyderabad, India</span>
          </div>
        </div>

        {/* Summary Card */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
            Executive Summary
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {PERSONAL_INFO.bio}
          </p>
        </div>

        {/* Core Competencies */}
        <div className="mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
            Key Competencies & Core Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Generative AI & LLMs",
              "Agentic AI & Tool-Calling",
              "RAG & Vector Search",
              "Machine Learning & Deep Learning",
              "PyTorch & TensorFlow",
              "YOLOv8 & OpenCV",
              "FastAPI & Django",
              "AWS Cloud (EC2, S3, Lambda, IAM)",
              "Microsoft Azure AI (AI-900)",
              "Pytest CI/CD Integration"
            ].map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/40 text-cyan-300 border border-cyan-800/50"
              >
                <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-400 font-mono">
            AWS Certified Cloud Practitioner & Azure AI-900
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm text-black bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="px-4 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
