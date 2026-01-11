import React, { useState, useEffect } from "react";

const TITLES = [
  "Welcome to Altinity",
  "The community that connect the devlopers ",
  "Where developers connect and grow together",
  "From Altınbaş University to the world 🌍",
  "Smile you are Engineer",
  "ENJOY the journey 🚀"
  ];

const LandingTitle = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const titleInterval = setInterval(() => {
      setFadeIn(true);
      setTimeout(() => setFadeIn(false), 2000);

      // move to next title safely
      setTitleIndex(prevIndex => (prevIndex + 1) % TITLES.length);
    }, 4000);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <p
      className={`text-2xl md:text-4xl font-semibold text-white/90 transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      {TITLES[titleIndex]}
    </p>
  );
};

export default LandingTitle;
