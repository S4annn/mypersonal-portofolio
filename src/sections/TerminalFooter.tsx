import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  '[SYSTEM] Initializing core modules...',
  '[NETWORK] Connected to local host...',
  '[AUTH] User identity verified...',
  '[MODULE] Loading creative engine v2.0...',
  '[MODULE] UI/UX design systems ready...',
  '[USER] Ready for input.',
];

function TerminalTyping() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setIsVisible(true),
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-bg-dark rounded-[16px] p-6 md:p-8 h-full min-h-[400px] flex flex-col"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest ml-2">
          Developer Console
        </span>
      </div>

      {/* Terminal content */}
      <div className="flex-1 font-mono text-[13px] md:text-[14px] leading-relaxed space-y-1">
        {TERMINAL_LINES.map((line, index) => (
          <div
            key={index}
            className={isVisible ? 'typing-line' : ''}
            style={{
              color: line.startsWith('[SYSTEM]')
                ? '#4ade80'
                : line.startsWith('[NETWORK]')
                ? '#60a5fa'
                : line.startsWith('[AUTH]')
                ? '#fbbf24'
                : line.startsWith('[MODULE]')
                ? '#a78bfa'
                : '#ff3e00',
              width: isVisible ? undefined : 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
          >
            {line}
          </div>
        ))}

        {/* Blinking cursor after last line */}
        {isVisible && (
          <div
            className="flex items-center gap-2 mt-2"
            style={{
              animation: 'fadeIn 0.5s ease 12s both',
            }}
          >
            <span className="text-white/60">{'>'}</span>
            <span
              className="w-2 h-5 bg-text-accent"
              style={{
                animation: 'blink-cursor 1s step-end infinite',
              }}
            />
          </div>
        )}
      </div>

      {/* Terminal footer status */}
      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="font-mono text-[10px] text-white/30">
          bash — 80x24
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="font-mono text-[10px] text-white/40">online</span>
        </div>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-white transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-bg-base flex items-center justify-center group-hover:bg-text-accent transition-colors duration-300">
        {icon}
      </div>
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-text-secondary">
          {label}
        </div>
        <div className="text-sm text-text-primary group-hover:text-text-accent transition-colors duration-300">
          {href.replace(/^https?:\/\//, '')}
        </div>
      </div>
    </a>
  );
}

export default function TerminalFooter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
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
      className="relative bg-bg-base py-20 md:py-32"
      style={{ zIndex: 30 }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-text-primary mt-2">
            Terminal & Contact
          </h2>
        </div>

        {/* Split pane layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
          {/* Left: Terminal (70%) */}
          <div className="lg:col-span-7">
            <TerminalTyping />
          </div>

          {/* Right: Links and credits (30%) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Contact Links */}
            <div className="bg-bg-surface rounded-[16px] p-6 border border-black/5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-4">
                Connect
              </h3>
              <div className="space-y-1">
                <ContactLink
                  href="https://github.com"
                  label="GitHub"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary group-hover:text-white transition-colors">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="https://linkedin.com"
                  label="LinkedIn"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-text-secondary group-hover:text-white transition-colors">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="mailto:sandyteukupranataa15@gmail.com"
                  label="Email"
                  icon={
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary group-hover:text-white transition-colors">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Credits */}
            <div className="bg-bg-surface rounded-[16px] p-6 border border-black/5 flex-1">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-text-secondary mb-4">
                Credits
              </h3>
              <div className="space-y-3 font-mono text-[11px] text-text-secondary">
                <div>
                  <span className="text-text-primary">Design</span>
                  <span className="block text-text-secondary/70">STP.Dev Studio</span>
                </div>
                <div>
                  <span className="text-text-primary">Fonts</span>
                  <span className="block text-text-secondary/70">Inter, Newsreader, JetBrains Mono</span>
                </div>
                <div>
                  <span className="text-text-primary">Stack</span>
                  <span className="block text-text-secondary/70">React, Vite, TypeScript, Tailwind</span>
                </div>
              </div>

              {/* Status indicator */}
              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[10px] text-text-secondary">
                    All systems operational
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-16 pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[10px] text-text-secondary tracking-wide">
            STP v2.0 — Built with precision and care
          </div>
          <div className="font-mono text-[10px] text-text-secondary/60">
            &copy; {new Date().getFullYear()} STP.Dev. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
