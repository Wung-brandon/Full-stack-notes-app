import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navigate = useNavigate()

  const { logoutUser } = useContext(AuthContext)

  const token = localStorage.getItem("authTokens")
  if (token) {
    const decoded = jwtDecode(token)
    var username = decoded.username
    var user_id = decoded.user_id
    console.log(username, user_id)
  }

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-md bg-white custom-navbar fixed-top py-3">
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand text-dark">
          <h2 className="text-capitalize">{username}</h2>
        </Link>

        {/* Navbar Toggler */}
        <button
          className="navbar-toggler nav-button text-dark"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <div className="bg-dark line1"></div>
          <div className="bg-dark line2"></div>
          <div className="bg-dark line3"></div>
          <div className="bg-dark line4"></div>
        </button>

        {/* Navbar Links and Search Bar */}
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarSupportedContent"
        >
          {/* Search Bar and Button */}
          <div className="d-flex flex-column flex-md-row align-items-center mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              style={{ width: '100%', maxWidth: '400px' }}  // Adjusts the width on different screen sizes
            />
            <button className="btn btn-outline-success ms-md-2 mt-2 mt-md-0">Search</button>
          </div>

          {token === null ?
            <ul className="navbar-nav ms-auto text-uppercase me-3">
              <li className="nav-item">
                <Link to="/login" className="nav-link menu-item nav-active text-dark">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link menu-item text-dark">
                  Signup
                </Link>
              </li>
            </ul> :
            <div className="d-flex flex-column flex-md-row align-items-center ms-auto mt-3 mt-md-0">
              <Link to="/login" onClick={logoutUser} className="nav-link menu-item fs-5 me-md-4 mb-2 mb-md-0 nav-active text-dark">
                Logout
              </Link>
              <button className="btn btn-outline-primary ms-md-2" onClick={() => navigate("/create")}>Add Notes</button>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
