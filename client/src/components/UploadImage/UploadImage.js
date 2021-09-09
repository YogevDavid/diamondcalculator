import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadPhoto } from '../../store/actions/diamonds';

const UploadImage = ({ diamonds }) => {
  const [imageFile, setImageFile] = useState(undefined);
  return (
    <Fragment>
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
          setImageFile(e.target.files[0]);
        }}
      />
      {imageFile ? <img src={imageFile} /> : null}
    </Fragment>
  );
};

UploadImage.propTypes = {
  diamonds: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  diamonds: state.diamonds,
});

export default connect(mapStateToProps, {})(UploadImage);
