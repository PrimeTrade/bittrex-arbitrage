let request = require("request")

let relativeURL = "https://bittrex.com/api/v1.1/public/getmarkets"

request({
    url: relativeURL,
    json: true
}, async function (error, response, body) {

    if (!error && response.statusCode === 200) {

        let a=body;
        console.log(a);

    }
    else{
        console.log("error occured");
    }
})


let MarketSummaryRelativeURL="https://bittrex.com/api/v1.1/public/getmarketsummaries"

request({
    url: MarketSummaryRelativeURL,
    json: true
}, async function (error, response, body) {

      if (!error && response.statusCode === 200) {

          let b=body;
          console.log(b);

      }
      else{
          console.log("error occured");
      }
 })
