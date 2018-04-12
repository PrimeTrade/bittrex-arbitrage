function getAnswer(){

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

	var btc = [];
	var eth = [];
	var KEY_BASE_CURRENCY = "BaseCurrency";
    var KEY_MARKET_CURRENCY = "MarketCurrency";
    
	getCurrency(a, btc, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);
	
	
}

function getCurrency(jsonArray, btc, eth, keyBaseCurrency, KeyMarketCurrency){
	for(i = 0;i < jsonArray.length;i++){
		temp = i;
		baseCurrency = temp.keyBaseCurrency;
		marketCurrency = temp.KeyMarketCurrency;
		if(baseCurrency == ("BTC")){
			btc.push(marketCurrency);
		}
		else if(baseCurrency == ("ETH")){
			eth.push(marketCurrency);
		}
	}
	console.log(btc);
}

