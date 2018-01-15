export function numberWithCommas(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function roundToMillions(num) {
  const roundToTenThous = Math.round(10000000 * value) / 10000000;
  const stringify = roundToTenThous.toString();
  const roundToMil = stringify.slice(0, stringify.length - 6);
  return roundToMil;
}

export function roundToTwoSigFigs(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export default {
  numberWithCommas
}