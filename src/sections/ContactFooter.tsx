import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TERMINAL_LINES = [
  { text: '[SYSTEM] Portfolio loaded successfully...', color: '#4ade80' },
  { text: '[NETWORK] All services connected...', color: '#60a5fa' },
  { text: '[AUTH] Guest session verified...', color: '#fbbf24' },
  { text: '[MODULE] Contact form initialized...', color: '#a78bfa' },
  { text: '[READY] Awaiting your message...', color: '#ff3e00' },
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
    <div ref={containerRef} className="terminal-window">
      {/* Terminal header */}
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
        </div>
        <span className="terminal-title font-mono">contact@stp-dev.com</span>
        <div style={{ width: '52px' }} />
      </div>

      {/* Terminal content */}
      <div className="terminal-content font-mono">
        {TERMINAL_LINES.map((line, index) => (
          <div
            key={index}
            className={isVisible ? 'typing-line' : ''}
            style={{
              color: line.color,
              width: isVisible ? undefined : 0,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              animationPlayState: isVisible ? 'running' : 'paused',
            }}
          >
            {line.text}
          </div>
        ))}

        {isVisible && (
          <div className="cursor-line" style={{ animation: 'fadeIn 0.5s ease 10s both' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{'>'}</span>
            <span className="terminal-cursor" />
          </div>
        )}
      </div>

      {/* Terminal footer */}
      <div className="terminal-footer">
        <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>
          bash — 80×24
        </span>
        <div className="terminal-status">
          <div className="status-indicator" />
          <span className="font-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>
            online
          </span>
        </div>
      </div>
    </div>
  );
}

function ContactLink({
  href,
  label,
  sublabel,
  icon,
}: {
  href: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-link group"
    >
      <div className="contact-icon-wrapper">{icon}</div>
      <div>
        <div className="contact-label">{label}</div>
        <div className="contact-sublabel font-mono">{sublabel}</div>
      </div>
      <svg
        className="contact-arrow"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M7 17L17 7M17 7H7M17 7V17" />
      </svg>
    </a>
  );
}

export default function ContactFooter() {
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
    <section ref={sectionRef} id="contact-section" className="contact-section">
      <div className="contact-container">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label font-mono">06 / Get in Touch</span>
          <h2 className="section-title font-display">
            Let's Build
            <br />
            <span className="gradient-text">Something Great</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </div>

        {/* Content grid */}
        <div className="contact-grid">
          {/* Terminal */}
          <div className="contact-terminal-col">
            <TerminalTyping />
          </div>

          {/* Contact links */}
          <div className="contact-links-col">
            <div className="contact-card">
              <h3 className="contact-card-title font-mono">Connect With Me</h3>
              <div className="contact-links-list">
                <ContactLink
                  href="https://github.com/S4annn"
                  label="GitHub"
                  sublabel="@S4annn"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="https://www.linkedin.com/in/sandyteukupranata/"
                  label="LinkedIn"
                  sublabel="Sandy Teuku Pranata"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="https://x.com/sndyytp_"
                  label="Twitter / X"
                  sublabel="@sndyytp"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  }
                />
                <ContactLink
                  href="mailto:sandyteukupranataa15@gmail.com"
                  label="Email"
                  sublabel="sandyteukupranataa15@gmail.com"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  }
                />
              </div>
            </div>

            {/* Quick info */}
            <div className="location-card">
              <div className="location-dot" />
              <div>
                <div className="location-label font-mono">Based in</div>
                <div className="location-value">Indonesia 🇮🇩</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo font-mono">
              STP<span style={{ color: '#ff3e00' }}>_</span>Dev
            </span>
            <span className="footer-version font-mono">v2.0</span>
          </div>
          <div className="footer-credits font-mono">
            Built with React, TypeScript & GSAP
          </div>
          <div className="footer-copyright font-mono">
            &copy; {new Date().getFullYear()} STP.Dev. All rights reserved.
          </div>
        </div>
      </footer>
    </section>
  );
}
