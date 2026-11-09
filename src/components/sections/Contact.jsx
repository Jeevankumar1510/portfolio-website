import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Copy, Check, MessageSquare, User, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import SectionHeading from '../common/SectionHeading';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playClickSound, playSuccessSound } from '../../utils/soundEffects';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please specify a subject';
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message';
    } else if (formData.message.length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playSuccessSound();

      // Confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#38bdf8', '#a855f7', '#ffffff']
      });

      // Prepare mailto link trigger
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`
      )}`;
      
      // Auto open email client
      window.open(mailtoLink, '_blank');

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 8000);
    }, 1200);
  };

  const copyToClipboard = (text, type) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedField(type);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden scroll-mt-24">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          tag="// 05. GET IN TOUCH"
          title="Contact & Collaboration"
          subtitle="Looking for an enthusiastic Python, AI/ML or Cloud developer? Let's discuss job opportunities, innovative projects, or collaborative engineering."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Information Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct Email Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      Direct Email
                    </span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 font-mono transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Direct Phone Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-cyan-300 font-mono transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                  className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
                  title="Copy phone"
                  aria-label="Copy phone"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Location Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                    Current Location
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-white font-mono">
                    {PERSONAL_INFO.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect Banner */}
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                Social Profiles
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Connect directly through professional networks or explore my active code repositories.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-200 glass-panel border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-all hover:scale-105"
                >
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-200 glass-panel border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 transition-all hover:scale-105"
                >
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Animated Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel-glow p-6 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
              
              {/* Form Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  Send a Message
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  // Responses are typically sent within 24 hours
                </p>
              </div>

              {/* Success Notification */}
              {isSubmitted && (
                <div className="p-4 mb-6 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center gap-3 animate-fade-in shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block font-bold">Transmission Successful!</strong>
                    <span>Your message has been initiated. Opening mail composer...</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                            : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        }`}
                      />
                      <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.name && (
                      <p className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                            : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        }`}
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <p className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Job Opportunity / Collaboration / Project Inquiry"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.subject
                        ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                        : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 font-semibold">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Jeevan, I came across your portfolio and would like to discuss..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-900/80 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-400 focus:ring-1 focus:ring-rose-400'
                          : 'border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                      }`}
                    />
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                  {errors.message && (
                    <p className="text-rose-400 text-xs font-mono mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-400 hover:brightness-110 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Signal...</span>
                    </div>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

