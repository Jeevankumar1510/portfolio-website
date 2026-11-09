import React from 'react';
import {
  Camera, Eye, Activity, ShieldCheck, CheckCircle2,
  AlertTriangle, Bot, Zap, Sparkles, Server, Terminal,
  TrendingUp, BarChart2, Check, RefreshCw
} from 'lucide-react';

const ProjectVisualIdentity = ({ type, color = '#00f0ff' }) => {
  switch (type) {
    // 01. Surveillance AI Dashboard
    case 'surveillance':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-cyan-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse pointer-events-none" />
          
          {/* Top Bar */}
          <div className="flex items-center justify-between text-[10px] z-10 border-b border-cyan-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Camera className="w-3 h-3 text-red-500 animate-pulse" />
              <span>CAM-04 // SECTOR A9</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[9px] font-bold">
              LIVE • 30 FPS
            </span>
          </div>

          {/* Central Mock Video Frame with Bounding Boxes & Heatmap */}
          <div className="relative flex-1 my-1.5 rounded bg-slate-900/70 border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Heatmap overlay dots */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(0,240,255,0.25)_0%,rgba(239,68,68,0.25)_35%,transparent_70%)]" />
            
            {/* Bounding Box 1 */}
            <div className="absolute left-6 top-4 w-16 h-20 border border-cyan-400 bg-cyan-400/10 flex flex-col justify-between p-1">
              <span className="text-[8px] text-cyan-300 font-bold">P1: 98%</span>
              <span className="text-[7px] text-cyan-400 self-end">Track#14</span>
            </div>

            {/* Bounding Box 2 (Dense Zone) */}
            <div className="absolute right-12 bottom-3 w-20 h-22 border border-red-500 bg-red-500/15 flex flex-col justify-between p-1">
              <span className="text-[8px] text-red-400 font-bold flex items-center gap-0.5">
                <AlertTriangle className="w-2.5 h-2.5 text-red-400" />
                <span>HIGH DENSITY</span>
              </span>
              <span className="text-[7px] text-red-300">Crowd Alert</span>
            </div>

            <div className="text-center z-10">
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                48 <span className="text-xs text-cyan-400 font-normal">Tracked</span>
              </div>
              <div className="text-[9px] text-slate-400">Spatial Density: 84%</div>
            </div>
          </div>

          {/* Bottom Telemetry */}
          <div className="flex items-center justify-between text-[10px] z-10 pt-1 text-slate-400">
            <span className="text-cyan-300">YOLOv8 + DeepSORT</span>
            <span className="text-emerald-400 font-bold">Email Alerts: Active</span>
          </div>
        </div>
      );

    // 02. AI Job Connect Match Dashboard
    case 'jobConnect':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-blue-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-blue-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-blue-400 font-bold">
              <Bot className="w-3.5 h-3.5 text-blue-400" />
              <span>NEURAL MATCHER // V2.4</span>
            </span>
            <span className="text-blue-300 text-[9px] font-bold">TOP MATCH</span>
          </div>

          <div className="grid grid-cols-12 gap-2 my-1 items-center flex-1">
            {/* Match Circle Gauge */}
            <div className="col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 rounded-full border-2 border-blue-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-950/40">
                <div className="text-center">
                  <div className="text-lg font-black text-white">96%</div>
                  <div className="text-[7px] text-blue-300 uppercase">Match</div>
                </div>
              </div>
            </div>

            {/* Skill Similarity Breakdown */}
            <div className="col-span-8 space-y-1.5 text-[9px]">
              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>FastAPI & Python Core</span>
                  <span className="text-blue-400 font-bold">98%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-blue-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>Machine Learning & NLP</span>
                  <span className="text-blue-400 font-bold">94%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[94%] h-full bg-blue-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-0.5">
                  <span>SQL & Vector Embeddings</span>
                  <span className="text-blue-400 font-bold">91%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[91%] h-full bg-indigo-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
            <span className="text-blue-300">Role: AI & Backend Engineer</span>
            <span className="text-emerald-400 font-bold">Verified Candidate</span>
          </div>
        </div>
      );

    // 03. AI Resume Analyzer ATS Dashboard
    case 'resumeAnalyzer':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-purple-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-purple-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-purple-400 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ATS INTELLIGENCE ENGINE</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-bold">
              PDF PARSED
            </span>
          </div>

          <div className="flex items-center justify-around my-1 flex-1">
            {/* ATS Score Dial */}
            <div className="text-center">
              <div className="text-2xl font-black text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                94<span className="text-xs text-slate-400 font-normal">/100</span>
              </div>
              <div className="text-[9px] text-purple-400 font-semibold uppercase">ATS Compatibility</div>
            </div>

            {/* Extracted Chips */}
            <div className="space-y-1 text-[9px]">
              <div className="text-slate-400">Parsed Key Competencies:</div>
              <div className="flex flex-wrap gap-1 max-w-[170px]">
                {['Django', 'NLP', 'Python', 'REST', 'PyTorch'].map((chip, idx) => (
                  <span key={idx} className="px-1.5 py-0.5 rounded bg-purple-950/70 border border-purple-800 text-purple-300 text-[8px]">
                    ✓ {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
            <span className="text-emerald-400">Keywords: 96% Match</span>
            <span className="text-purple-300 font-bold">High Interview Probability</span>
          </div>
        </div>
      );

    // 04. Medical Analytics Dashboard
    case 'medical':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-emerald-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-emerald-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>CLINICAL DIAGNOSTIC ML</span>
            </span>
            <span className="text-emerald-300 text-[9px] font-bold">STATUS: STABLE</span>
          </div>

          {/* ECG Pulse Waveform Visual */}
          <div className="relative h-14 my-1 bg-slate-900/60 rounded border border-slate-800 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full stroke-emerald-400 fill-none" viewBox="0 0 300 60" preserveAspectRatio="none">
              <path
                d="M0,30 L60,30 L75,10 L85,50 L95,20 L105,35 L115,30 L180,30 L195,8 L205,52 L215,18 L225,38 L235,30 L300,30"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset="0"
                className="drop-shadow-[0_0_8px_#10b981]"
              />
            </svg>
            <div className="absolute right-3 top-2 text-[10px] text-emerald-300 font-bold">
              72 BPM
            </div>
          </div>

          {/* Biomarkers */}
          <div className="grid grid-cols-3 gap-1 text-[9px] text-center">
            <div className="p-1 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[8px]">Risk Probability</div>
              <div className="text-emerald-300 font-bold">LOW (12.4%)</div>
            </div>
            <div className="p-1 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[8px]">Cholesterol</div>
              <div className="text-white font-bold">182 mg/dL</div>
            </div>
            <div className="p-1 rounded bg-slate-900 border border-slate-800">
              <div className="text-slate-400 text-[8px]">Accuracy</div>
              <div className="text-cyan-300 font-bold">88.5%</div>
            </div>
          </div>
        </div>
      );

    // 05. REST API Automation Testing Console
    case 'apiTesting':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-amber-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-amber-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>PYTEST AUTOMATION SUITE</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px] font-bold border border-emerald-500/40">
              78/78 PASSED • 100%
            </span>
          </div>

          {/* Test Logs */}
          <div className="my-1 space-y-1 text-[9px] leading-tight overflow-hidden">
            <div className="flex items-center justify-between p-1 rounded bg-slate-900/80 border border-slate-800/80">
              <span className="text-cyan-300">GET /api/v1/auth/tokens</span>
              <span className="text-emerald-400 font-bold">200 OK • 38ms</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded bg-slate-900/80 border border-slate-800/80">
              <span className="text-cyan-300">POST /api/v1/crowd/detect</span>
              <span className="text-emerald-400 font-bold">201 CREATED • 82ms</span>
            </div>
            <div className="flex items-center justify-between p-1 rounded bg-slate-900/80 border border-slate-800/80">
              <span className="text-cyan-300">PUT /api/v1/candidate/profile</span>
              <span className="text-emerald-400 font-bold">200 OK • 44ms</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400 border-t border-slate-800">
            <span className="text-amber-300 font-semibold">CI/CD: GitHub Actions</span>
            <span className="text-emerald-400 font-bold">Zero Regression Failures</span>
          </div>
        </div>
      );

    // 06. Sentiment Analysis Dashboard
    case 'sentiment':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-pink-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-pink-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-pink-400 font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
              <span>NLP SENTIMENT CLASSIFIER</span>
            </span>
            <span className="text-pink-300 text-[9px] font-bold">F1: 91.2%</span>
          </div>

          {/* Sentiment Distribution Bars */}
          <div className="my-1.5 space-y-1.5 text-[9px] flex-1 justify-center flex flex-col">
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Positive Sentiment
                </span>
                <span className="text-white font-bold">78.4%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[78.4%] h-full bg-emerald-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span className="text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Neutral Sentiment
                </span>
                <span className="text-white font-bold">15.8%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[15.8%] h-full bg-slate-400 rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span className="text-pink-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  Negative Sentiment
                </span>
                <span className="text-white font-bold">5.8%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[5.8%] h-full bg-pink-500 rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
            <span className="text-pink-300">Model: Multinomial NB</span>
            <span className="text-emerald-400 font-bold">High Polarity Confidence</span>
          </div>
        </div>
      );

    // 07. Self-Healing AI Agent Command Center
    case 'selfHealing':
      return (
        <div className="relative w-full h-44 sm:h-48 rounded-xl bg-slate-950/90 border border-teal-500/30 overflow-hidden font-mono p-3 select-none flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-teal-500/20 pb-1.5">
            <span className="flex items-center gap-1.5 text-teal-400 font-bold">
              <Bot className="w-3.5 h-3.5 text-teal-400" />
              <span>AI HEALING AGENT // COCKPIT</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px] font-bold border border-emerald-500/40 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>OPERATIONAL</span>
            </span>
          </div>

          {/* Healing Pipeline Timeline */}
          <div className="my-1.5 space-y-1.5 text-[9px]">
            <div className="p-1.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Memory Spike Intercepted</span>
              </span>
              <span className="text-amber-400 font-bold">Diagnosed</span>
            </div>

            <div className="p-1.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <RefreshCw className="w-3 h-3 text-teal-400 animate-spin" />
                <span>LLM Script Auto-Executed</span>
              </span>
              <span className="text-teal-300 font-bold">Recovered</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400 border-t border-slate-800">
            <span className="text-teal-300">MTTR: 18.4s</span>
            <span className="text-emerald-400 font-bold">100% Zero-Downtime</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default ProjectVisualIdentity;

