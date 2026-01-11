// --- Action Definitions ---
const SHOW_ALERT_MESSAGE = "alerts/SHOW_ALERT_MESSAGE";
const HIDE_ALERT_MESSAGE = "alerts/HIDE_ALERT_MESSAGE";

// --- Action Creators ---

// ✅ FIX: Exported as NAMED exports
export const hideAlertMessage = () => ({
  type: HIDE_ALERT_MESSAGE,
});

// ✅ FIX: Exported as NAMED exports
export function showAlertMessage(msg, type = "info", timeout = 5000) {
  return function showAlertMessageThunk(dispatch) {
    // Dispatch to show the alert
    dispatch({
      type: SHOW_ALERT_MESSAGE,
      payload: {
        show: true,
        msg,
        type,
      },
    });

    // Set a timer to automatically dispatch the hide action
    setTimeout(() => {
      dispatch(hideAlertMessage());
    }, timeout);
  };
}

// --- Reducer Function ---

const initialState = {
  show: false,
  msg: "",
  type: "info",
};

// Exported as DEFAULT export
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
      return {
        ...state,
        show: true,
        msg: action.payload.msg,
        type: action.payload.type,
      };

    case HIDE_ALERT_MESSAGE:
      return {
        ...state,
        show: false,
        msg: "",
        type: "info",
      };

    default:
      return state;
  }
}
