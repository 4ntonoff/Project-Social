import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./assets/screens/Registration";
import Home from "./assets/screens/Home";
import ProtectedRoute from "./assets/screens/ProtectedRoute";

function App() {
  return (
    <>
      <Router basename="/Project-Social">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
