import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  color: string;
  gradient: string;
  icon: string;
  link?: string;
}

const projects: Project[] = [
  {
    id: 'sonar',
    number: '01',
    title: 'SONAR',
    subtitle: 'Audio-Visual Engine',
    description:
      'Real-time audio visualization platform that transforms sound waves into immersive 3D experiences. Built with WebGL and Web Audio API for live performance environments.',
    tags: ['WebGL', 'Web Audio API', 'React', 'Three.js'],
    color: '#ff3e00',
    gradient: 'linear-gradient(135deg, #ff3e00 0%, #ff8a65 100%)',
    icon: '🎵',
    link: '#',
  },
  {
    id: 'aether',
    number: '02',
    title: 'AETHER',
    subtitle: 'Spatial Computing',
    description:
      'AR/VR interface toolkit for building spatial applications. Enables gesture-based interactions in mixed reality environments with real-time hand tracking.',
    tags: ['Unity', 'C#', 'ARKit', 'Machine Learning'],
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a78bfa 100%)',
    icon: '🌐',
    link: '#',
  },
  {
    id: 'prism',
    number: '03',
    title: 'PRISM',
    subtitle: 'Data Visualization',
    description:
      'Interactive analytics dashboard for complex datasets. Features real-time streaming, predictive modeling, and collaborative workspaces for data teams.',
    tags: ['D3.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #6ee7b7 100%)',
    icon: '📊',
    link: '#',
  },
  {
    id: 'nebula',
    number: '04',
    title: 'NEBULA',
    subtitle: 'AI Platform',
    description:
      'Full-stack AI-powered content management platform with natural language processing, automated workflows, and intelligent content recommendation engine.',
    tags: ['Next.js', 'OpenAI', 'Python', 'Redis'],
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    icon: '🤖',
    link: '#',
  },
];

// Project Card Component
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={`project-card ${isEven ? 'card-left' : 'card-right'}`}
      style={{ opacity: 0 }}
    >
      {/* Visual preview area */}
      <div className="project-visual" style={{ background: project.gradient }}>
        <div className="project-visual-inner">
          <span className="project-icon">{project.icon}</span>
          {/* Abstract pattern */}
          <svg
            className="project-pattern"
            viewBox="0 0 200 200"
            style={{ opacity: 0.15 }}
          >
            <defs>
              <pattern
                id={`dots-${project.id}`}
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill={`url(#dots-${project.id})`} />
          </svg>
          {/* Floating shapes */}
          <div
            className="project-shape shape-1"
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          />
          <div
            className="project-shape shape-2"
            style={{ background: 'rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      {/* Content area */}
      <div className="project-content">
        <div className="project-header">
          <span
            className="project-number font-mono"
            style={{ color: project.color }}
          >
            {project.number} /
          </span>
          <span className="project-subtitle font-mono">{project.subtitle}</span>
        </div>

        <h3 className="project-title font-display">{project.title}</h3>

        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag font-mono"
              style={{
                borderColor: `${project.color}30`,
                color: project.color,
                backgroundColor: `${project.color}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            className="project-link font-mono"
            style={{ color: project.color }}
          >
            View Project
            <svg
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
        )}
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
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
      id="projects-section"
      className="projects-section"
    >
      <div className="projects-container">
        {/* Section header */}
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <span className="section-label font-mono">04 / Selected Works</span>
          <h2 className="section-title font-display">
            Featured
            <br />
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A curated selection of projects that showcase my expertise in
            design, development, and creative problem-solving.
          </p>
        </div>

        {/* Project Cards */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
