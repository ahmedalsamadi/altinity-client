import React from "react";
import { formatDate } from "../../utiles";

const Experience = ({ profile, deleteExperience }) => {
  if (!profile.experience || profile.experience.length === 0) {
    return (
      <div className="text-center py-8 text-white/50">
        <i className="fas fa-briefcase text-4xl mb-2"></i>
        <p>No experience entries yet</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-fuchsia-400/50 via-fuchsia-400/30 to-transparent"></div>
      
      <div className="space-y-6">
        {profile.experience.map((e, index) => (
          <div key={e._id} className="relative pl-12 group">
            {/* Timeline Dot */}
            <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-gradient-to-r from-fuchsia-400 to-cyan-400 shadow-[0_0_15px_rgba(244,114,182,0.6)] z-10"></div>
            
            {/* Content Card */}
            <div className="glass rounded-xl p-4 border-l-4 border-fuchsia-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(244,114,182,0.3)] relative">
              {deleteExperience !== undefined && (
                <button
                  onClick={() => deleteExperience(e._id)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full glass flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                >
                  <i className="fas fa-trash text-sm"></i>
                </button>
              )}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-fuchsia-400/20 to-cyan-400/20 flex items-center justify-center border border-fuchsia-400/30">
                  <i className="fas fa-briefcase text-fuchsia-400"></i>
                </div>
                <div className="flex-1">
                  <p className="text-white/90 font-semibold mb-1">
                    {e.current ? "Works" : "Worked"} as <span className="text-fuchsia-400">{e.title}</span> at{" "}
                    <span className="text-cyan-400">{e.company}</span>
                  </p>
                  {e.location && (
                    <p className="text-white/70 text-sm mb-2">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      <span>{e.location}</span>
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <i className="fas fa-calendar-alt"></i>
                    <span>
                      {formatDate(e.from)} - {e.current ? "Current" : formatDate(e.to)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
