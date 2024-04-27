import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { ImCancelCircle } from "react-icons/im";
import { useAuth } from "../context/AuthContext";
const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <header className="bg-green-300 sticky top-0 z-[20] mx-auto w-full p-6 flex item-center flex-wrap justify-between">
      <div className="">
        <Link to="/">
          <img src="../../assets/Logo.png" alt="logo" />
        </Link>
      </div>
      <ul className="hidden md:flex gap-6">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <span className="font-bold ">
                Welcome -{user.name.toUpperCase()}
              </span>
            </li>
            <li>
              <button
                className="bg-red-600 rounded text-white p-0.5"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/signin">
              <button className="bg-green-600 rounded text-white p-0.5">
                Signin
              </button>
            </Link>
          </li>
        )}
      </ul>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ImCancelCircle /> : <CiMenuFries />}
        </button>
      </div>
      {isOpen && (
        <ul className="md:hidden sm:flex basis-full flex-col items-center gap-3">
          <li onClick={() => setIsOpen(!isOpen)}>
            <NavLink to="/">Home</NavLink>
          </li>
          <li onClick={() => setIsOpen(!isOpen)}>
            <NavLink to="/products">Products</NavLink>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <span className="font-bold ">welcome -{user.name}</span>
              </li>
              <li>
                <button
                  className="bg-red-600 rounded text-white p-0.5"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signin">
                <button className="bg-green-600 rounded text-white p-0.5">
                  Signin
                </button>
              </Link>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Header;
