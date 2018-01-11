export async function fetchBitcoinData() {
  return fetch('https://gentle-mesa-19770.herokuapp.com/https://api.blockchain.info/stats')
    .then((res) => res.json())
    .catch(err => {
      console.error('Could not fetch data');
      return null;
    });
}

export async function fetchWalletData() {
  return fetch('https://gentle-mesa-19770.herokuapp.com/https://api.blockchain.info/charts/my-wallet-n-users?timespan=1weeks&format=json')
  .then(res => res.json())
  .then(data => {
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
  fetchWalletData
};