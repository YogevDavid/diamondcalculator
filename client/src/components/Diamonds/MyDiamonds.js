import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DiamonValues from '../layout/DiamonValues';
import { getDiamonds } from '../../store/actions/diamonds';
import { getCalcLogic } from '../../store/actions/calcLogics';
import { estimate } from '../../utils/constants';

const MyDiamonds = ({
  getCalcLogic,
  getDiamonds,
  diamonds: { diamonds },
  calcLogics: { calcLogic },
}) => {
  const [searchDiamonds, setSearchDiamonds] = useState('');

  useEffect(() => {
    getCalcLogic();
    getDiamonds();
  }, []);
  return diamonds && calcLogic && calcLogic.chartValues ? (
    <Fragment>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 d-flex justify-content-center">
          <input
            className="form-control"
            placeholder="Search by Name"
            style={{ textAlign: 'center' }}
            onChange={(e) => setSearchDiamonds(e.target.value)}
          />
        </div>
      </div>
      <div className="row m-2 d-flex justify-content-center ">
        {diamonds
          .filter((flt) =>
            flt.name?.toLowerCase().includes(searchDiamonds.toLowerCase())
          )
          .map((diamond) => (
            <Fragment key={diamond._id}>
              <div className="col-md-6 d-flex justify-content-end shadow ">
                <div className="col-md-6 d-flex justify-content-start mt-1">
                  <div className="btn-group-vertical ">
                    <h5 className="card-title ml">
                      <Link to={`/diamond/${diamond._id}`}>
                        {' '}
                        {diamond.name || `${diamond.carat} Carat Diamond`}
                      </Link>
                    </h5>
                    <p className="card-text ">
                      <DiamonValues values={diamond} />
                    </p>
                    <h6>Estimated at: ${estimate(diamond, calcLogic)}</h6>
                  </div>
                </div>

                <div className="col-md-6  d-flex justify-content-start mt-1">
                  <img
                    className="card-img-top"
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                    src={
                      diamond.photoId === 'NO_PHOTO'
                        ? '/assets/img/diamonsamplw.png'
                        : `${process.env.REACT_APP_IMAGES}${diamond.photoId}`
                    }
                    alt="Diamond Image"
                  />
                </div>
              </div>
            </Fragment>
          ))}
      </div>
    </Fragment>
  ) : null;
};

MyDiamonds.prototype = {
  getDiamonds: PropTypes.func.isRequired,
  getCalcLogic: PropTypes.func.isRequired,

  diamonds: PropTypes.object.isRequired,
  calcLogics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  diamonds: state.diamonds,
  calcLogics: state.calcLogics,
});
export default connect(mapStateToProps, {
  getCalcLogic,
  getDiamonds,
})(MyDiamonds);
