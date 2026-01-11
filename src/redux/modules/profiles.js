import { showAlertMessage } from "./alerts";
import { api } from "../../utiles";

export const GET_PROFILE = "profile/GET_PROFILE";
export const GET_PROFILES = "profile/GET_PROFILES";
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE";
export const PROFILE_ERROR = "profile/PROFILE_ERROR";
export const UPLOAD_PROFILE_IMAGE = "profile/UPDATE_PROFILE_IMAGE";
export const CLEAR_PROFILE = "profile/CLEAR_PROFILE";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/profiles/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

// Create or update profile
// Changed 'history' parameter to 'navigate' for React Router v6
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const res = await api.post("/profiles", formData);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(
        showAlertMessage(
          edit ? "Profile Updated" : "Profile Created",
          "success"
        )
      );
      if (!edit) {
        // Use navigate instead of history.push
        navigate("/home");
      }
    } catch (err) {
      const errors = err.response?.data?.errors;

      if (errors) {
        errors.forEach((error) =>
          dispatch(showAlertMessage(error.msg, "error"))
        );
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText || "Server Error",
          status: err.response?.status || 500,
        },
      });
    }
  };

export const uploadProfileImage = (data) => async (dispatch) => {
  try {
    const res = await api.post("/profiles/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({
      type: UPLOAD_PROFILE_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await api.get("/profiles");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/profiles/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/experience", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience Added", "success"));
    navigate("/home");
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api.put("/profiles/education", formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Education Added", "success"));
    navigate("/home");
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Experience removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await api.delete(`/profiles/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(showAlertMessage("Education removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/profiles");
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch(showAlertMessage("Account removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText || "Server Error",
          status: err.response?.status || 500,
        },
      });
    }
  }
};

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  image: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case UPLOAD_PROFILE_IMAGE:
      return {
        ...state,
        image: payload,
      };
    default:
      return state;
  }
}
