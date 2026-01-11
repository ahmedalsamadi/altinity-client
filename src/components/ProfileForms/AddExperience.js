import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../redux/modules/profiles";

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
  });

  const { company, title, location, from, to, current } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-8 lg:pl-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="glass-strong rounded-2xl p-8 shadow-[0_0_50px_rgba(244,114,182,0.3)] border border-white/10">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-fuchsia-400/20 to-cyan-400/20 border border-fuchsia-400/30 mb-4">
              <i className="fas fa-briefcase text-3xl text-fuchsia-400"></i>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
              Add Experience
            </h2>
            <p className="text-white/70 text-sm">* = required field</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <i className="fas fa-user-tie mr-2 text-fuchsia-400"></i>
                Job Title *
              </label>
              <input
                type="text"
                placeholder="Job Title"
                name="title"
                value={title}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <i className="fas fa-building mr-2 text-fuchsia-400"></i>
                Company *
              </label>
              <input
                type="text"
                placeholder="Company name"
                name="company"
                value={company}
                onChange={onChange}
                required
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                <i className="fas fa-map-marker-alt mr-2 text-cyan-400"></i>
                Location
              </label>
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={location}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <i className="fas fa-calendar-alt mr-2 text-fuchsia-400"></i>
                  From Date
                </label>
                <input
                  type="date"
                  name="from"
                  value={from}
                  onChange={onChange}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white focus:outline-none focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/20 transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  <i className="fas fa-calendar-check mr-2 text-cyan-400"></i>
                  To Date
                </label>
                <input
                  type="date"
                  name="to"
                  value={to}
                  onChange={onChange}
                  disabled={current}
                  className="w-full px-4 py-3 rounded-xl glass border border-white/10 text-white focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="current"
                checked={current}
                onChange={() => setFormData({ ...formData, current: !current })}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-fuchsia-400 focus:ring-fuchsia-400/50 focus:ring-2"
              />
              <label className="text-white/80">Current Job</label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,114,182,0.6)] hover:scale-105"
              >
                <i className="fas fa-save mr-2"></i>
                Submit
              </button>
              <Link
                to="/home"
                className="flex-1 px-6 py-3 rounded-lg glass-strong border border-white/10 text-white font-semibold text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(244,114,182,0.3)] hover:scale-105"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Go Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
