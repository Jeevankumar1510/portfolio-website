import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Sparkles, Cloud, CheckCircle, Cpu, CheckCircle2, Lock, Zap, ArrowUpRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { CERTIFICATION_DATA } from '../../data/portfolioData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const CertificateCard = ({ cert }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playClickSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const isAws = cert.id.includes('aws');

  return (
    <div
      className="perspective-1000 w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative rounded-3xl glass-panel p-7 sm:p-9 border transition-all duration-300 transform-style-3d flex flex-col justify-between ${
          isHovered
            ? 'border-cyan-400 shadow-[0_20px_40px_rgba(0,240,255,0.25)] -translate-y-2'
            : 'border-slate-800/90 hover:border-cyan-500/40 shadow-xl'
        }`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
        }}
      >
        {/* Subtle Ambient Badge Glow */}
        <div
          className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300"
          style={{
            background: isAws ? 'rgba(245, 158, 11, 0.18)' : 'rgba(56, 189, 248, 0.18)',
            opacity: isHovered ? 1 : 0.5
          }}
        />

        <div>
          {/* Header Badge */}
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                  isAws
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-amber-500/20'
                    : 'bg-sky-500/15 border-sky-500/40 text-sky-400 shadow-sky-500/20'
                }`}
              >
                {isAws ? <Cloud className="w-7 h-7" /> : <Cpu className="w-7 h-7" />}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                  {cert.issuer}
                </span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {cert.code} • Certified
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified</span>
            </div>
          </div>

          {/* Certification Title */}
          <h3 className="text-2xl font-extrabold text-white font-sans tracking-tight mb-3 group-hover:text-cyan-300 transition-colors">
            {cert.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
            {cert.description}
          </p>

          {/* Skills Covered */}
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2 font-semibold">
              Verified Domains & Skills:
            </span>
            <div className="flex flex-wrap gap-2">
              {cert.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-200 border border-slate-800"
                >
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Link Button */}
        <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Issue Year: <strong className="text-white">{cert.issueDate}</strong>
          </span>

          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSound()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 glass-panel border border-cyan-500/40 hover:border-cyan-300 hover:bg-cyan-950/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:scale-105"
          >
            <span>Verify Credential</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Background radial accent */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 04. CREDENTIALS & MASTERY"
          title="Industry Certifications"
          subtitle="Official industry-recognized credentials validating enterprise cloud architecture, serverless infrastructure, and artificial intelligence engineering."
        />

        {/* 2-Column Grid for Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {CERTIFICATION_DATA.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Verified Technical Competency Banner */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Enterprise Cloud & AI Validation</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-white">
                Dual Cloud Verified: Amazon Web Services & Microsoft Azure
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Rigorous multi-domain examinations demonstrating practical competency in secure cloud networking, serverless compute (Lambda, EC2, S3), cognitive AI services, and computer vision / NLP APIs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={CERTIFICATION_DATA[0]?.credentialUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40 hover:bg-amber-500/25 transition-all"
              >
                <span>AWS Credential</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={CERTIFICATION_DATA[1]?.credentialUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playClickSound()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/40 hover:bg-sky-500/25 transition-all"
              >
                <span>Azure AI Credential</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Certifications;
