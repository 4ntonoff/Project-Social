import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerificationForm } from "../components/VerificationForm";

const Registration = ({ routes }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(routes.HOME.replace("*", ""));
    }
  });

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email not valid!");
      return;
    }
    // Show verification form instead of immediately registering
    setShowVerification(true);
  };

  const handleVerificationComplete = () => {
    // Here we would normally verify the code with the backend
    // For now, we'll just proceed with registration
    localStorage.setItem("user", JSON.stringify({ name, email }));
    navigate(routes.HOME.replace("*", ""));
  };

  return (
    <>
      <div className="container-reg">
        <form onSubmit={handleSubmit} className="form-reg">
          <h2 className="logo">Social</h2>

          {error && <p className="err-reg">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-reg"
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-reg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-reg"
            required
          />
          <button type="submit" className="btn-reg">
            Register
          </button>
        </form>
      </div>
      {showVerification && (
        <VerificationForm 
          email={email}
          onVerificationComplete={handleVerificationComplete}
        />
      )}
    </>
  );
};

export default Registration;
