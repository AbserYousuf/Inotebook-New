import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Error404() {
  const [showText, setShowText] = useState(false);
  const [stopWalk, setStopWalk] = useState(false);

  useEffect(() => {
    const walkTimer = setTimeout(() => {
      setStopWalk(true); // Stop walking
    }, 3500);

    const textTimer = setTimeout(() => {
      setShowText(true); // Show 404
    }, 5000);

    return () => {
      clearTimeout(walkTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">

      {/* 🌌 Background */}
      <div className="stars"></div>
      <div className="twinkling"></div>

      {/* 👨‍🚀 Astronaut */}
      <div
        className={`absolute bottom-20 ${
          stopWalk ? "centered" : "walk"
        }`}
      >
        <div className={`${stopWalk ? "head-turn" : ""}`}>
          <Astronaut />
        </div>

        {/* 🛰️ Hologram Banner */}
        {stopWalk && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-fadeIn">
            <div className="px-4 py-2 text-sm bg-cyan-500/20 backdrop-blur-md border border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/40">
              🚨 Error 404
            </div>
          </div>
        )}
      </div>

      {/* 404 Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-1000 ${
          showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
          404
        </h1>

        <p className="mt-6 text-lg text-gray-300">
          The astronaut searched the galaxy... but this page doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 font-semibold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
        >
          Return to Earth 🌍
        </Link>
      </div>

      {/* Styles */}
      <style>
        {`
        /* WALKING */
        .walk {
          left: -200px;
          animation: walkAcross 3.5s ease forwards;
        }

        @keyframes walkAcross {
          to {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        .centered {
          left: 50%;
          transform: translateX(-50%);
        }

        /* HEAD TURN */
        .head-turn {
          animation: headTurn 1s ease forwards;
        }

        @keyframes headTurn {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(8deg); }
        }

        /* Fade In */
        .animate-fadeIn {
          animation: fadeIn 1s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Stars */
        .stars {
          width: 100%;
          height: 100%;
          background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
          position: absolute;
          top: 0;
          left: 0;
        }

        .twinkling {
          width: 100%;
          height: 100%;
          background: transparent url('https://www.transparenttextures.com/patterns/twinkle-twinkle.png') repeat;
          animation: move-twinkle 200s linear infinite;
          position: absolute;
          top: 0;
          left: 0;
        }

        @keyframes move-twinkle {
          from { background-position: 0 0; }
          to { background-position: -10000px 5000px; }
        }
        `}
      </style>
    </div>
  );
}

/* 👨‍🚀 Full Astronaut SVG */
function Astronaut() {
  return (
    <svg
      width="140"
      height="220"
      viewBox="0 0 200 300"
      fill="none"
    >
      <circle cx="100" cy="60" r="40" fill="#E5E7EB" />
      <circle cx="100" cy="60" r="25" fill="#1F2937" />
      <rect x="70" y="100" width="60" height="90" rx="20" fill="#E5E7EB" />
      <rect x="60" y="120" width="20" height="70" rx="10" fill="#D1D5DB" />
      <rect x="120" y="120" width="20" height="70" rx="10" fill="#D1D5DB" />
      <rect x="75" y="190" width="20" height="70" rx="10" fill="#9CA3AF" />
      <rect x="105" y="190" width="20" height="70" rx="10" fill="#9CA3AF" />
    </svg>
  );
}