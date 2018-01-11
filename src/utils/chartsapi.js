async function fetchBitcoinData() {
  const data = await fetch('https://api.blockchain.info/stats')
    .then(resp => resp.json())
    .catch(err => {
      console.error('Could not fetch data');
      return null;
    });
  return data;
}

export default {
  fetchBitcoinData
};