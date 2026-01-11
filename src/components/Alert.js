import React, { useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify"; // ✅ NEW: Import toast API

const Alert = ({ alert }) => {
  // We no longer use useAlert()

  useEffect(() => {
    // Run whenever the Redux state says an alert should be shown
    if (alert.show) {
      // CRITICAL FIX: Clear all previous toasts to handle rapid validation errors correctly.
      // This is essential when multiple errors are dispatched quickly (like validation errors).
      toast.dismiss();

      // Use the type from Redux state to call the right toast function
      switch (alert.type) {
        case "error":
          toast.error(alert.msg);
          break;
        case "success":
          toast.success(alert.msg);
          break;
        case "info":
        default:
          toast.info(alert.msg);
          break;
      }
    }
  }, [alert]);
  // Dependencies: 'alert' state object. The effect runs whenever the alert status changes.

  // This component renders nothing itself; it just triggers the external toast display.
  return <></>;
};

// Map the 'alerts' slice of the Redux state to component props
const mapStateToProps = (state) => {
  return {
    // Assuming your root reducer named this slice 'alerts'
    alert: state.alerts,
  };
};

// Connect the component to Redux
export default connect(mapStateToProps)(Alert);
