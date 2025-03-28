import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, routes }) => {
  const user = localStorage.getItem("user");

  return user ? children : <Navigate to={routes.REGISTRATIONS} />;
};

export default ProtectedRoute;
