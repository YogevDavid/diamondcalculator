import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCalcLogic } from '../../store/actions/calcLogics';
import {
  getDiamond,
  editDiamondValues,
  deleteDiamond,
  uploadPhoto,
} from '../../store/actions/diamonds';
import {
  clarityValues,
  colorValues,
  cutValues,
  caratValues,
  estimate,
} from '../../utils/constants';
import SimilarItems from '../PopUps/SimilarItems';

import Spinner from '../layout/Spinner';

const Diamond = ({
  match,
  getCalcLogic,
  getDiamond,
  editDiamondValues,
  deleteDiamond,
  uploadPhoto,
  diamonds: { diamond },
  calcLogics: { calcLogic },
}) => {
  const [changeName, setChangeName] = useState(undefined);
  const [deleteGuard, setDeleteGuard] = useState(false);

  useEffect(() => {
    getCalcLogic();
    getDiamond(match.params.diamond_id);
  }, []);

  return diamond && calcLogic && calcLogic.chartValues ? (
    <Fragment>
      <div className="row">
        <div className="col-md-7">
          <div className="d-flex justify-content-center mt-2">
            {changeName !== undefined ? (
              <Fragment>
                <input
                  className="form-control"
                  style={{ textAlign: 'center' }}
                  defaultValue={changeName}
                  onBlur={(e) => {
                    setChangeName(undefined);
                    editDiamondValues({
                      _id: diamond._id,
                      name: e.target.value,
                    });
                  }}
                />
              </Fragment>
            ) : (
              <Fragment>
                <h3 className="ml-auto">{diamond.name}</h3>{' '}
                <small>
                  <i
                    className="far fa-edit m-2"
                    title="Change Diamond Name"
                    onClick={() => setChangeName(diamond.name)}
                  ></i>
                </small>
                {deleteGuard ? (
                  <div className="btn-group ml-auto">
                    <button
                      className="btn btn-sm btn-outline-danger p-2"
                      onClick={() => {
                        deleteDiamond(diamond._id);
                        window.history.back();
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => setDeleteGuard(false)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-danger ml-auto border-0"
                    title="Delete Diamond"
                    onClick={() => setDeleteGuard(true)}
                  >
                    <i className="far fa-minus-square "></i>
                  </button>
                )}
              </Fragment>
            )}
          </div>
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
                    className={`btn btn-sm btn${
                      diamond.carat === carat ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() =>
                      editDiamondValues({ _id: diamond._id, carat })
                    }
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
                    className={`btn btn-sm btn${
                      diamond.color === color ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() =>
                      editDiamondValues({ _id: diamond._id, color })
                    }
                  >
                    {color}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow p-3">
            <div className="d-flex justify-content-center pt-3 ">
              <h5>
                <i className="fas fa-adjust"></i> Clarity
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              {clarityValues.map((clarity) => (
                <div key={clarity}>
                  <button
                    className={`btn btn-sm btn${
                      diamond.clarity === clarity ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() =>
                      editDiamondValues({ _id: diamond._id, clarity })
                    }
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
                    className={`btn btn-sm btn${
                      diamond.cutType === cutType.value ? '' : '-outline'
                    }-dark ml-1 shadow`}
                    onClick={() =>
                      editDiamondValues({
                        _id: diamond._id,
                        cutType: cutType.value,
                      })
                    }
                  >
                    {cutType.text}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <h4>Estimated Price ${estimate(diamond, calcLogic)}</h4>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <SimilarItems formData={diamond} />
          </div>
        </div>
        <div className="col-md-5 d-flex justify-content-center align-self-center">
          <div className="btn-group-vertical">
            <img
              className="card-img-top shadow"
              src={
                diamond.photoId === 'NO_PHOTO'
                  ? '/assets/img/diamonsamplw.png'
                  : `${process.env.REACT_APP_IMAGES}${diamond.photoId}`
              }
              alt="Diamond image cap"
              style={{ maxWidth: '400px' }}
            />
            <label
              htmlFor="file-upload"
              className="btn btn-sm btn-outline-dark border-0"
            >
              <i className="fas fa-upload"></i> Change Diamond Photo
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => {
                const uploadedPhoto = new FormData();
                uploadedPhoto.append('file', e.target.files[0]);
                uploadPhoto(uploadedPhoto, diamond._id);
              }}
            />
          </div>
        </div>
      </div>
      <div className="row mb-5 mt-2"></div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Diamond.prototype = {
  getCalcLogic: PropTypes.func.isRequired,
  getDiamond: PropTypes.func.isRequired,
  editDiamondValues: PropTypes.func.isRequired,
  deleteDiamond: PropTypes.func.isRequired,
  uploadPhoto: PropTypes.func.isRequired,

  diamonds: PropTypes.object.isRequired,
  calcLogics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  diamonds: state.diamonds,
  calcLogics: state.calcLogics,
});
export default connect(mapStateToProps, {
  getCalcLogic,
  getDiamond,
  editDiamondValues,
  deleteDiamond,
  uploadPhoto,
})(Diamond);
