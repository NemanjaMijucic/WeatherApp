export function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function convertToCelsius(temperature) {
  return Math.round(+temperature - 273);
}
