import { SPEED_INCREMENT, TOTAL_ROWS } from './constants';

// This needs to be done outside the Picker because of a double rendering bug
const convertToValAndLabelPadStart = (value: number) => ({
  value,
  label: String(value).padStart(2, '0'),
});

// This needs to be done outside the Picker because of a double rendering bug
const convertToValAndLabelPadEnd = (value: number) => ({
  value,
  label: String(value).padEnd(2, '0'),
});

export const MINUTE_OPTIONS = [...Array(16).keys()]
  .slice(3)
  .map(convertToValAndLabelPadStart);
export const SECOND_OPTIONS = [...Array(12).keys()]
  .map((val) => val * 5)
  .map(convertToValAndLabelPadStart);

export const SPEED_OPTIONS = [...Array(16).keys()].map(
  convertToValAndLabelPadStart,
);
export const SPEED_DECIMAL_OPTIONS = [...Array(10).keys()].map(
  convertToValAndLabelPadEnd,
);

export const roundToClosestValidOption = (valueToRound: number) => {
  return SECOND_OPTIONS.map((option) => option.value).reduce(function (
    prev,
    curr,
  ) {
    return Math.abs(curr - valueToRound) < Math.abs(prev - valueToRound)
      ? curr
      : prev;
  });
};

export const convertPaceToSpeedInt = (minutes: number, seconds: number) => {
  const totalSeconds = minutes * 60 + Number(seconds);
  if (!totalSeconds) return 0;
  return 3600 / totalSeconds;
};

export const convertPaceToSpeedString = (minutes: number, seconds: number) => {
  const totalSeconds = minutes * 60 + Number(seconds);
  if (!totalSeconds) return '--';
  return (3600 / totalSeconds).toFixed(2);
};

const getSpeed = (main: number, decimal: number) =>
  Number(main) + Math.min(Number(decimal) * 0.1, 1);

export const convertSpeedToPace = (main: number, decimal: number) => {
  const speed = getSpeed(main, decimal);
  if (!speed) return '--';
  const pace = 60 / speed;
  console.log((pace % 1) * 60);
  if ((pace % 1) * 60 > 59.1) return `${Math.round(pace)} : 00`;
  return `${Math.floor(pace)} : ${((pace % 1) * 60)
    .toFixed(0)
    .padStart(2, '0')}`;
};

export const getPaceValuesFromSpeed = (main: number, decimal: number) => {
  const speed = getSpeed(main, decimal);
  if (!speed) return [0, 0];
  const pace = 60 / speed;
  return [Math.floor(pace), Math.round((pace % 1) * 60)];
};

export const getSpeedValuesFromPace = (minutes: number, seconds: number) => {
  const speed = convertPaceToSpeedInt(minutes, seconds);
  const multiplierForRounding = Math.pow(10, 1);
  const rounded =
    Math.round(speed * multiplierForRounding) / multiplierForRounding;
  return [Math.floor(speed), rounded % 1];
};

export const handleTimeInput = (input, updateInput) => {
  if (!input) {
    updateInput('');
    return;
  }
  const value = Number(input);
  if (value > 60 || value < 0) return;
  updateInput(Number(input));
};

export const handleSpeedInput = (
  input: string,
  updateInput: (input: string) => void,
) => {
  if (!input) {
    updateInput('');
    return;
  }
  const value = Number(input);
  if (value > 99 || value < 0) return;
  updateInput(input);
};

export const hoursToFormattedTime = (hours: number) => {
  return new Date(hours * 60 * 60 * 1000).toISOString().slice(11, 19);
};

export const createSpeeds = (minutes = 7, seconds = 0) => {
  const speed = convertPaceToSpeedInt(minutes, seconds);
  const speedList = [...Array(TOTAL_ROWS)];
  const startingSpeed = speed + (TOTAL_ROWS * SPEED_INCREMENT) / 2;
  return speedList.map((_, index) => startingSpeed - index * SPEED_INCREMENT);
};

export const convertToSeconds = (hours = '0', minutes = '0', seconds = '0') =>
  parseInt(hours, 10) * 3600 +
  parseInt(minutes, 10) * 60 +
  parseInt(seconds, 10);

export const predictTime = (
  time1: number,
  distance1: number,
  distance2: number,
) => {
  if (!time1 || !distance1 || !distance2) return 0;
  return time1 * (distance2 / distance1) ** 1.06;
};

export const formatSeconds = (timeInSeconds: number) => {
  return new Date(timeInSeconds * 1000).toISOString().slice(11, 19);
};
