import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, routes }) => {
  const user = localStorage.getItem("user");

  // Redirect to registration if user not found
  return user ? children : <Navigate to={routes.REGISTRATION} replace />;
};

export default ProtectedRoute;
