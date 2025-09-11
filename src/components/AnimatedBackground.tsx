import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create initial particles
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    window.addEventListener('resize', createParticles);

    return () => window.removeEventListener('resize', createParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.speedX,
          y: particle.y + particle.speedY,
          // Wrap around screen edges
          ...(particle.x > window.innerWidth && { x: 0 }),
          ...(particle.x < 0 && { x: window.innerWidth }),
          ...(particle.y > window.innerHeight && { y: 0 }),
          ...(particle.y < 0 && { y: window.innerHeight }),
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-animated opacity-30" />
      
      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-primary to-accent animate-pulse"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}

      {/* Floating Shopping Icons */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${(i % 3) + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div className="text-2xl opacity-20">
              {['🛒', '⭐', '📦', '🎁', '💎', '🔥', '✨', '🎯'][i]}
            </div>
          </div>
        ))}
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse animation-delay-2000" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-xl animate-pulse animation-delay-4000" />
    </div>
  );
};

export default AnimatedBackground;