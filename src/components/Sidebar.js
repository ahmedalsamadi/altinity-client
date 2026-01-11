import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentProfile } from "../redux/modules/profiles";
import { getProfileImage } from "../utiles";
import defaultImg from "../assets/default.jpg";
import { connect } from "react-redux";

function Sidebar({ users: { user }, getCurrentProfile }) {
  const [image, setImage] = useState("");
  const [errored, setErrored] = useState(false);
  const location = useLocation();

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

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/home", label: "Home", icon: "fa-home" },
    { path: "/posts", label: "Posts", icon: "fa-comments" },
    { path: "/developers", label: "Developers", icon: "fa-users" },
    { path: "/settings", label: "Settings", icon: "fa-cog" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 z-30 flex-col items-center py-6 glass-strong border-r border-white/10">
        {/* Profile Image with Floating Animation */}
        <Link to="/home" className="mb-8 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <img
              src={image}
              onError={onError}
              alt="Profile"
              className="relative w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-float transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
            />
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-6 w-full px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  : "hover:bg-white/5 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              }`}
            >
              {isActive(item.path) && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-fuchsia-500 rounded-r-full"></div>
              )}
              <i className={`fas ${item.icon} text-xl ${isActive(item.path) ? "text-cyan-400" : "text-white/70 group-hover:text-cyan-400"} transition-colors duration-300`}></i>
              <span className={`text-xs mt-1 ${isActive(item.path) ? "text-cyan-400" : "text-white/50 group-hover:text-white/80"} transition-colors duration-300 hidden xl:block`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 glass-strong border-t border-white/10">
        <nav className="flex justify-around items-center py-3 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 min-w-[60px] ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  : "hover:bg-white/5"
              }`}
            >
              <i className={`fas ${item.icon} text-lg ${isActive(item.path) ? "text-cyan-400" : "text-white/70"} transition-colors duration-300`}></i>
              <span className={`text-xs mt-1 ${isActive(item.path) ? "text-cyan-400" : "text-white/50"} transition-colors duration-300`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateToProps, { getCurrentProfile })(Sidebar);
