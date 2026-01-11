import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import { Fragment } from "react/jsx-runtime";
import Navbar from "./components/Navbar";
import store from "./redux/store";
import { Provider } from "react-redux";
import Register from "./components/Users/Register";

import Home from "./components/Home";
import Private from "./components/Private";
// NOTE: Removed all imports related to 'react-alert' and 'react-alert-template-basic'

// ✅ NEW TOAST IMPORTS:
import Alert from "./components/Alert";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Users/Login";
import ProfileForm from "./components/ProfileForms/ProfileForm";
import AddEducation from "./components/ProfileForms/AddEducation";
import AddExperience from "./components/ProfileForms/AddExperience";
import { useEffect } from "react";
import { setAuthToken } from "./utiles";
import { loadUser } from "./redux/modules/users";
import Developers from "./components/Developers";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post";

// Removed the options object as we use props on ToastContainer instead.

function App() {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Alert /> {/* Redux-connected Alert component */}
          {/* ✅ RENDER THE TOAST CONTAINER HERE */}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/home" element={<Private component={Home} />} />
            <Route
              exact
              path="/create-profile"
              element={<Private component={ProfileForm} />}
            />
            <Route
              exact
              path="/add-education"
              element={<Private component={AddEducation} />}
            />
            <Route
              exact
              path="/add-experience"
              element={<Private component={AddExperience} />}
            />
            <Route
              exact
              path="/developers"
              element={<Private component={Developers} />}
            />
            <Route
              exact
              path="/profile/:id"
              element={<Private component={Profile} />}
            />
            <Route
              exact
              path="/settings"
              element={<Private component={Settings} />}
            />
            <Route
              exact
              path="/edit-profile"
              element={<Private component={ProfileForm} />}
            />
            <Route
              exact
              path="/posts"
              element={<Private component={Posts} />}
            />
            <Route
              exact
              path="/posts/:id"
              element={<Private component={Post} />}
            />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
