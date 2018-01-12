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
  return fetch(proxy + 'https://api.blockchain.info/charts/' + propName + queryText)
  .then(res => res.json())
  .then(data => {
    // defaults with the last dataValue
    const last = data.values[data.values.length-1].y;
    return last;
  })
  .catch(err => {
    console.error('Could not fetch wallet data');
    return null;
  });
}

export default {
  fetchBitcoinData,
  fetchChartData
};