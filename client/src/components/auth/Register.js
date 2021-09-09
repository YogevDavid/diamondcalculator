import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../store/actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register, auth: { isAuthenticated, errors } }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-md-6 mt-3">
          <div className="container p-2">
            <p className="lead">
              <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  className="form-control-plaintext"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control-plaintext"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>

              <div className="form-group">
                <input
                  className="form-control-plaintext"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control-plaintext"
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <input
                type="submit"
                className="btn btn-outline-success"
                value="Register"
              />
            </form>
            <p className="my-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
