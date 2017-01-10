const MAX_SCORE = 1000;
const MIN_RADIUS = 25;
const DIAMETER = 12742;
const HALF_RATE = 500;

export function distance(location1, location2) {
  function degToRad(theta) {
    return theta * 0.017453292519943295;
  }
  // diameter of earth
  const c = Math.cos;
  const a = 0.5 - c(degToRad(location2[1] - location1[1])) / 2 +
          c(degToRad(location1[1])) * c(degToRad(location2[1])) *
          (1 - c(degToRad(location2[0] - location1[0]))) / 2;
  return DIAMETER * Math.asin(Math.sqrt(a));
}

export function scoreAnswer(location1, location2, hintCount) {
  if (hintCount === 0) {
    hintCount = 1;
  }
  const dist = distance(location1, location2);
  return distToAnswer(dist, hintCount);
}

export function distToAnswer(dist, hintCount) {
  if (hintCount === 0) {
    hintCount = 1;
  }
  let outputScore;
  if (dist < MIN_RADIUS) {
    outputScore = MAX_SCORE;
  } else {
    outputScore = Math.floor(MAX_SCORE / hintCount * Math.pow(2, -dist / HALF_RATE));
  }
  return outputScore;
}
