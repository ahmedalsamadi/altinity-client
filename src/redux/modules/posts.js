import { showAlertMessage } from "./alerts";
import { api } from "../../utiles";

export const GET_POSTS = "profile/GET_POSTS";
export const GET_POST = "profile/GET_POST";
export const POST_ERROR = "profile/POST_ERROR";
export const UPDATE_LIKES = "profile/UPDATE_LIKES";
export const DELETE_POST = "profile/DELETE_POST";
export const ADD_POST = "profile/ADD_POST";
export const ADD_COMMENT = "profile/ADD_COMMENT";
export const DELETE_COMMENT = "profile/DELETE_COMMENT";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

//add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
//remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(showAlertMessage("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

//add post
export const addPost = (formDataOrText) => async (dispatch) => {
  try {
    let res;
    
    // Check if formDataOrText is FormData (for image upload) or plain object (text only)
    if (formDataOrText instanceof FormData) {
      // For FormData, we need to send without JSON headers
      const token = localStorage.getItem("token");
      const serverUrl = "http://localhost:4000";
      res = await fetch(`${serverUrl}/api/posts`, {
        method: "POST",
        headers: {
          "x-auth-token": token || "",
        },
        body: formDataOrText,
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw { response: { data: errorData, status: res.status, statusText: res.statusText } };
      }
      
      res = { data: await res.json() };
    } else {
      // For plain object, use regular API call
      res = await api.post("/posts", formDataOrText);
    }
    
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(showAlertMessage("Post Created", "success"));
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
//get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(showAlertMessage("Comment Added", "success"));
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};
//delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: { postId, commentId },
    });
    dispatch(showAlertMessage("Comment Removed", "success"));
  } catch (err) {
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(showAlertMessage(error.msg, "error")));
    }
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response?.statusText || "Server Error",
        status: err.response?.status || 500,
      },
    });
  }
};

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload.commentId
          ),
        },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
