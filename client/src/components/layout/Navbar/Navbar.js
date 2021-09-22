import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGripLines,
  faSignOutAlt,
  faUsers,
  faCoins,
  faNewspaper,
  faUser,
  faCheck,
  faCog,
  faPaperPlane,
  faArchive,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";

// Actions
import { logout, loadUser } from "../../../redux/actions/authActions";

// Components
import Logo from "../../../images/logo.png";

import useStyles from "./navbar-jss";

const Navbar = (props) => {
  const { isAuthenticated, user, logout, loadUser } = props;

  useEffect(() => {
    // if (localStorage.token)
    loadUser();

    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();

    // window.location.href = '/';
  };

  const userMenu = (
    <>
      {user && user.username === "admin" ? (
        <Dropdown alignRight>
          <Dropdown.Toggle variant="outline-light">
            Hey, <strong>{user && user.username}</strong> 👋
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link className="dropdown-item" to="/users">
              <FontAwesomeIcon className="icon mr-2" icon={faUsers} size="lg" />
              Manage Users
            </Link>
            <Link className="dropdown-item" to="/pending">
              <FontAwesomeIcon
                className="icon mr-2"
                icon={faPaperPlane}
                size="lg"
              />
              Pending Requests
            </Link>
            <Link className="dropdown-item" to="/meeting">
              <FontAwesomeIcon
                className="icon mr-2"
                icon={faArchive}
                size="lg"
              />
              Meetings
            </Link>
            <Link className="dropdown-item" to="/budget">
              <FontAwesomeIcon className="icon mr-2" icon={faCoins} size="lg" />
              Budget
            </Link>
            <Link className="dropdown-item" to="/settings">
              <FontAwesomeIcon className="icon mr-2" icon={faCog} size="lg" />
              Settings
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <button onClick={() => onLogout()} className="dropdown-item">
              <FontAwesomeIcon
                className="icon mr-3"
                icon={faSignOutAlt}
                size="lg"
              />
              Logout
            </button>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Dropdown alignRight>
          <Dropdown.Toggle variant="outline-light">
            Hey, <strong>{user && user.username}</strong> 👋
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Link
              to={`/u/${user ? user.username : ""}`}
              className="dropdown-item"
            >
              <FontAwesomeIcon className="icon mr-3" icon={faUser} size="lg" />
              Profile
            </Link>
            <Link to="/notification" className="dropdown-item">
              <FontAwesomeIcon
                className="icon mr-3"
                icon={faNewspaper}
                size="lg"
              />
              Notifications
            </Link>
            <Link to="/myrequests" className="dropdown-item">
              <FontAwesomeIcon className="icon mr-3" icon={faCheck} size="lg" />
              My requests
            </Link>
            <Link to="/settings" className="dropdown-item">
              <FontAwesomeIcon className="icon mr-3" icon={faCog} size="lg" />
              Settings
            </Link>
            <Dropdown.Divider></Dropdown.Divider>
            <button onClick={() => onLogout()} className="dropdown-item">
              <FontAwesomeIcon
                className="icon mr-3"
                icon={faSignOutAlt}
                size="lg"
              />
              Logout
            </button>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );

  const guestMenu = (
    <>
      <li className="nav-item">
        <Link className="nav-link button-primary my-sm-0 mr-2" to="/login">
          Sign in
        </Link>
      </li>
    </>
  );

  const [toggleStatus, setToggleStatus] = useState("closed");

  const classes = useStyles();

  const handleToggle = () => {
    toggleStatus === "closed"
      ? setToggleStatus("opened")
      : setToggleStatus("closed");
  };

  return (
    <nav className={`${classes.navbar} navbar navbar-expand-lg navbar-light `}>
      <div className="container">
        <Link className="navbar-brand" to="/offersAdmin">
          <img className="logo" src={Logo} alt="Dirlkhir" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <FontAwesomeIcon
            style={
              toggleStatus !== "closed" && {
                transformOrigin: "center",
                transform: "rotate(90deg)",
              }
            }
            icon={faGripLines}
          />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {user && user.username == "admin" ? null : (
                <Link className="nav-link" to="/request">
                  Requests
                </Link>
              )}
            </li>
            <li className="nav-item">
              {user && user.username == "admin" ? (
                <Link className="nav-link" to="/offersAdmin">
                  Offers
                </Link>
              ) : (
                <Link className="nav-link" to="/offers">
                  Offers
                </Link>
              )}
            </li>

            <li className="nav-item">
              {/* admin program and user program */}
              {user && user.username == "admin" ? (
                <Link className="nav-link" to="/programmeAdmin">
                  Programme
                </Link>
              ) : (
                <Link className="nav-link" to="/programme">
                  Programme
                </Link>
              )}
            </li>
            <li className="nav-item">
              {user && user.username == "admin" ? null : (
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              )}
            </li>
          </ul>

          {/* Check if logged in */}
          <ul className="navbar-nav">
            {isAuthenticated ? userMenu : guestMenu}
          </ul>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};

const mapSateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapSateToProps, { logout, loadUser })(Navbar);
