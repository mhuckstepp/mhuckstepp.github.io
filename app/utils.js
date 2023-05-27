const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const TOTAL_ROWS = 18;
const SPEED_INCREMENT = 0.04;

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

export const convertSpeedToPace = (main, decimal) => {
  const speed = Number(main) + Math.min(Number(decimal) * 0.01, 1);
  if (!speed) return '--';
  const pace = 60 / speed;
  return `${Math.floor(pace)} : ${((pace % 1) * 60)
    .toFixed(0)
    .padStart(2, '0')}`;
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
