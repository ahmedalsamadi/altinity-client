import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  deleteEducation,
  deleteExperience,
  getCurrentProfile,
} from "../redux/modules/profiles";
import { getProfileImage } from "../utiles";
import defaultImg from "../assets/default.jpg";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Home = ({
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
  profiles: { profile },
  users: { user },
}) => {
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    if (user) {
      setImage(getProfileImage(user._id));
    }
  }, [getCurrentProfile, user]);

  function onError() {
    if (!errored) {
      setErrored(true);
      setImage(defaultImg);
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-8 lg:pl-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {profile === null ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="glass-strong rounded-2xl p-8 text-center max-w-md">
              <i className="fas fa-user-circle text-6xl text-cyan-400 mb-4"></i>
              <p className="text-xl text-white/90 mb-6">Please Create a Profile</p>
              <Link
                to="/create-profile"
                className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:scale-105"
              >
                Create Profile
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Profile Header Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture Card with Floating Animation */}
              <div className="lg:col-span-1 flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                    <img
                      src={image}
                      className="w-64 h-64 rounded-xl object-cover border-2 border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-float"
                      alt="profile"
                      onError={onError}
                    />
                    <p className="text-2xl font-bold text-center mt-4 bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                      {profile.user.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Info Card */}
              <div className="lg:col-span-2">
                <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                  <BasicInfo profile={profile} />
                  {/* Social Links */}
                  {profile.social && Object.keys(profile.social).filter((media) => profile.social[media] !== "").length > 0 && (
                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/10">
                      {Object.keys(profile.social)
                        .filter((media) => profile.social[media] !== "")
                        .map((media) => {
                          return (
                            <a
                              key={media}
                              rel="noreferrer"
                              target="_blank"
                              href={profile.social[media]}
                              className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:text-fuchsia-400"
                            >
                              <i className={`fab fa-${media}`}></i>
                            </a>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Education and Experience Timeline Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Education Timeline */}
              <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    Education
                  </h3>
                  <Link
                    to="/add-education"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:rotate-90"
                  >
                    <i className="fas fa-plus"></i>
                  </Link>
                </div>
                <Education profile={profile} deleteEducation={deleteEducation} />
              </div>

              {/* Experience Timeline */}
              <div className="glass-strong rounded-2xl p-6 shadow-[0_0_30px_rgba(244,114,182,0.1)]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
                    Experience
                  </h3>
                  <Link
                    to="/add-experience"
                    className="w-10 h-10 rounded-full glass flex items-center justify-center text-fuchsia-400 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(244,114,182,0.5)] hover:rotate-90"
                  >
                    <i className="fas fa-plus"></i>
                  </Link>
                </div>
                <Experience
                  profile={profile}
                  deleteExperience={deleteExperience}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
  users: state.users,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteEducation,
  deleteExperience,
})(Home);
