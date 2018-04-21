let request = require ("request")
let instance=require('./MarketAskName.js')

let x,y;
function getAnswerETH() {
    let relativeURL = "https://bittrex.com/api/v1.1/public/getmarkets";
    request({
        url: relativeURL,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            x = body.result;

            let MarketSummaryRelativeURL = "https://bittrex.com/api/v1.1/public/getmarketsummaries"
            request({
                url: MarketSummaryRelativeURL,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    y = body.result;
                    let btc = [];
                    let eth = [];
                    let KEY_MARKET_CURRENCY = "MarketCurrency";
                    let KEY_BASE_CURRENCY = "BaseCurrency";
                    getCurrency(x, btc, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);
                    let marketAskNames = [];
                    let etcName;
                    let btcName;
                    for (etcName in eth) {
                        for (btcName in btc) {
                            if (eth[etcName] == btc[btcName]) {
                                let tempMan = new instance();
                                for (let i = 0; i < y.length; i++) {
                                    let temp = y[i];
                                    let marketName = temp.MarketName;
                                    let ask = temp.Ask;
                                    let bid = temp.Bid;
                                    if (marketName == "ETH-" + eth[etcName]) {
                                        tempMan.setMarketName("ETH-" + eth[etcName]);
                                        tempMan.setAsk(ask);
                                    }
                                    if (marketName == "BTC-" + btc[btcName]) {
                                        tempMan.setBid(bid);
                                    }
                                }
                                marketAskNames.push(tempMan);
                                break;
                            }
                        }
                    }
                    let max = 0;
                    for (let temp in marketAskNames) {
                        let res = marketAskNames[temp].getBid() * marketAskNames[temp].getCoins();
                        if (max < res) {
                            max = marketAskNames[temp].getBid() * marketAskNames[temp].getCoins();
                            highestEth = marketAskNames[temp];
                        }
                    }
                    let i;
                    for (i = 0; i < y.length; i++) {
                        let temp = y[i];
                        let marketName = temp.MarketName;
                        if (marketName == highestEth.getMarketName()) {
                            break;
                        }
                    }
                    let temp = y[i];
                    for (i = 0; i < y.length; i++) {
                        let temp1 = y[i];
                        let marketName = temp1.MarketName;
                        if (marketName == ("BTC-") + highestEth.getMarketName().substring(4)) {
                            break;
                        }
                    }
                    let temp0 = y[i];
                    let a;
                    let ETHRelativeURL = "https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETH";
                    request({
                        url: ETHRelativeURL,
                        json: true
                    }, function (error, message, body) {
                        if (!error && response.statusCode === 200) {
                            a = body.result;
                            let temp1 = a[0];
                            let bid = temp1.Bid;
                            let b;
                            let z;

                            let ETHRelativeURL = "https://bittrex.com/api/v1.1/public/getmarkethistory?market=" + highestEth.getMarketName();
                            request({
                                url: ETHRelativeURL,
                                json: true
                            }, function (error, response, body) {
                                if (!error && response.statusCode === 200) {
                                    b = body.result;
                                    let temp2 = b[0];
                                    let quantity = temp2.Quantity;

                                    let ETHRelativeURL = "https://bittrex.com/api/v1.1/public/getmarkethistory?market=ETH-" + highestEth.getMarketName().substring(4);
                                    request({
                                            url: ETHRelativeURL,
                                            json: true
                                        }, function (error, message, body) {
                                            if (!error && response.statusCode === 200) {
                                                let z = body.result;
                                                let temp3 = z[0];
                                                let quantity1 = temp3.Quantity;
                                                if (quantity > quantity1) {
                                                    quantity = quantity1;
                                                }
                                                console.log(quantity);
                                                let MongoClient=require('mongodb').MongoClient;
                                                let url="mongodb://localhost:27017";
                                                MongoClient.connect(url,function (err,db) {


                                                    let person = db.db("cryptoCurrency");
                                                    if (bid * (highestEth.getBid()) * highestEth.getCoins() >= 1.015) {
                                                        let person = [{"_id": MarketAskName.cycleETH++},

                                                            {
                                                                "Market": [{"MarketName": highestETH.getMarketName()},
                                                                    {
                                                                        "Chain": [{
                                                                            "Transacation1": [{"MarketName": temp.MarketName},
                                                                                {"From": temp.MarketName.substring(0, 3)},
                                                                                {"To": temp.MarketName.substring(4)},
                                                                                {"Ask": temp.Ask},
                                                                                {"Bid": temp.Bid},
                                                                                {"TimeStamp": temp.TimeStamp}
                                                                            ]
                                                                        }]
                                                                            [{
                                                                            "Transaction2": [{'MarketName': 'BTC-' + temp.MarketName.substring(4)},
                                                                                {"From": temp0.MarketName.substring(4)},
                                                                                {'To': 'BTC'},
                                                                                {"Ask": temp0.Ask},
                                                                                {"Bid": temp0.Bid},
                                                                                {"TimeStamp": temp0.TimeStamp}]
                                                                        }]
                                                                            [{
                                                                            "Transaction3": [{'MarketName': temp1.MarketName},
                                                                                {"From": temp1.MarketName.substring(0, 3)},
                                                                                {"To": temp1.MarketName.substring(4)},
                                                                                {"Ask": temp1.Ask},
                                                                                {"Bid": temp1.Bid},
                                                                                {"TimeStamp": temp1.TimeStamp}
                                                                            ]
                                                                        }]
                                                                    }, {"NewETH": (bid * highestEth.getBid()) * (highestEth.getCoins())},
                                                                    {"Quantity": quantity}]
                                                            }];}

                                                        person.collection("COLLECTION_NAME").insert(person , function (err, res) {
                                                            if (err) throw err;
                                                            console.log("Number of documents inserted: "+res.insertedCount);



                                                        });
                                                     });
                                            }


                                            else {
                                                console.log("error occured");
                                            }
                                        }
                                    );
                                }


                                else {
                                    console.log("error occured");
                                }

                            });
                        }


                        else {
                            console.log("error occured");
                        }
                    });
                }
                else {
                    console.log("error occured");
                }
            });
        }
        else {
            console.log("error occured");
        }

    })
}
function getCurrency(jsonArray, btc, eth,keyBaseCurrency,keyMarketCurrency){
	for(i=0;i<jsonArray.length;i++){
		temp=jsonArray[i];
		console.log(temp);
		baseCurrency=temp.BaseCurrency;
		marketCurrency=temp.MarketCurrency;
		if(baseCurrency == ("ETH")){
			eth.push(marketCurrency);
		}
		else if(baseCurrency == ("BTC")){
			btc.push(marketCurrency);
		}
	}
	//console.log(eth);
}
getAnswerETH();


