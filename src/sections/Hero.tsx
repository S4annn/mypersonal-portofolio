import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CrtVortex from '@/components/CrtVortex';

gsap.registerPlugin(ScrollTrigger);

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: Math.random() * 2.5 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.25 + 0.1,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: `rgba(255, 255, 255, ${p.opacity})`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 3}px rgba(255, 255, 255, ${p.opacity * 0.4})`,
          }}
        />
      ))}
    </div>
  );
}

// Typewriter effect for roles
function RoleTypewriter() {
  const roles = [
    'Fullstack Developer',
    'UI/UX Designer',
    'AI Engineer',
    'Creative Technologist',
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === role) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? role.substring(0, displayText.length - 1)
            : role.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <span
      className="font-mono-display"
      style={{
        fontSize: 'clamp(14px, 2vw, 20px)',
        color: '#ffffff',
        letterSpacing: '0.05em',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      {displayText}
      <span
        style={{
          width: '2px',
          height: '1.2em',
          backgroundColor: '#ffffff',
          animation: 'blink-cursor 1s step-end infinite',
          display: 'inline-block',
          marginLeft: '2px',
        }}
      />
    </span>
  );
}

// Scroll down indicator
function ScrollIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'fadeInUp 1s ease 3s both',
      }}
    >
      <span
        className="font-mono-display"
        style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'rgba(255, 255, 255, 0.4)',
          textTransform: 'uppercase',
        }}
      >
        Scroll to explore
      </span>
      <div
        style={{
          width: '20px',
          height: '32px',
          borderRadius: '10px',
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '6px',
        }}
      >
        <div
          style={{
            width: '3px',
            height: '8px',
            borderRadius: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            animation: 'scrollDot 2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.8 });

    tl.fromTo(
      greetingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 40, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      roleRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    tl.call(() => setShowContent(true));

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500',
          scrub: 1,
          pin: false,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero-section"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        }}
    >
      <CrtVortex />
      <FloatingParticles />

      {/* Hero content overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          padding: '0 24px',
        }}
      >
        {/* Status badge */}
        <div
          ref={greetingRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '50px',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              boxShadow: '0 0 8px #4ade80',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <span
            className="font-mono-display"
            style={{
              fontSize: '11px',
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Available for work
          </span>
        </div>

        {/* Main heading */}
        <h1
          ref={nameRef}
          className="font-display"
          style={{
            fontSize: 'clamp(40px, 8vw, 130px)',
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textAlign: 'center',
            opacity: 0,
            textShadow: '0 0 80px rgba(255, 62, 0, 0.25)',
          }}
        >
          Welcome to
          <br />
          <span
            style={{
              fontWeight: 400,
              background: 'linear-gradient(135deg, #ffffff 0%, #ff3e00 50%, #ff8a65 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Portfolio
          </span>
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            marginTop: '16px',
            textAlign: 'center',
            opacity: 0,
          }}
        >
          <p
            style={{
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              color: 'rgba(255, 255, 255, 0.5)',
              maxWidth: '500px',
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            Crafting digital experiences that blend
            <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>design, code, and innovation</span>
          </p>
        </div>

        {/* Role typewriter */}
        <div
          ref={roleRef}
          style={{
            marginTop: '24px',
            opacity: 0,
            padding: '10px 24px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <RoleTypewriter />
        </div>

        {/* CTA Button */}
        <div
          ref={ctaRef}
          style={{
            marginTop: '40px',
            opacity: 0,
            pointerEvents: 'auto',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <button
            onClick={scrollToAbout}
            style={{
              padding: '14px 36px',
              borderRadius: '50px',
              background: 'linear-gradient(135deg, #ff3e00, #ff6d33)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.05em',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 24px rgba(255, 62, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 62, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(255, 62, 0, 0.3)';
            }}
          >
            Explore My Work
          </button>

          <a
            href="#contact-section"
            className="font-mono-display"
            style={{
              fontSize: '13px',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.3s ease',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              paddingBottom: '2px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff3e00';
              e.currentTarget.style.borderColor = '#ff3e00';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Get in Touch →
          </a>
        </div>

        {/* Scroll indicator */}
        {showContent && (
          <div style={{ position: 'absolute', bottom: '40px' }}>
            <ScrollIndicator />
          </div>
        )}
      </div>
    </section>
  );
}
