import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../../../store/actions/auth';

const Header = ({ logout, isAuthenticated }) => {
  return (
    <header id="header">
      <div className="row border-bottom">
        <h1>
          <Link to="/" className="plain">
            <i className="fas fa-gem mr-2"></i>
            Diamond Calculator
          </Link>
        </h1>

        {isAuthenticated ? (
          <Fragment>
            <Link
              to="/calclogic"
              className="btn btn-sm btn-outline-dark ml-auto mr-1 p-3 shadow"
            >
              <i className="fas fa-cogs"></i> Settings
            </Link>
            <Link
              to="/mydiamonds"
              className="btn btn-sm btn-outline-dark mr-1 p-3 shadow"
            >
              <i className="fas fa-boxes"></i> My Diamonds
            </Link>
            <button
              onClick={() => logout()}
              className="btn btn-sm btn-outline-dark p-3 shadow"
            >
              Logout
            </button>
          </Fragment>
        ) : (
          <Link
            to="/"
            className="btn btn-sm btn-outline-dark ml-auto p-3 shadow"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Header);
