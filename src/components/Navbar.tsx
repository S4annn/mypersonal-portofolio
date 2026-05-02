import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > window.innerHeight * 0.7);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['hero-section', 'about-section', 'skills-section', 'projects-section', 'contact-section'];
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id.replace('-section', ''));
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navLinks = [
    { id: 'about', label: 'About', href: '#about-section' },
    { id: 'skills', label: 'Skills', href: '#skills-section' },
    { id: 'projects', label: 'Projects', href: '#projects-section' },
    { id: 'contact', label: 'Contact', href: '#contact-section' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const textColor = scrolled ? 'var(--text-heading)' : '#ffffff';
  const secondaryColor = scrolled ? 'var(--text-body)' : 'rgba(255,255,255,0.6)';

  return (
    <nav
      ref={navRef}
      className="global-navbar"
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '56px', display: 'flex', alignItems: 'center',
        transition: 'background 0.4s ease, border-color 0.4s ease',
        background: scrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#hero-section" className="font-mono"
          onClick={(e) => handleNavClick(e, '#hero-section')}
          style={{ fontSize: '14px', fontWeight: 600, color: textColor, textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.4s ease' }}
        >
          STP<span style={{ color: '#ff3e00' }}>.</span>Dev
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* Desktop links */}
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '32px' }}>
            {navLinks.map((link) => (
              <a
                key={link.id} href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-mono"
                style={{
                  fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em',
                  color: activeSection === link.id ? '#ff3e00' : secondaryColor,
                  textDecoration: 'none', transition: 'color 0.3s ease',
                  position: 'relative', paddingBottom: '2px',
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <span style={{ position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '1.5px', background: '#ff3e00', borderRadius: '1px' }} />
                )}
              </a>
            ))}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '8px', transition: 'background 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = scrolled ? 'var(--border-light)' : 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--text-heading)' : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s ease' }}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={scrolled ? 'var(--text-heading)' : '#fff'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.4s ease' }}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={textColor} strokeWidth="2" style={{ transition: 'stroke 0.4s ease' }}>
              {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div
          className="nav-mobile-dropdown"
          style={{
            position: 'absolute', top: '56px', left: 0, right: 0,
            background: 'var(--mobile-menu-bg)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--nav-border)', padding: '16px 24px',
            display: 'flex', flexDirection: 'column', gap: '4px', animation: 'fadeInUp 0.2s ease',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.id} href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-mono"
              style={{
                fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.12em',
                color: activeSection === link.id ? '#ff3e00' : 'var(--text-body)',
                textDecoration: 'none', padding: '12px 0',
                borderBottom: '1px solid var(--border-light)', transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
