#!/usr/bin/env node

'use strict';

///////////////////////  npm install request (for "GET") ///////////////////////
////// ran "chmod +x 11.js" from TERMINAL to allow execution capabilities //////
///////////////////// EXECUTE with "./11.js (stock symbol)" /////////////////////

const { get } = require('request')                                        // request library to get API

const [, , symbol] = process.argv                                         // argument passed in TERMINAL 
// const [,,...symbol] = process.argv                                     // returns symbol as an object not a string


// API call, symbol passed in
get(`http://dev.markitondemand.com/MODApis/Api/v2/InteractiveChart/json?parameters=%7B%22Normalized%22%3Afalse%2C%22NumberOfDays%22%3A365%2C%22DataPeriod%22%3A%22Day%22%2C%22Elements%22%3A%5B%7B%22Symbol%22%3A%22${symbol}%22%2C%22Type%22%3A%22price%22%2C%22Params%22%3A%5B%22c%22%5D%7D%5D%7D`, (error, res, body) => {
    
  if (!error && res.statusCode == 200) {
    let stockInfo = JSON.parse(body)                                      // parses data received from api
    let currencyUsed = stockInfo.Elements[0].Currency                     // takes parsed JSON data and pulls currency type from object
    
    let highDate = stockInfo.Elements[0].DataSeries.close.maxDate.split("T")[0].split("-").reverse().join("-")
    let highPrice = stockInfo.Elements[0].DataSeries.close.max

    let lowDate = (stockInfo.Elements[0].DataSeries.close.minDate.split("T")[0]).split("-").reverse().join("-")
    let lowPrice = stockInfo.Elements[0].DataSeries.close.min

    let valuesArray = stockInfo.Elements[0].DataSeries.close.values       // assigns array from the closing values in JSON to variable

    let sum = valuesArray.reduce((prev, curr) => prev + curr)             // reduce adds array values together...
    let avg = (sum / valuesArray.length).toFixed(2)                       // ...to be averaged out here
    process.stdout.write(`Average price for (${symbol.toUpperCase()}): $${avg} ${currencyUsed}\n`)

    process.stdout.write(`  With a high of $${highPrice} on ${highDate}\n    and a low of $${lowPrice} on ${lowDate}\n`)
      // console.log("lowDate ", lowDate);
      // console.log("highDate ", highDate);
  }
})
