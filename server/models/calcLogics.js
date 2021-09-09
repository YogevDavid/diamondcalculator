const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calcLogicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
    unique: true,
  },
  martixMultiplier: {
    type: Number,
    default: 100,
  },
  veryGoodPer: {
    type: Number,
    default: 0.15,
  },
  exellentPer: {
    type: Number,
    default: 0.15,
  },
  // chartValues: { type: Array, default: Constants.getDefalutChart() },
  chartValues: [
    {
      color: { type: String, unique: true },
      IF: { type: Number },
      VVS1: { type: Number },
      VVS2: { type: Number },
      VS1: { type: Number },
      VS2: { type: Number },
      SI1: { type: Number },
      SI2: { type: Number },
      SI3: { type: Number },
      I1: { type: Number },
      I2: { type: Number },
      I3: { type: Number },
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = CalcLogic = mongoose.model('calcLogics', calcLogicSchema);
