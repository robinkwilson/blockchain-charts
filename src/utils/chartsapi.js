const proxy = 'https://gentle-mesa-19770.herokuapp.com/';

export async function fetchBitcoinData() {
  return fetch(proxy + 'https://api.blockchain.info/stats')
    .then((res) => res.json())
    .catch(err => {
      console.error('Could not fetch stats data');
      return null;
    });
}

export async function fetchChartData(propName, queryText) {
  const appendText = queryText ? queryText : '';
  return fetch(proxy + 'https://api.blockchain.info/charts/' + propName + appendText)
  .then(res => res.json())
  .catch(err => {
    console.error('Could not fetch chart data');
    return null;
  });
}

export default {
  fetchBitcoinData,
  fetchChartData
};