import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, CheckCircle2, Sparkles, Copy, Check } from 'lucide-react';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const PRESET_COMMANDS = [
  {
    cmd: 'python agent.py --task "Semantic Job Match"',
    output: [
      '[INIT] Loading vector embeddings model: text-embedding-ada-002...',
      '[LOAD] Parsing candidate profile (Python, AI/ML, FastAPI, AWS)...',
      '[FAISS] Searching 12,450 vacancies across index...',
      '[MATCH] 3 High-Affinity matches found:',
      '  -> AI Engineer @ HyperCloud (96.4% match)',
      '  -> GenAI Systems Developer (94.8% match)',
      '  -> Cloud Python Architect (92.1% match)',
      '[STATUS] Candidate vectors aligned successfully.'
    ]
  },
  {
    cmd: 'python crowd_ai.py --model yolov8x.pt --source feed.mp4',
    output: [
      '[MODEL] YOLOv8x Neural Weights loaded on CUDA device:0...',
      '[STREAM] Video stream initialized at 1920x1080 @ 60 FPS',
      '[TRACKER] DeepSORT active: 42 unique IDs locked',
      '[HEATMAP] Density index: 0.38 people/sq.m (Normal Zone)',
      '[ANOMALY] Stampede / perimeter alerts: NONE',
      '[METRICS] Inference latency: 14.2ms | FPS: 58.4'
    ]
  },
  {
    cmd: 'pytest tests/test_api_crud.py -v --tb=short',
    output: [
      'collected 78 items',
      'tests/test_api_crud.py::test_auth_headers PASSED               [  5%]',
      'tests/test_api_crud.py::test_post_user_valid PASSED            [ 22%]',
      'tests/test_api_crud.py::test_json_schema_validation PASSED     [ 48%]',
      'tests/test_api_crud.py::test_status_codes_400_401_422 PASSED   [ 76%]',
      'tests/test_api_crud.py::test_ci_cd_regression_suite PASSED     [100%]',
      '======================== 78 passed in 1.42s =========================',
      '[PASS RATE] 100% recorded test execution success.'
    ]
  },
  {
    cmd: 'aws lambda invoke --function-name ProvisionCloudWorkflows',
    output: [
      '[BOTO3] Authenticating IAM Role: arn:aws:iam::15102003:role/CloudEngineer...',
      '[EC2] Automated instance state checked: 4 running, 0 failed',
      '[S3] Multi-part backup synchronization verified',
      '[DEPLOY] Efficiency improvement calculated: ~40%',
      '{ "StatusCode": 200, "ExecutedVersion": "$LATEST", "Status": "OPTIMAL" }'
    ]
  }
];

const CyberTerminal = () => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [outputLines, setOutputLines] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);
  const terminalEndRef = useRef(null);

  const runCommand = (index) => {
    playClickSound();
    setActivePresetIndex(index);
    setIsExecuting(true);
    setOutputLines([]);

    const cmdData = PRESET_COMMANDS[index];
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < cmdData.output.length) {
        setOutputLines((prev) => [...prev, cmdData.output[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsExecuting(false);
        playSuccessSound();
      }
    }, 180);
  };

  useEffect(() => {
    // Auto-run first command on mount
    runCommand(0);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLines]);

  const copyOutput = () => {
    playClickSound();
    navigator.clipboard.writeText(outputLines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full glass-panel-glow rounded-3xl border border-cyan-500/30 overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.15)] font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="px-4 py-3 bg-[#030712]/90 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600" />
          <span className="text-slate-400 text-[11px] ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>jeevan@neural-node:~/engineering-sandbox</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyOutput}
            className="p-1 rounded text-slate-400 hover:text-cyan-300 transition-colors"
            title="Copy logs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
            Interactive Shell
          </span>
        </div>
      </div>

      {/* Preset Action Buttons Bar */}
      <div className="p-3 bg-slate-950/60 border-b border-slate-900 flex flex-wrap gap-2">
        {PRESET_COMMANDS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => runCommand(idx)}
            disabled={isExecuting}
            className={`px-3 py-1.5 rounded-lg text-[11px] flex items-center gap-1.5 transition-all ${
              activePresetIndex === idx
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(0,240,255,0.25)] font-bold'
                : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Play className="w-3 h-3 text-cyan-400" />
            <span className="truncate max-w-[200px] sm:max-w-none">
              {item.cmd.split(' ')[0]} {item.cmd.split(' ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Terminal Content Screen */}
      <div className="p-5 h-64 sm:h-72 overflow-y-auto bg-[#02050e]/95 space-y-1.5 text-slate-300 selection:bg-cyan-500 selection:text-black">
        {/* Active Command Prompt */}
        <div className="text-cyan-400 flex items-center gap-2 font-bold pb-1">
          <span>&gt;</span>
          <span>{PRESET_COMMANDS[activePresetIndex].cmd}</span>
          {isExecuting && (
            <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse ml-1" />
          )}
        </div>

        {/* Streamed Output Lines */}
        {outputLines.map((line, i) => {
          let lineStyle = 'text-slate-300';
          if (line.includes('PASSED') || line.includes('OPTIMAL') || line.includes('SUCCESS') || line.includes('100%')) {
            lineStyle = 'text-emerald-400 font-semibold';
          } else if (line.includes('[FAISS]') || line.includes('[MATCH]') || line.includes('[INIT]')) {
            lineStyle = 'text-cyan-300';
          } else if (line.includes('[MODEL]') || line.includes('[TRACKER]')) {
            lineStyle = 'text-purple-300';
          } else if (line.includes('[BOTO3]') || line.includes('[DEPLOY]')) {
            lineStyle = 'text-amber-300';
          }

          return (
            <div key={i} className={`font-mono text-xs leading-relaxed ${lineStyle}`}>
              {line}
            </div>
          );
        })}

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer Status */}
      <div className="px-4 py-2 bg-slate-950/80 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Real-time Subsystem Emulation</span>
        </div>
        <span className="text-slate-500">Press any preset above to execute pipeline</span>
      </div>
    </div>
  );
};

export default CyberTerminal;

