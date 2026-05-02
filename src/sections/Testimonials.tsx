import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Product Manager at TechCorp',
    text: 'Working with STP.Dev was an incredible experience. The attention to detail and creative approach transformed our product vision into reality. The results exceeded all expectations.',
    avatar: '👩‍💼',
    rating: 5,
  },
  {
    id: 2,
    name: 'Alex Rivera',
    role: 'CEO at StartupX',
    text: "Exceptional developer who combines technical expertise with genuine creative thinking. Our platform's performance improved by 300% and the new design drove a 40% increase in user engagement.",
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    id: 3,
    name: 'Maya Patel',
    role: 'Design Director at Studio9',
    text: "Rare to find someone who truly understands both design and engineering. The collaborative process was smooth and the final product was pixel-perfect. Can't recommend enough.",
    avatar: '👩‍🎨',
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="star-rating">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="#fbbf24"
          style={{ filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))' }}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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

  return (
    <div ref={cardRef} className="testimonial-card" style={{ opacity: 0 }}>
      <div className="testimonial-quote">"</div>
      <p className="testimonial-text">{testimonial.text}</p>
      <StarRating count={testimonial.rating} />
      <div className="testimonial-author">
        <div className="testimonial-avatar">{testimonial.avatar}</div>
        <div>
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-role font-mono">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
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
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div ref={headerRef} className="section-header" style={{ opacity: 0 }}>
          <span className="section-label font-mono">05 / Testimonials</span>
          <h2 className="section-title font-display">
            What
            <br />
            <span className="gradient-text">People Say</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
