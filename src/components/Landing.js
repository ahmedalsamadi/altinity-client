import React from "react";
import {Link} from "react-router-dom";
import LandingTitle from "./LandingTitle";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('../src/assets/landing.png')" }}
      ></div>
      <div className="absolute inset-0 bg-navy/70 z-10"></div>

      {/* Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-pulse font-['Zilla_Slab_Highlight']">
              Altinity
            </span>
          </h1>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border-2 border-cyan-400/30 mb-6 shadow-[0_0_30px_rgba(34,211,238,0.5)]">
            <i className="fas fa-rocket text-4xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"></i>
          </div>
        </div>

        <div className="mb-12 min-h-[80px]">
          <LandingTitle />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-110 w-full sm:w-auto"
          >
            <i className="fas fa-user-plus mr-2"></i>
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-lg glass-strong border-2 border-cyan-400/30 text-white font-bold text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-110 hover:border-cyan-400/50 w-full sm:w-auto"
          >
            <i className="fas fa-sign-in-alt mr-2"></i>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Landing;