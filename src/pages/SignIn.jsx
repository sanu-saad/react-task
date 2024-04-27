import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const SignIn = () => {
  const { verifyLogin } = useAuth();
  const navigate = useNavigate("");
  const [input, setInput] = useState({
    name: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validate(input));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      const success = verifyLogin(input.name, input.password);
      if (success) {
        alert("Login Successful");
        setInput("");
        navigate("/products");
      } else {
        alert("Invalid email or password.");
      }
    }
  }, [error]);

  const validate = (input) => {
    const err = {};
    if (!input.name.trim()) {
      err.name = "Username is required";
    }
    if (!input.password.trim()) {
      err.password = "Password is required";
    }
    return err;
  };

  return (
    <section className="text-center mt-5">
      <div>
        <h2 className="text-xl font-bold mb-5">Sign In -</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User name"
            name="name"
            value={input.name}
            onChange={handleChange}
            className="input"
          />
          {error.name && <span className="text-red-500">{error.name}</span>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
            className="input"
          />
          {error.password && (
            <span className="block text-red-500">{error.password}</span>
          )}
          <button className="btn">Sign In</button>
        </form>
        <small>
          Don't have an account ? <Link to="/signup">sign up</Link>
        </small>
      </div>
    </section>
  );
};

export default SignIn;
