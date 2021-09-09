import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCalcLogic,
  editCalcLogicValues,
} from '../../store/actions/calcLogics';
import { chartColumns } from '../../utils/constants';
import Spinner from '../layout/Spinner';

const CalcLogic = ({
  getCalcLogic,
  editCalcLogicValues,
  calcLogics: { calcLogic },
}) => {
  const [changeChartValue, setChangeChartValue] = useState(undefined);

  const [chartValues, setChartValues] = useState(undefined);

  const handleChartChange = (id, clarityValue, values, value) => {
    let row = values.filter((flt) => flt._id === id)[0];
    row[clarityValue] = parseInt(value) || 0;
    const newValues = values.map((val) => (val._id === id ? row : val));
    setChartValues(newValues);
  };

  useEffect(() => {
    getCalcLogic();
  }, []);

  return calcLogic && calcLogic.chartValues ? (
    <Fragment>
      <div className="row d-flex justify-content-center ">
        <h3>Calculator's logic and Variables</h3>
      </div>
      <div className="row d-flex justify-content-center mt-2 mb-3">
        <div className="col-md-3">
          <h6>Very Good %</h6>
          <input
            className="form-control shadow"
            type="number"
            defaultValue={calcLogic.veryGoodPer * 100 || 0}
            style={{ textAlign: 'center' }}
            onChange={(e) =>
              editCalcLogicValues({
                _id: calcLogic._id,
                veryGoodPer: e.target.value / 100,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <h6>Excellent %</h6>
          <input
            className="form-control shadow"
            type="number"
            defaultValue={calcLogic.exellentPer * 100 || 0}
            style={{ textAlign: 'center' }}
            onChange={(e) =>
              editCalcLogicValues({
                _id: calcLogic._id,
                exellentPer: e.target.value / 100,
              })
            }
          />
        </div>
        <div className="col-md-3">
          <h6>Chart Multiplier</h6>
          <input
            className="form-control shadow"
            type="number"
            defaultValue={calcLogic.martixMultiplier || 0}
            style={{ textAlign: 'center' }}
            onChange={(e) =>
              editCalcLogicValues({
                _id: calcLogic._id,
                martixMultiplier: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-5">
        <h4>Color over Clarity Chart</h4>
      </div>
      {calcLogic.chartValues ? (
        <div className="row d-flex justify-content-center">
          <table className="table">
            <thead>
              <tr>
                {chartColumns.map((claValue) =>
                  claValue === 'color' ? (
                    <th key={claValue} scope="col" key={claValue}>
                      <i className="fas fa-tint ml-2" title="Color"></i>
                    </th>
                  ) : (
                    <th key={claValue} scope="col" key={claValue}>
                      {claValue}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {calcLogic.chartValues.map((charValue) => (
                <tr key={charValue._id}>
                  {chartColumns.map((value, index) =>
                    value ? (
                      <Fragment key={`value${index}`}>
                        <td>
                          {changeChartValue === `${charValue._id}${index}` ? (
                            <input
                              className="form-control"
                              defaultValue={charValue[value]}
                              onChange={(e) =>
                                handleChartChange(
                                  charValue._id,
                                  value,
                                  calcLogic.chartValues,
                                  e.target.value
                                )
                              }
                              onBlur={() => {
                                setChangeChartValue(undefined);
                                editCalcLogicValues({
                                  _id: calcLogic._id,
                                  chartValues,
                                });
                              }}
                            />
                          ) : (
                            <button
                              className="btn btn-outline-dark border-0"
                              title="Click to change value"
                              onClick={() =>
                                index > 0
                                  ? setChangeChartValue(
                                      `${charValue._id}${index}`
                                    )
                                  : null
                              }
                            >
                              {charValue[value]}
                            </button>
                          )}
                        </td>
                      </Fragment>
                    ) : null
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </Fragment>
  ) : (
    <Spinner />
  );
};

CalcLogic.prototype = {
  getCalcLogic: PropTypes.func.isRequired,
  editCalcLogicValues: PropTypes.func.isRequired,
  calcLogics: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  calcLogics: state.calcLogics,
});
export default connect(mapStateToProps, {
  getCalcLogic,
  editCalcLogicValues,
})(CalcLogic);
