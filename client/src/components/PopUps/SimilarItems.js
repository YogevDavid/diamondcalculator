import React, { useEffect, useState, Fragment } from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import DiamonValues from '../layout/DiamonValues';
import { findSimilar } from '../../store/actions/diamonds';
import { getCalcLogic } from '../../store/actions/calcLogics';
import { estimate, diamondValues } from '../../utils/constants';
import Spinner from '../layout/Spinner';

const SimilarItems = ({
  findSimilar,
  getCalcLogic,
  diamonds: { similarDiamonds },
  calcLogics: { calcLogic },
  props,
}) => {
  const [matchBy, setMatchBy] = useState(
    diamondValues.map((dValue) => dValue.value)
  );

  const handleMatchBy = (value) => {
    if (matchBy.includes(value)) {
      return setMatchBy(matchBy.filter((flt) => flt !== value));
    }
    return setMatchBy([...matchBy, value]);
  };

  useEffect(() => {
    findSimilar({ ...props.formData, matchBy });
    getCalcLogic();
  }, [props.formData, matchBy]);

  return similarDiamonds && calcLogic && calcLogic.chartValues ? (
    <Popup
      trigger={
        <button className="btn btn-sm btn-outline-dark mt-2 shadow">
          View Similar Diamonds
        </button>
      }
      position="right center"
      modal={true}
      lockScroll={false}
    >
      <Fragment>
        <div className="row justify-content-center">
          <h5>Matching By</h5>
        </div>
        <div className="row mb-2 justify-content-center">
          {diamondValues.map((matchWith) => (
            <Fragment key={matchWith.value}>
              <button
                className={`btn btn-sm btn${
                  matchBy.includes(matchWith.value) ? '' : '-outline'
                }-dark ml-1`}
                onClick={() => handleMatchBy(matchWith.value)}
              >
                <i className={matchWith.symbol}></i> {matchWith.name}
              </button>
            </Fragment>
          ))}
        </div>
        <div className="row mb-2 justify-content-center">
          {similarDiamonds.map((diamond, index) => (
            <Fragment key={diamond._id}>
              <div className="card m-2 shadow " style={{ width: 'auto' }}>
                <div className="d-flex justify-content-center mt-1">
                  <img
                    className="card-img-top"
                    style={{ maxWidth: '90px' }}
                    src={
                      diamond.photoId === 'NO_PHOTO'
                        ? '/assets/img/diamonsamplw.png'
                        : `${process.env.REACT_APP_IMAGES}${diamond.photoId}`
                    }
                    alt="Card image cap"
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    {diamond.name || `${diamond.carat} Carat Diamond`}
                  </h5>
                  <p className="card-text">
                    <DiamonValues values={diamond} />
                  </p>

                  <h6>Estimated at: ${estimate(diamond, calcLogic)}</h6>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </Fragment>
    </Popup>
  ) : (
    <Spinner />
  );
};

SimilarItems.prototype = {
  findSimilar: PropTypes.func.isRequired,
  getCalcLogic: PropTypes.func.isRequired,

  diamonds: PropTypes.object.isRequired,
  props: PropTypes.object.isRequired,
};

const mapStateToProps = (state, props) => ({
  props,
  diamonds: state.diamonds,
  calcLogics: state.calcLogics,
});
export default connect(mapStateToProps, { findSimilar, getCalcLogic })(
  SimilarItems
);
