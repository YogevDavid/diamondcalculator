import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DiamonValues from './DiamonValues';
import { logout, loadUser } from '../../store/actions/auth';
import { getCalcLogic } from '../../store/actions/calcLogics';
import { addDiamond, clearNewDiamond } from '../../store/actions/diamonds';
import {
  diamondValues,
  clarityValues,
  colorValues,
  cutValues,
  caratValues,
  estimate,
} from '../../utils/constants';

import Spinner from './Spinner';
import SimilarItems from '../PopUps/SimilarItems';

const initialState = {
  color: 'L',
  carat: 1,
  cutType: 'GOOD',
  clarity: 'VS2',
};

function Index({
  getCalcLogic,
  addDiamond,
  clearNewDiamond,
  auth: { isAuthenticated },
  calcLogics: { calcLogic },
  user,
  diamonds: { newDiamond },
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    loadUser();
    getCalcLogic();
  }, []);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return user && calcLogic && calcLogic.chartValues ? (
    <Fragment>
      <div className="row justify-content-center mt-2 mb-5">
        <div className="card-body text-center">
          <div className="shadow p-3">
            <div className="d-flex justify-content-center pt-3">
              <h5>
                <i className="far fa-gem"></i> Carat
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              {caratValues.map((carat) => (
                <div key={carat}>
                  <button
                    className={`btn btn${
                      formData.carat === carat ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() => setFormData({ ...formData, carat })}
                  >
                    {carat}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="shadow p-3">
            <div className="d-flex justify-content-center pt-3">
              <h5>
                <i className="fas fa-tint"></i> Color
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              {colorValues.map((color) => (
                <div key={color}>
                  <button
                    className={`btn btn${
                      formData.color === color ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() => setFormData({ ...formData, color })}
                  >
                    {color}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow p-3">
            <div className="d-flex justify-content-center pt-3">
              <h5>
                <i className="fas fa-adjust"></i> Clarity
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              {clarityValues.map((clarity) => (
                <div key={clarity}>
                  <button
                    className={`btn btn-sm btn${
                      formData.clarity === clarity ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() => setFormData({ ...formData, clarity })}
                  >
                    <small> {clarity}</small>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow p-3">
            <div className="d-flex justify-content-center pt-3">
              <h5>
                <i className="fas fa-gem"></i> Cut Quality
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              {cutValues.map((cutType) => (
                <div key={cutType.value}>
                  <button
                    className={`btn btn${
                      formData.cutType === cutType.value ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() =>
                      setFormData({ ...formData, cutType: cutType.value })
                    }
                  >
                    {cutType.text}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="btn-group-vertical mb-auto">
          <div className="card border-0" style={{ width: '18rem' }}>
            <img
              className="card-img-top"
              src="/assets/img/diamonsamplw.png"
              alt="Diamond image cap"
              style={{ height: '250px' }}
            />
            <div className="card-body">
              <h5 className="card-title">{formData.carat} Carat Diamond</h5>
              <p className="card-text">
                <DiamonValues values={formData} />
              </p>
              <h6>
                Estimated Price: <b> ${estimate(formData, calcLogic)} </b>
              </h6>
              {newDiamond ? (
                <Fragment>
                  <Link
                    to={`/diamond/${newDiamond._id}`}
                    className="btn btn-sm btn-outline-success mt-2 shadow"
                  >
                    Edit Your Diamond
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-primary mt-2 shadow"
                    onClick={() => clearNewDiamond()}
                  >
                    Create A new Diamond
                  </button>
                </Fragment>
              ) : (
                <button
                  className="btn btn-sm btn-outline-primary mt-2 shadow"
                  onClick={() => addDiamond(formData)}
                >
                  Save to My Collection
                </button>
              )}

              <SimilarItems formData={formData} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
}

Index.prototype = {
  logout: PropTypes.func.isRequired,
  getCalcLogic: PropTypes.func.isRequired,
  addDiamond: PropTypes.func.isRequired,
  clearNewDiamond: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  diamonds: PropTypes.object.isRequired,
  calcLogics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  diamonds: state.diamonds,
  calcLogics: state.calcLogics,
});
export default connect(mapStateToProps, {
  logout,
  getCalcLogic,
  addDiamond,
  clearNewDiamond,
})(Index);
