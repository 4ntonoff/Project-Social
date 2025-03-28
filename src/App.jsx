import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./assets/screens/Registration";
import Home from "./assets/screens/Home";
import ProtectedRoute from "./assets/screens/ProtectedRoute";

const ROUTES = {
  REGISTRATION: "/",
  HOME: "/ho/*",
};

function App() {
  return (
    <>
      <Router basename="/Project-Social">
        <Routes>
          <Route
            path={ROUTES.REGISTRATION}
            element={<Registration routes={ROUTES} />}
          />
          <Route
            path={ROUTES.HOME}
            element={
              <ProtectedRoute routes={ROUTES}>
                <Home routes={ROUTES} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
