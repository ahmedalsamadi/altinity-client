import React from "react";

const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-transparent border-r-fuchsia-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <p className="text-white/70 text-lg">Loading...</p>
      </div>
    </div>
  );
};
export default Spinner;
