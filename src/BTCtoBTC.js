var request = require("request")

var relativeURL = "https://bittrex.com/api/v1.1/public/getmarkets"

request({
    url: relativeURL,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {

        var a=body;
        console.log(a);

    }
    else{
        console.log("error occured");
    }
})

var MarketSummaryRelativeURL="https://bittrex.com/api/v1.1/public/getmarketsummaries"

request({
    url: MarketSummaryRelativeURL,
    json: true
}, function (error, response, body) {

      if (!error && response.statusCode === 200) {

          var b=body;
          console.log(b);

      }
      else{
          console.log("error occured");
      }
 })