export function numberWithCommasNoDecimals(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts[0];
}

export function numberWithCommasWithDecimals(num) {
  var parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  parts[1] = parts[1].length < 2 ? parts[1] + '0' : parts[1];
  return parts.join(".");
}

// true if all activeFilters elements are contained inside chart.filters
// true if activeFilters is empty 
export function hasFilters(chart, activeFilters) {
  if (activeFilters.length === 0) return true;
  else if (chart.filters) return _.difference(activeFilters, chart.filters).length === 0;
  else return false;
}

// export function roundToMillions(num) {
//   const roundToTenThous = Math.round(10000000 * value) / 10000000;
//   const stringify = roundToTenThous.toString();
//   const roundToMil = stringify.slice(0, stringify.length - 6);
//   return roundToMil;
// }

export default {
  numberWithCommasNoDecimals,
  numberWithCommasWithDecimals,
  hasFilters
}