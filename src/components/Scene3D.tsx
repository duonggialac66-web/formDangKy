"use client";

export default function Scene3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Animated 3D Sphere using pure CSS */}
      <div className="relative w-64 h-64">
        {/* Main sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 animate-pulse shadow-2xl shadow-purple-500/50"
          style={{
            animation: 'float 6s ease-in-out infinite, rotate3d 10s linear infinite'
          }}
        />

        {/* Orbiting rings */}
        <div className="absolute inset-0 rounded-full border-2 border-purple-400/30"
          style={{
            animation: 'rotate3d 8s linear infinite',
            transform: 'rotateX(60deg) rotateY(0deg)'
          }}
        />
        <div className="absolute inset-0 rounded-full border-2 border-pink-400/30"
          style={{
            animation: 'rotate3d 12s linear infinite reverse',
            transform: 'rotateX(30deg) rotateY(45deg)'
          }}
        />

        {/* Glowing core */}
        <div className="absolute inset-1/4 rounded-full bg-white/20 backdrop-blur-sm"
          style={{
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-purple-300/50"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes rotate3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }
      `}</style>
    </div>
  );
}
