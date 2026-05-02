import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animated counter
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
    <div ref={ref} className="stat-card">
      <div className="stat-value font-display">
        {displayValue}{suffix}
      </div>
      <div className="stat-label font-mono">
        {label}
      </div>
    </div>
  );
}

// Tech stack icon
function TechBadge({ name, icon }: { name: string; icon: string }) {
  return (
    <div className="tech-badge group">
      <span className="tech-icon">{icon}</span>
      <span className="tech-name font-mono">{name}</span>
    </div>
  );
}

// Timeline item
function TimelineItem({
  year,
  title,
  company,
  description,
  isLast = false,
}: {
  year: string;
  title: string;
  company: string;
  description: string;
  isLast?: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        itemRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={itemRef} className="timeline-item" style={{ opacity: 0 }}>
      <div className="timeline-dot-container">
        <div className="timeline-dot" />
        {!isLast && <div className="timeline-line" />}
      </div>
      <div className="timeline-content">
        <span className="timeline-year font-mono">{year}</span>
        <h4 className="timeline-title">{title}</h4>
        <span className="timeline-company font-mono">{company}</span>
        <p className="timeline-description">{description}</p>
      </div>
    </div>
  );
}

export default function AboutMe() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headingRef.current || !bioRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        bioRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bioRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const techStack = [
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Next.js', icon: '▲' },
    { name: 'Figma', icon: '🎨' },
    { name: 'TailwindCSS', icon: '🌊' },
    { name: 'PostgreSQL', icon: '🐘' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'TensorFlow', icon: '🧠' },
    { name: 'Git', icon: '📂' },
  ];

  const timeline = [
    {
      year: '2024 — Present',
      title: 'Junior Fullstack Developer',
      company: 'Creative Agency',
      description: 'Leading development of cutting-edge web applications with modern React ecosystem and AI integration.',
    },
    {
      year: '2022 — 2024',
      title: 'Frontend Engineer',
      company: 'Tech Startup',
      description: 'Built and scaled interactive web platforms serving millions of users with real-time data visualization.',
    },
    {
      year: '2020 — 2022',
      title: 'UI/UX Designer & Developer',
      company: 'Freelance',
      description: 'Designed and developed custom digital experiences for brands across multiple industries.',
    },
    {
      year: '2018 — 2020',
      title: 'Junior Developer',
      company: 'Digital Studio',
      description: 'Started professional journey building responsive websites and learning modern development practices.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="about-section"
    >
      <div className="about-container" style={{ paddingTop: '120px' }}>
        {/* Section header */}
        <div ref={headingRef} className="section-header" style={{ opacity: 0 }}>
          <span className="section-label font-mono">01 / About Me</span>
          <h2 className="section-title font-display">
            Building digital experiences
            <br />
            <span className="gradient-text">that matter</span>
          </h2>
        </div>

        {/* Bio and Stats Row */}
        <div className="about-grid">
          {/* Bio side */}
          <div ref={bioRef} className="bio-card" style={{ opacity: 0 }}>
            <div className="bio-avatar">
              <div className="avatar-ring" style={{ width: '100px', height: '100px' }}>
                <div className="avatar-placeholder" style={{ overflow: 'hidden' }}>
                  <img 
                    src="/sandy.png" 
                    alt="Sandy Teuku Pranata" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="avatar-status">
                <div className="status-dot" />
                <span className="font-mono" style={{ fontSize: '10px', color: '#4ade80' }}>Online</span>
              </div>
            </div>
            <div className="bio-content">
              <h3 className="bio-name font-display">Sandy Teuku Pranata</h3>
              <p className="bio-tagline font-mono">
                Creative Developer & Designer
              </p>
              <p className="bio-text">
                I'm a passionate fullstack developer with 2+ years of experience creating
                immersive digital experiences. I specialize in building modern web applications
                that combine beautiful design with powerful functionality. My approach blends
                creative thinking with technical precision.
              </p>
              <p className="bio-text" style={{ marginTop: '12px' }}>
                When I'm not coding, you'll find me exploring new AI technologies,
                contributing to open-source projects, or experimenting with creative
                coding and generative art.
              </p>
            </div>
          </div>

          {/* Stats side */}
          <div className="stats-grid">
            <AnimatedStat value={50} label="Projects Completed" suffix="+" />
            <AnimatedStat value={2} label="Years Experience" suffix="+" />
            <AnimatedStat value={30} label="Happy Clients" suffix="+" />
            <AnimatedStat value={99} label="Success Rate" suffix="%" />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="tech-section" id="skills-section">
          <h3 className="subsection-title font-display">
            <span className="section-label font-mono" style={{ display: 'block', marginBottom: '8px' }}>02 / Tech Stack</span>
            Technologies I work with
          </h3>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="timeline-section">
          <h3 className="subsection-title font-display">
            <span className="section-label font-mono" style={{ display: 'block', marginBottom: '8px' }}>03 / Experience</span>
            My Journey
          </h3>
          <div className="timeline-container">
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                title={item.title}
                company={item.company}
                description={item.description}
                isLast={index === timeline.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
