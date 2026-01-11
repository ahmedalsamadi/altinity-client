import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteAccount } from "../redux/modules/profiles";

function Settings({ deleteAccount }) {
  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-8 lg:pl-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
            Settings
          </h1>
          <p className="text-white/70">Manage your account settings</p>
        </div>

        <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)] border border-white/10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 flex items-center justify-center border border-cyan-400/30">
              <i className="fas fa-user-edit text-cyan-400 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white/90">Update Your Profile</h3>
              <p className="text-sm text-white/60">Edit your profile information</p>
            </div>
          </div>
          <Link
            to="/edit-profile"
            className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105"
          >
            <i className="fas fa-edit mr-2"></i>
            Edit Account
          </Link>
        </div>

        <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(244,114,182,0.1)] border border-red-400/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-400/20 to-red-500/20 flex items-center justify-center border border-red-400/30">
              <i className="fas fa-exclamation-triangle text-red-400 text-xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white/90">Danger Zone</h3>
              <p className="text-sm text-white/60">This will completely delete and remove your account with all data</p>
            </div>
          </div>
          <button
            onClick={() => deleteAccount()}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] hover:scale-105"
          >
            <i className="fas fa-trash mr-2"></i>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}
export default connect(null, { deleteAccount })(Settings);
