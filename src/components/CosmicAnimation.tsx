import React, { useState, useEffect } from "react";

interface AnimationPhase {
  phase: "photos" | "zoom-out" | "galaxy" | "message" | "fade-out";
}

const CosmicAnimation: React.FC = () => {
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>({
    phase: "photos",
  });

  // Souvenir/memory photos from Pexels
  const souvenirPhotos = [
    "/assets/20230830_163157.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/20231002_143633.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/20231101_160158.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/20231220_211036.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/ABP_7319.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/Screenshot_20230904_152611_WhatsApp.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/Screenshot_20230904_152813_WhatsApp.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/Snapchat-598637206.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    "/assets/Snapchat-1199494045.jpg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % souvenirPhotos.length);
  };

  useEffect(() => {
    const timeline = [
      // Start zoom out immediately after 2 seconds
      {
        delay: 900,
        action: () => setAnimationPhase({ phase: "zoom-out" }),
      },
      // Galaxy formation (6 seconds)
      {
        delay: 4000,
        action: () => setAnimationPhase({ phase: "galaxy" }),
      },
      // Message appears (10 seconds)
      {
        delay: 10000,
        action: () => setAnimationPhase({ phase: "message" }),
      },
      // Fade to black (16 seconds)
      {
        delay: 5000000,
        action: () => setAnimationPhase({ phase: "fade-out" }),
      },
    ];

    const timeouts = timeline.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Generate distant stars with noise effect
  const generateDistantStars = () => {
    return Array.from({ length: 500 }, (_, i) => {
      const size = Math.random() * 1.5 + 0.3;
      const opacity = Math.random() * 0.6 + 0.1;
      const twinkleSpeed = 1 + Math.random() * 3;

      return (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            opacity,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${twinkleSpeed}s`,
            filter: `blur(${Math.random() * 0.5}px)`,
          }}
        />
      );
    });
  };

  // Generate noise particles for mystery effect
  const generateNoiseParticles = () => {
    return Array.from({ length: 100 }, (_, i) => (
      <div
        key={`noise-${i}`}
        className="absolute bg-gray-400 rounded-full opacity-10 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 0.5}px`,
          height: `${Math.random() * 2 + 0.5}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      />
    ));
  };

  const getSouvenirPositions = () => {
    // Positions adaptées pour un bon rendu mobile (centrées, aérées)
    return [
      { x: 50, y: 20 }, // Haut centre
      { x: 30, y: 30 }, // Haut gauche
      { x: 70, y: 30 }, // Haut droit
      { x: 20, y: 50 }, // Milieu gauche
      { x: 80, y: 50 }, // Milieu droit
      { x: 35, y: 70 }, // Bas gauche
      { x: 65, y: 70 }, // Bas droit
      { x: 50, y: 60 }, // Bas centre
      { x: 50, y: 40 }, // Centre exact
    ];
  };

  const getGalaxyPositions = () => {
    // Spiral galaxy formation positions (tighter spiral)
    const centerX = 50;
    const centerY = 50;
    return souvenirPhotos.map((_, i) => {
      const angle = (i / souvenirPhotos.length) * Math.PI * 3; // More spiral turns
      const radius = 8 + i * 2; // Smaller radius
      return {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      };
    });
  };

  const souvenirPositions = getSouvenirPositions();
  const galaxyPositions = getGalaxyPositions();

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <audio autoPlay loop src="/assets/amour.mp3" />
      {/* Deep space background with mystery */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(25, 25, 60, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 60%, rgba(60, 25, 80, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 30%, rgba(25, 60, 100, 0.2) 0%, transparent 70%),
            linear-gradient(45deg, rgba(10, 10, 20, 0.8) 0%, rgba(5, 5, 15, 0.9) 100%),
            #000000
          `,
        }}
      >
        {/* Distant stars */}
        {generateDistantStars()}
        {/* Noise particles for mystery */}
        {generateNoiseParticles()}
      </div>
      {/* Galaxy PNG background (smaller and more subtle) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-90">
        <img
          src="/assets/galaxy.png"
          alt="Galaxy"
          className="  object-contain animate-pulse"
        />
      </div>
      {/* Souvenir photos with fluid zoom-out */}
      {(animationPhase.phase === "photos" ||
        animationPhase.phase === "zoom-out" ||
        animationPhase.phase === "galaxy") && (
        <div className="absolute inset-0">
          {souvenirPhotos.map((photo, index) => {
            const isZoomOut = animationPhase.phase === "zoom-out";
            const isGalaxy = animationPhase.phase === "galaxy";

            const initialPos = souvenirPositions[index];
            const finalPos = galaxyPositions[index];

            let transform = "";
            let opacity = 1;
            let size = "150px";

            if (isGalaxy) {
              // Final position as tiny luminous points
              transform = `translate(${(finalPos.x - initialPos.x) * 0.8}vw, ${
                (finalPos.y - initialPos.y) * 0.8
              }vh) scale(0.05)`;
              opacity = 0;
              size = "150px";
            } else if (isZoomOut) {
              // Continuous fluid zoom out
              transform = `translate(${(finalPos.x - initialPos.x) * 0.3}vw, ${
                (finalPos.y - initialPos.y) * 0.3
              }vh) scale(0.4)`;
              opacity = 0.8;
            }

            return (
              <div
                key={index}
                className="absolute transition-all ease-out "
                style={{
                  left: `${initialPos.x}vw`,
                  top: `${initialPos.y}vh`,
                  transform,
                  opacity,
                  transitionDuration: isZoomOut ? "4s" : isGalaxy ? "2s" : "0s",
                }}
              >
                <div
                  className="rounded-lg overflow-hidden shadow-2xl"
                  style={{
                    width: size,
                    height: size,
                  }}
                >
                  <img
                    src={photo}
                    alt={`Souvenir ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {/* Luminous points (when photos become tiny lights) */}
      {animationPhase.phase === "galaxy" && (
        <div className="absolute inset-0">
          {galaxyPositions.map((pos, index) => (
            <div
              key={`light-${index}`}
              className="absolute animate-pulse opacity-0"
              style={{
                left: `${pos.x}vw`,
                top: `${pos.y}vh`,
                transform: "translate(-50%, -50%)",
                animation:
                  "fadeInLight 1s ease-in 0.5s forwards, pulse 2s infinite 1.5s",
              }}
            >
              <div
                className="bg-blue-200 rounded-full"
                style={{
                  width: "2px",
                  height: "2px",
                  boxShadow:
                    "0 0 20px rgba(147, 197, 253, 1), 0 0 40px rgba(147, 197, 253, 0.6), 0 0 60px rgba(147, 197, 253, 0.3)",
                }}
              />
            </div>
          ))}
        </div>
      )}
      {/* Message phase */}
      {animationPhase.phase === "message" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pt-8 sm:pt-12 space-y-6">
          {/* 🎞️ Background GIF flou */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="/assets/love-background.gif"
              alt="Romantic Background"
              className="w-full h-full object-cover opacity-60 blur-md scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </div>

          {/* 💬 Texte émotionnel */}
          <div className="text-center space-y-5 max-w-[90%] sm:max-w-[600px]">
            <p
              className="text-base sm:text-xl md:text-2xl text-pink-200 font-light leading-relaxed opacity-0 animate-fade-in-delayed"
              style={{
                textShadow:
                  "0 0 20px rgba(255, 192, 203, 0.7), 0 0 40px rgba(255, 182, 193, 0.4)",
                animationDelay: "1s",
                animationFillMode: "forwards",
              }}
            >
              Purce, malgré tout, tu resteras une étoile dans mon ciel.
              <br />
              Je sais que tu as merdé...{" "}
              <span className="font-semibold text-white">
                mais je ne regretterai jamais de t’avoir aimé.
              </span>
            </p>

            <p
              className="text-sm sm:text-lg md:text-xl text-white font-light leading-relaxed opacity-0 animate-fade-in-delayed"
              style={{
                textShadow:
                  "0 0 25px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 182, 193, 0.3)",
                animationDelay: "3s",
                animationFillMode: "forwards",
              }}
            >
              Même les étoiles s’éteignent... mais nos souvenirs, eux, brillent
              encore.
              <br />
              <span className="italic text-pink-300">
                Je ne veux pas te perdre, mais je ne veux pas non plus te forcer
                à m'aimer.
              </span>
            </p>
          </div>

          {/* 📸 Slider romantique */}
          <div className="relative w-[260px] h-[320px] sm:w-[320px] sm:h-[380px] md:w-[400px] md:h-[460px] mt-6">
            {souvenirPhotos.map((photo, index) => {
              const offset = index - currentSlide;
              if (Math.abs(offset) > 2) return null;

              const scale = offset === 0 ? 1 : 0.9;
              const translateX = offset * 40;
              const translateY = offset === 0 ? "0px" : "16px";
              const blur = offset === 0 ? "blur-0" : "blur-[2px]";
              const zIndex = offset === 0 ? 30 : 20 - Math.abs(offset);
              const border =
                offset === 0
                  ? "3px solid rgba(255,182,193,0.8)"
                  : "1px solid rgba(255,255,255,0.08)";

              return (
                <img
                  key={index}
                  src={photo}
                  alt={`Memory ${index + 1}`}
                  className={`absolute top-0 left-1/2 transform 
                  -translate-x-1/2 rounded-xl object-cover 
                  transition-all duration-700 ease-in-out shadow-xl ${blur}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    scale,
                    zIndex,
                    transform: `translateX(${translateX}px) translateY(${translateY}) scale(${scale})`,
                    border,
                    cursor: offset === 0 ? "pointer" : "default",
                    boxShadow:
                      offset === 0
                        ? "0 0 50px rgba(255,182,193,0.6)"
                        : "0 0 12px rgba(255,255,255,0.1)",
                  }}
                  onClick={() => {
                    if (offset !== 0) {
                      setCurrentSlide(index);
                    } else {
                      handleNextSlide();
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
      {/* Fade out phase */}/
    </div>
  );
};

export default CosmicAnimation;
