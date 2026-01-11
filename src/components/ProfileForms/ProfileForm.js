import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";

const initialState = {
  company: "",
  website: "",
  location: "",
  country: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
  github: "",
};

const ProfileForm = ({
  profiles: { profile, loading },
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const navigate = useNavigate(); // Use navigate hook instead of history prop

  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
    }
    if (profile && !loading) {
      const profileData = { ...initialState };
      // Populate form with existing profile data
      for (const key in profile) {
        if (key in profileData) {
          profileData[key] = profile[key];
        }
      }
      // Handle skills array conversion to comma-separated string
      if (Array.isArray(profile.skills)) {
        profileData.skills = profile.skills.join(", ");
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    country,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
    github,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, navigate, profile ? true : false);
  };

  const onFileChange = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    uploadProfileImage(data);
  };

  return (
    <div className="main" style={{ width: 600, textAlign: "center" }}>
      <p className="form-title">Edit Profile</p>
      <form className="form1" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>*Select Professional Status*</option>
            <option value="Developer">Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <input type="file" onChange={onFileChange} />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Skills (comma separated, e.g., HTML, CSS, JavaScript)"
            name="skills"
            value={skills}
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <textarea
            placeholder="Short bio"
            name="bio"
            value={bio}
            onChange={onChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            {displaySocialInputs ? "Hide" : "Add"} Social Networks
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-github fa-2x"></i>
              <input
                type="text"
                placeholder="GitHub URL"
                name="github"
                value={github}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary" value="Submit" />
        <Link to="/home" className="btn btn-light">
          Go Back
        </Link>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadProfileImage: PropTypes.func.isRequired,
  profiles: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profiles: state.profiles,
});

export default connect(mapStateToProps, {
  createProfile,
  getCurrentProfile,
  uploadProfileImage,
})(ProfileForm);
