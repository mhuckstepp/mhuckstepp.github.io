const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const TOTAL_ROWS = 18;
const SPEED_INCREMENT = 0.04;

export const RACE_DISTANCES = [
  { value: 1, label: '1 Mile' },
  { value: 2, label: '2 Mile' },
  { value: 3.10686, label: '5K' },
  { value: 5, label: '5 Mile' },
  { value: 6.21371, label: '10K' },
  { value: 10, label: '10 Miler' },
  { value: 13.1094, label: 'Half marathon' },
  { value: 20, label: '20 Mile' },
  { value: 26.2188, label: ' Marathon' },
];

export const convertPaceToSpeed = (minutes, seconds) => {
  const totalSeconds = minutes * 60 + Number(seconds);
  if (!totalSeconds) return 0;
  return (3600 / totalSeconds).toFixed(2);
};

export const convertPaceToSpeedString = (minutes, seconds) => {
  const totalSeconds = minutes * 60 + Number(seconds);
  if (!totalSeconds) return '--';
  return (3600 / totalSeconds).toFixed(2);
};

const getSpeed = (main, decimal) =>
  Number(main) + Math.min(Number(decimal) * 0.1, 1);

export const convertSpeedToPace = (main, decimal) => {
  const speed = getSpeed(main, decimal);
  if (!speed) return '--';
  const pace = 60 / speed;
  return `${Math.floor(pace)} : ${((pace % 1) * 60)
    .toFixed(0)
    .padStart(2, '0')}`;
};

export const getPaceValuesFromSpeed = (main, decimal) => {
  const speed = getSpeed(main, decimal);
  if (!speed) return '--';
  const pace = 60 / speed;
  return [Math.floor(pace), Math.round((pace % 1) * 60)];
};

export const getSpeedValuesFromPace = (minutes, seconds) => {
  const speed = convertPaceToSpeed(minutes, seconds);
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

export const handleSpeedInput = (input, updateInput) => {
  if (!input) {
    updateInput('');
    return;
  }
  const value = Number(input);
  if (value > 99 || value < 0) return;
  updateInput(input);
};

export const hoursToFormattedTime = (hours) => {
  const dateObj = new Date(hours * 60 * 60 * 1000);
  hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getSeconds();

  return (
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0')
  );
};

export const createSpeeds = (minutes = 7, seconds = 0) => {
  const speed = convertPaceToSpeed(minutes, seconds);
  const speedList = [...Array(TOTAL_ROWS)];
  const startingSpeed = speed - (TOTAL_ROWS * SPEED_INCREMENT) / 2;
  return speedList.map((_, index) => index * SPEED_INCREMENT + startingSpeed);
};
