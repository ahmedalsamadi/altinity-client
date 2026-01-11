import { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = ({ users: { isAuthenticated }, logout }) => {
  const authlinks = (
    <button
      onClick={logout}
      className="relative px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:scale-105 hover:border-cyan-400/50 group overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
  
  const links = (
    <Link
      to="/login"
      className="relative px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 border border-cyan-400/30 text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:scale-105 hover:border-cyan-400/50 group overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <i className="fas fa-sign-in-alt"></i>
        <span>Login</span>
      </span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Link>
  );
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="relative text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <i className="fas fa-rocket text-cyan-400">Altinity</i>
              <span className="font-['Zilla_Slab_Highlight'] tracking-wide">Altinity</span>
            </span>
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-opacity duration-300"></div>
          </Link>

          <Fragment>{isAuthenticated ? authlinks : links}</Fragment>
        </div>
      </div>
    </nav>
  );
};
const mapStateeToProps = (state) => ({
  users: state.users,
});
export default connect(mapStateeToProps, { logout })(Navbar);
