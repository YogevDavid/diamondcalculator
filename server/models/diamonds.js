const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diamondSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  photoId: {
    type: String,
    default: 'NO_PHOTO',
  },
  cutType: {
    type: String,
    default: 'GOOD',
  },
  carat: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: 'L',
  },
  clarity: {
    type: String,
    default: 'VS2',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Diamond = mongoose.model('diamonds', diamondSchema);
