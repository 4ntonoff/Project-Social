import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/home");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Ввсе поля обязательны!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Неверный формат email");
      return;
    }
    localStorage.setItem("user", JSON.stringify({ name, email }));
    navigate("/home");
  };

  return (
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
  );
};

export default Registration;
