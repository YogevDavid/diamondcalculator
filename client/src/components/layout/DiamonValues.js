import React, { Fragment } from 'react';
import { diamondValues } from '../../utils/constants';
import Spinner from './Spinner';

const DiamonValues = (props) => {
  const { values } = props;
  return values ? (
    <Fragment>
      {diamondValues.map((dValue) => (
        <Fragment key={dValue.value}>
          <i className={dValue.symbol} title={dValue.name}></i>{' '}
          {dValue.value === 'cutType'
            ? values[dValue.value][0]
            : values[dValue.value]}{' '}
        </Fragment>
      ))}
    </Fragment>
  ) : (
    <Spinner />
  );
};

export default DiamonValues;
