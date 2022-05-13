const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest', //process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: 'KjVN556l16xasyFiG0HYDaAyatfUilmb', //process.env.GEOCODER_API_KEY,
    formatter: null
};
console.log(options);
const geocoder = NodeGeocoder(options);

module.exports = geocoder;
