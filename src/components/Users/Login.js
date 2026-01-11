import React, { useState } from "react";
import { connect } from "react-redux";
// FIX: Replace 'Redirect' with 'Navigate' for React Router v6
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../redux/modules/users";

import landingVideo from "../../assets/landing1.mp4";

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // FIX: Use Navigate component instead of Redirect
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline>
        <source src={landingVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-navy/80 z-10"></div>

      {/* Ambient Gradients */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-30 w-full max-w-md px-4">
        <div className="glass-strong rounded-2xl p-8 shadow-[0_0_50px_rgba(34,211,238,0.3)] border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 mb-4">
              <i className="fas fa-rocket text-3xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent"></i>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              Sign In
            </h2>
            <p className="text-white/70">Welcome back to Altinity</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <i className="fas fa-envelope mr-2 text-cyan-400"></i>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <i className="fas fa-lock mr-2 text-cyan-400"></i>
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign In
            </button>

            <p className="text-center text-white/70">
              New to Altinity?{" "}
              <Link
                to="/register"
                className="text-cyan-400 hover:text-fuchsia-400 transition-colors duration-300 font-semibold"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.users.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
