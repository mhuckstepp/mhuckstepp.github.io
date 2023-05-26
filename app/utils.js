const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

const TOTAL_ROWS = 50;

export const convertPaceToSpeed = (minutes, seconds) => {
    const totalSeconds = (minutes * 60) + Number(seconds)
    console.log({totalSeconds, minutes, seconds})
    if (!totalSeconds) return "--"
    return (3600 / totalSeconds).toFixed(2) 
}

export const convertSpeedToPace = (main, decimal) => {
    let speed = Number(main) + Math.min(Number(decimal) * .01, 1)
    if (!speed) return "--"
    const pace = 60 / speed
    return `${Math.floor(pace)} : ${((pace % 1) * 60).toFixed(0).padStart(2, "0")}`
}

export const handleInput = (input, updateInput) => {
    console.log({input})
    if (!input) {
        updateInput("")
        return
        }
    const value = Number(input)
    if (value > 60 || value < 0) return
    updateInput(input)
}

export const handleSpeedInput = (input, updateInput) => {
    console.log({input})
    if (!input) {
        updateInput("")
        return
        }
    const value = Number(input)
    if (value > 99 || value < 0) return
    updateInput(input)
}

export const hoursToFormattedTime = (hours) => {
    dateObj = new Date(hours * 60 * 60 * 1000);
hours = dateObj.getUTCHours();
minutes = dateObj.getUTCMinutes();
seconds = dateObj.getSeconds();

return hours.toString().padStart(2, '0') + ':' + 
    minutes.toString().padStart(2, '0') + ':' + 
    seconds.toString().padStart(2, '0');
}

export const createSpeeds = (speed) => {
    if (!speed || isNaN(speed) ) return []
  const speedList = [...Array(TOTAL_ROWS)]
  const startingSpeed = speed - 1
  return speedList.map((_, index) => index * (2 / TOTAL_ROWS) + startingSpeed);
}
