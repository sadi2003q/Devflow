import React from "react";

export const FloatingParticles: React.FC = () => {
    const particles = [
        { left: '10%', top: '20%', duration: '3.5s', delay: '0.5s', color: 'bg-emerald-400/40' },
        { left: '30%', top: '50%', duration: '4s', delay: '1s', color: 'bg-lime-400/40' },
        { left: '60%', top: '10%', duration: '3.2s', delay: '0.8s', color: 'bg-yellow-400/40' },
        { left: '80%', top: '70%', duration: '4.1s', delay: '1.2s', color: 'bg-emerald-400/40' },
        { left: '50%', top: '40%', duration: '3.8s', delay: '0.3s', color: 'bg-lime-400/40' },
        { left: '20%', top: '80%', duration: '4.5s', delay: '0.7s', color: 'bg-orange-400/40' },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                    <div
                        key={i}
                className={`absolute w-2 h-2 rounded-full ${p.color}`}
    style={{
        left: p.left,
            top: p.top,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
    }}
></div>
))}
    <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
);
};