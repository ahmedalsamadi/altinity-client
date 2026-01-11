import React from "react";

const BasicInfo = ({ profile }) => {
  return (
    <div className="space-y-4">
      {profile.bio && (
        <div className="glass rounded-xl p-4 border-l-4 border-cyan-400/50">
          <p className="text-white/90 leading-relaxed">{profile.bio}</p>
        </div>
      )}
      <div className="glass rounded-xl p-4 border-l-4 border-cyan-400/50 flex items-center gap-3">
        <i className="fas fa-map-marker-alt text-cyan-400 text-xl"></i>
        <p className="text-white/90">
          Lives in <span className="font-semibold text-cyan-400">{profile.location}</span>
        </p>
      </div>
      <div className="glass rounded-xl p-4 border-l-4 border-fuchsia-400/50 flex items-center gap-3">
        <i className="fas fa-home text-fuchsia-400 text-xl"></i>
        <p className="text-white/90">
          From <span className="font-semibold text-fuchsia-400">{profile.country}</span>
        </p>
      </div>
      {profile.skills && profile.skills.length > 0 && (
        <div className="glass rounded-xl p-4 border-l-4 border-cyan-400/50">
          <p className="text-white/70 mb-2 text-sm font-semibold">Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 text-cyan-400 text-sm font-medium"
              >
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicInfo;
