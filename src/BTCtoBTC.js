let request = require("request")
//let instance = require('./MarketAskName.js');

let a,b;

function getAnswer(){

    let relativeURL = "https://bittrex.com/api/v1.1/public/getmarkets";

    request({
        url: relativeURL,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {

            a=body.result;

            let MarketSummaryRelativeURL="https://bittrex.com/api/v1.1/public/getmarketsummaries"

            request({
                url: MarketSummaryRelativeURL,
                json: true
            }, function (error, response, body) {

                if (!error && response.statusCode === 200) {

                    b=body.result;
                }
                else{
                    console.log("error occured");
                }
            });

            let btc = [];
            let eth = [];
            let KEY_BASE_CURRENCY = "BaseCurrency";
            let KEY_MARKET_CURRENCY = "MarketCurrency";

            getCurrency(a, btc, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);

            let marketAskNames = [];
            let btcName,etcName;

            for(btcName in btc){
                for(etcName in eth){
                	if(btc[btcName] == eth[etcName]){
                    	let tempMAN=new instance();
                    	for(let i=0;i<b.length;i++){
                    		let temp = b[i];
                    		let marketName = temp.MarketName;
                    		let ask = temp.Ask;
                    		let bid = temp.Bid;
                    				
                    		if(marketName == "BTC-"+btc[btcName]){
                    			tempMAN.setMarketName("BTC-"+btc[btcName]);
                    			tempMAN.setAsk(ask);
                    		}
                    		if(marketName == "ETH-"+eth[etcName]){
                    			tempMAN.setBid(bid);
                    		}
                    	}
                    marketAskNames.push(tempMAN);
                    break;
                	}
                }
            }
            		

        }
        else{
            console.log("error occured");
        }

    })
}



function getCurrency(jsonArray, btc, eth, keyBaseCurrency, KeyMarketCurrency){

    for(i = 0;i<jsonArray.length;i++){
        temp = jsonArray[i];
        console.log(temp);
        baseCurrency = temp.BaseCurrency;
        marketCurrency = temp.MarketCurrency;

        console.log(baseCurrency);
        console.log(marketCurrency);

        if(baseCurrency == ("BTC")){
            btc.push(marketCurrency);
        }
        else if(baseCurrency == ("ETH")){
            eth.push(marketCurrency);
        }
    }
    console.log(btc);
}

getAnswer();


