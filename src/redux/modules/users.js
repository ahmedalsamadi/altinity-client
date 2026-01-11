import { api, setAuthToken } from "../../utiles";
import { showAlertMessage } from "./alerts";

const REGISTER_SUCCESS = "users/REGISTER_SUCCESS";
const REGISTER_FAIL = "users/REGISTER_FAIL";
const USER_LOADED = "users/REGISTER_LOADED";
const USER_ERROR = "users/REGISTER_ERROR";
const LOGIN_SUCCESS = "USERS/LOGIN_SUCCESS";
const LOGIN_FAIL = "USERS/LOGIN_FAIL";
const LOGOUT = "USERS/LOGOUT";

// ✅ Load User safely
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users");
    if (res && res.data) {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } else {
      throw new Error("No data returned from /users");
    }
  } catch (error) {
    console.error("Load user error:", error);
    dispatch({
      type: USER_ERROR,
    });
  }
};

// ✅ Register User safely
export function register(formData) {
  return async function registerThunk(dispatch) {
    try {
      const res = await api.post("/users/register", formData);

      if (res && res.data) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });

        // load user after register
        dispatch(loadUser());
      } else {
        throw new Error("No response data from /users/register");
      }
    } catch (error) {
      console.error("Register error:", error);

      // ✅ Safe access to nested error fields
      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          dispatch(showAlertMessage(err.msg, "error"));
        });
      } else {
        // handle non-array error or network error
        const message =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong during registration.";
        dispatch(showAlertMessage(message, "error"));
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
}

export function login(email, password) {
  return async function loginThunk(dispatch) {
    try {
      const res = await api.post("/users/login", { email, password });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // load user after register
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((err) => {
          dispatch(showAlertMessage(err.msg, "error"));
        });
      }
      // handle non-array error or network error

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setAuthToken(payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      setAuthToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case USER_ERROR:
    case LOGOUT:
      setAuthToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
