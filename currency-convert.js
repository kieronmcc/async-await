//http://data.fixer.io/api/latest?access_key=a042e723dc5dce22c46e4ce5c74ee99a

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   // Remember axios is a library for making http requests support Promises
//   // so the return from axios.get() is a Promise
//   console.log('Waiting for fixer.io reponse')
//   return axios.get('http://data.fixer.io/api/latest?access_key=a042e723dc5dce22c46e4ce5c74ee99a').then((response) => {
//     console.log('Got fixer response');
//     const euro = 1/response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   });
// };

// const getCountries = (code) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${code}`).then((response) => {
//     return response.data.map((country) => {
//       return country.name;
//     });
//   });
// };

// const convertCurrency = (from, to, amount) => {
//   let convertedAmount;
//   return getExchangeRate(from,to).then((rate) => {
//     convertedAmount = (amount * rate).toFixed(2);
//     //console.log(convertedAmount);
//     return getCountries(to);
//   }).then((countries) => {
//     //console.log(countries);
//     return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
//   });
// }

// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });
//
// getCountries('EUR').then((countries) => {
//   console.log(countries)
// });

//console.log('doing other stuff asynchronously');



const getExchangeRate = async (from, to) => {
  // Remember axios is a library for making http requests support Promises
  // so the return from axios.get() is a Promise
  //console.log('Waiting for fixer.io reponse')

  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=a042e723dc5dce22c46e4ce5c74ee99a');
      //console.log('Got fixer response');
      const euro = 1/response.data.rates[from];
      const rate = euro * response.data.rates[to];

      // If invalid currency code is passed check calc above does return NaN
      if (isNaN(rate)) {
        console.log('NaN thrown for rate value')
        throw new Error(); // Will then be caught by catch block in this function
      }

      return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
  }
};

const getCountries = async (code) => {
  //console.log('Waiting for restcountries.eu reponse')
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${code}`);
    //console.log('Got restcountries.eu reponse')
    return response.data.map((country) => {
      return country.name;
    });
  } catch {
    throw new Error(`Unable to get countries that use ${code}`);
  }
};

const convertCurrency = async (from, to, amount) =>{
  let rate = await getExchangeRate(from,to);
  let convertedAmount = (amount * rate).toFixed(2);
  let countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend these in the following countries: ${countries.join(', ')}`;
}

convertCurrency('EUR', 'USD', 20).then ((message) => {
  console.log(message);
}).catch ((e) => {
  console.log(e.message)
});
