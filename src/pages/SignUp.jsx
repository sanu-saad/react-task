import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      // localStorage.setItem("user", JSON.stringify(input));
      login(input);
      alert("Sign up successful");
      setInput("");
      navigate("/signin");
    }
  }, [error]);
  const validate = (input) => {
    const err = {};
    if (!input.name.trim()) {
      err.name = "Username is required";
    }
    if (!input.email.trim()) {
      err.email = "Email is required";
    } else if (/\S+@\S\.\S+/.test(input.email)) {
      err.email = "Email is not valid";
    }

    if (!input.password.trim()) {
      err.password = "Password is required";
    } else if (input.password.length < 6) {
      err.password = "Password should be atleast 6 character or more";
    }
    if (input.confirmPassword !== input.password) {
      err.confirmPassword = "Password not matched";
    }
    return err;
  };

  return (
    <section className="text-center mt-5">
      <div>
        <h2 className="text-xl font-bold">Sign Up -</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User name"
            name="name"
            value={input.name}
            onChange={handleChange}
            className="input mt-5"
          />
          {error.name && <span className="text-red-500">{error.name}</span>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={input.email}
            onChange={handleChange}
            className="input"
          />
          {error.email && (
            <span span className="text-red-500">
              {error.email}
            </span>
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
            className="input"
          />
          {error.password && (
            <span span className="text-red-500">
              {error.password}
            </span>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={handleChange}
            className="input"
          />
          {error.confirmPassword && (
            <span className="block text-red-500">{error.confirmPassword}</span>
          )}
          <button className="btn">Sign Up</button>
        </form>
        <small>
          Already have an account ? <Link to="/signin">sign in</Link>
        </small>
      </div>
    </section>
  );
};

export default SignUp;
