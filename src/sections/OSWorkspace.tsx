import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wireframe cube SVG animation component
function RotatingCube() {
  return (
    <svg
      viewBox="0 0 100 100"
      style={{ width: '100%', height: '100%' }}
      className="opacity-60"
    >
      <style>{`
        @keyframes rotateCube {
          0% { transform: rotateY(0deg) rotateX(15deg); }
          100% { transform: rotateY(360deg) rotateX(15deg); }
        }
        .cube-face {
          fill: none;
          stroke: #1a1a1a;
          stroke-width: 0.8;
        }
      `}</style>
      <g style={{ transformOrigin: '50px 50px', animation: 'rotateCube 8s linear infinite' }}>
        {/* Front face */}
        <rect x="30" y="30" width="30" height="30" className="cube-face" />
        {/* Back face */}
        <rect x="40" y="20" width="30" height="30" className="cube-face" style={{ opacity: 0.3 }} />
        {/* Connecting lines */}
        <line x1="30" y1="30" x2="40" y2="20" className="cube-face" style={{ opacity: 0.4 }} />
        <line x1="60" y1="30" x2="70" y2="20" className="cube-face" style={{ opacity: 0.4 }} />
        <line x1="30" y1="60" x2="40" y2="50" className="cube-face" style={{ opacity: 0.4 }} />
        <line x1="60" y1="60" x2="70" y2="50" className="cube-face" style={{ opacity: 0.4 }} />
        {/* Back face edges (dashed feel via opacity) */}
        <rect x="40" y="20" width="30" height="30" className="cube-face" style={{ opacity: 0.25 }} />
      </g>
    </svg>
  );
}

// SVG radial chart for skills
function SkillRadialChart() {
  const circumference = 2 * Math.PI * 36;
  const skills = [
    { label: 'Frontend', value: 0.92, color: '#ff3e00' },
    { label: 'Backend', value: 0.85, color: '#1a1a1a' },
    { label: 'AI/ML', value: 0.78, color: '#6b7280' },
    { label: 'Design', value: 0.88, color: '#9ca3af' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <svg viewBox="0 0 100 100" className="w-32 h-32 mb-3">
        {skills.map((skill, i) => {
          const offset = circumference * (1 - skill.value);
          const rotation = i * 90;
          return (
            <circle
              key={skill.label}
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke={skill.color}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform={`rotate(${rotation} 50 50)`}
              style={{ opacity: 0.8 }}
            />
          );
        })}
        <text x="50" y="48" textAnchor="middle" className="font-mono" style={{ fontSize: '10px', fill: '#1a1a1a' }}>
          STACK
        </text>
        <text x="50" y="58" textAnchor="middle" className="font-mono" style={{ fontSize: '7px', fill: '#6b7280' }}>
          2025
        </text>
      </svg>
      <div className="flex gap-3 flex-wrap justify-center">
        {skills.map((s) => (
          <div key={s.label} className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="font-mono text-[10px] text-text-secondary uppercase">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Real-time clock component
function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  return (
    <span className="font-mono text-[11px] text-text-secondary tracking-wide">
      {hours}:{minutes}:{seconds}
    </span>
  );
}

// Animated stat counter
function AnimatedStat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setDisplayValue(Math.round(obj.val)),
        });
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl text-text-primary leading-none">
        {displayValue}{suffix}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mt-2">
        {label}
      </div>
    </div>
  );
}

export default function OSWorkspace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.os-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-bg-base"
      style={{ zIndex: 10 }}
    >
      {/* OS Header Bar */}
      <header className="sticky top-0 z-40 bg-bg-os-sticky/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="font-mono text-[11px] font-medium text-text-primary tracking-wide">
            STP  <span className="text-text-accent">v2.0</span>
          </div>
          <div className="flex items-center gap-6">
            {/* WiFi icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
            {/* Battery icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary">
              <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
              <line x1="23" y1="10" x2="23" y2="14" />
            </svg>
            <LiveClock />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-[1000px] mx-auto px-6 pt-16 pb-24">
        {/* Intro text */}
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-secondary mb-4">
            Welcome to the workspace
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-text-primary leading-tight max-w-2xl mx-auto">
            A minimal, robust operating system designed for creative velocity
          </h2>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-8 mb-16 max-w-lg mx-auto">
          <AnimatedStat value={50} label="Projects" suffix="+" />
          <AnimatedStat value={5} label="Years" suffix="+" />
          <AnimatedStat value={99} label="Uptime" suffix="%" />
        </div>

        {/* Three Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Card */}
          <div className="os-card bg-bg-surface rounded-[16px] p-6 border border-black/5 shadow-sm cursor-pointer group">
            <div className="flex items-center justify-between mb-6">
              <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
                01 / About
              </div>
              <div className="w-8 h-8 rounded-full bg-bg-base flex items-center justify-center group-hover:bg-text-accent transition-colors duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary group-hover:text-white transition-colors duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            <h3 className="font-display text-2xl text-text-primary mb-3">
              The Developer
            </h3>
            <p className="text-[13px] leading-relaxed text-text-secondary mb-4">
              Fullstack engineer crafting digital experiences at the intersection of design and technology. Specialized in React, Node.js, and AI integration.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Node.js', 'Python'].map((tag) => (
                <span key={tag} className="font-mono text-[10px] px-2 py-1 bg-bg-base rounded-full text-text-secondary">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Toolkit Card */}
          <div className="os-card bg-bg-surface rounded-[16px] p-6 border border-black/5 shadow-sm cursor-pointer">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-4">
              02 / Toolkit
            </div>
            <SkillRadialChart />
          </div>

          {/* Process Card */}
          <div className="os-card bg-bg-surface rounded-[16px] p-6 border border-black/5 shadow-sm cursor-pointer">
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-4">
              03 / Process
            </div>
            <div className="h-32 mb-4">
              <RotatingCube />
            </div>
            <h3 className="font-display text-xl text-text-primary mb-2">
              Iterative Design
            </h3>
            <p className="text-[13px] leading-relaxed text-text-secondary">
              From concept to deployment, every project follows a rigorous cycle of prototyping, testing, and refinement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
