export const diamondValues = [
  { value: 'carat', name: 'Carat', symbol: 'far fa-gem' },
  { value: 'color', name: 'Color', symbol: 'fas fa-tint' },
  { value: 'clarity', name: 'Clarity', symbol: 'fas fa-adjust' },
  { value: 'cutType', name: 'Cut Quality', symbol: 'fas fa-gem' },
];

export const clarityValues = [
  'IF',
  'VVS1',
  'VVS2',
  'VS1',
  'VS2',
  'SI1',
  'SI2',
  'SI3',
  'I1',
  'I2',
  'I3',
];
export const chartColumns = [
  'color',
  'IF',
  'VVS1',
  'VVS2',
  'VS1',
  'VS2',
  'SI1',
  'SI2',
  'SI3',
  'I1',
  'I2',
  'I3',
];

export const colorValues = ['D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

export const cutValues = [
  { value: 'GOOD', text: 'Good' },
  { value: 'VERY_GOOD', text: 'Very Good' },
  { value: 'EXCELLENT', text: 'Excellent' },
];

export const caratValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const estimate = (formData, calcLogic) => {
  const color_clarity = calcLogic.chartValues.filter(
    (flt) => flt.color === formData.color
  )[0][formData.clarity];

  let estimation = color_clarity * calcLogic.martixMultiplier * formData.carat;
  formData.cutType === 'VERY_GOOD'
    ? (estimation = estimation * (1 + calcLogic.veryGoodPer))
    : null;
  formData.cutType === 'EXCELLENT'
    ? (estimation =
        estimation * (1 + calcLogic.exellentPer) * (1 + calcLogic.exellentPer))
    : null;

  return Math.round(estimation);
};
