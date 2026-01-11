import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../redux/modules/profiles";
import { getProfileImage } from "../utiles";
import defaultImg from "../assets/default.jpg";

function Developers({ user, getProfiles, profiles: { profiles, loading } }) {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-8 lg:pl-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-white/70">Loading developers...</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent mb-2">
                Developers
              </h1>
              <p className="text-white/70">Discover and connect with talented developers</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {profiles
                .filter((profile) => profile.user._id !== user._id)
                .map((profile) => {
                  return (
                    <Link
                      to={`/profile/${profile.user._id}`}
                      key={profile.user._id}
                      className="block group"
                    >
                      <Developer profile={profile} />
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function Developer({ profile }) {
  const [errored, setErrored] = useState(false);
  const [image, setImage] = useState(getProfileImage(profile.user._id));

  function onError() {
    if (!errored) {
      setErrored(true);
      setImage(defaultImg);
    }
  }
  
  return (
    <div className="glass-strong rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] group">
      <div className="relative h-48 overflow-hidden">
        <img
          onError={onError}
          src={image}
          alt={profile.user.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white mb-1">{profile.user.name}</h3>
          {profile.status && (
            <p className="text-sm text-cyan-400 font-medium">{profile.status}</p>
          )}
        </div>
      </div>
      <div className="p-4">
        {profile.location && (
          <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
            <i className="fas fa-map-marker-alt text-cyan-400"></i>
            <span>{profile.location}</span>
          </div>
        )}
        {profile.skills && profile.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 text-cyan-400 text-xs"
              >
                {skill}
              </span>
            ))}
            {profile.skills.length > 3 && (
              <span className="px-2 py-1 rounded-full bg-white/5 text-white/50 text-xs">
                +{profile.skills.length - 3}
              </span>
            )}
          </div>
        )}
        <div className="mt-4 pt-4 border-t border-white/10">
          <span className="text-xs text-cyan-400 group-hover:text-fuchsia-400 transition-colors duration-300">
            View Profile <i className="fas fa-arrow-right ml-1"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.users.user,
  profiles: state.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Developers);
