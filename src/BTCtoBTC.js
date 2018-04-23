let request = require("request")
let instance = require('./MarketAskName.js');
let instance1 = require('./SHA512.js');

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
                    let btc = [];
                    let eth = [];
                    let KEY_BASE_CURRENCY = "BaseCurrency";
                    let KEY_MARKET_CURRENCY = "MarketCurrency";

                    getCurrency(a, btc, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);

                    let marketAskNames = [];
                    let btcName,etcName;

                    for(let btcName in btc){
                        for(let etcName in eth){
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

                    let max = 0;


                    for(let temp in marketAskNames){
                        let res = marketAskNames[temp].getBid() * marketAskNames[temp].getCoins();
                        if(max < res){
                            max = marketAskNames[temp].getBid() * marketAskNames[temp].getCoins();
                            highestEth = marketAskNames[temp];
                        }
                    }

                    let i;
                    for(i=0;i<b.length;i++){
                        let temp = b[i];
                        let marketName = temp.MarketName;
                        if(marketName == highestEth.getMarketName()){
                            break;
                        }
                    }

                    let temp = b[i];


                    for(i=0;i<b.length;i++){
                        let temp1 = b[i];
                        let marketName = temp1.MarketName;
                        if(marketName == "ETH-"+highestEth.getMarketName().substring(4)){
                            break;
                        }
                    }


                    let temp0 = b[i];

                    let x;
                    let relativeURL= "https://bittrex.com/api/v1.1/public/getmarketsummary?market=BTC-ETH";
                    request({
                            url: relativeURL,
                            json: true
                        },function(error,response,body){
                            if(!error && response.statusCode===200){
                                x=body.result;
                                //console.log(x[0]);
                                let temp1 = x[0];
                                let bid = temp1.Bid;
                                let y;
                                //console.log(highestEth.getCoins());
                                let relativeURL= "https://bittrex.com/api/v1.1/public/getmarkethistory?market=" + highestEth.getMarketName();
                                request({
                                    url: relativeURL,
                                    json: true
                                },function(error,response,body){
                                    if(!error && response.statusCode===200){
                                        y=body.result;
                                        //console.log(y);

                                        let temp2 = y[0];
                                        let quantity = temp2.Quantity;

                                        let relativeURL= "https://bittrex.com/api/v1.1/public/getmarkethistory?market=ETH-" + highestEth.getMarketName().substring(4);
                                        request({
                                            url: relativeURL,
                                            json: true
                                        },function(error,response,body){
                                            if(!error && response.statusCode===200){
                                                z=body.result;
                                                let temp3 = z[0];
                                                let quantity1 = temp3.Quantity;
                                                if(quantity > quantity1){
                                                    quantity = quantity1;
                                                }
                                                //console.log(quantity);


                                                let MongoClient=require('mongodb').MongoClient;
                                                let url="mongodb://localhost:27017";
                                                MongoClient.connect(url,function (err,db) {


                                                    let person = db.db("cryptoCurrency");
                                                    if (bid * (highestEth.getBid()) * highestEth.getCoins() >= 1.015) {
                                                        let person = [{"_id": MarketAskName.cycleBTC++},

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
                                                                            "Transaction2": [{'MarketName': 'ETH-' + temp.MarketName.substring(4)},
                                                                                {"From": temp0.MarketName.substring(4)},
                                                                                {'To': 'ETH'},
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
                                                                    }, {"NewBTC": (bid * highestEth.getBid()) * (highestEth.getCoins())},
                                                                    {"Quantity": quantity}]
                                                            }];
                                                    }

                                                    person.collection("COLLECTION_NAME").insert(person, function (err, res) {
                                                        if (err) throw err;
                                                        console.log("Number of documents inserted: " + res.insertedCount);


                                                    });

                                                });


                                                let request = require("request")
                                                let hmac = new instance1();
                                                let apiKey = "";
                                                let apiSecret = "";
                                                let dt = new Date();
                                                let nonce = dt.getTime();
                                                let ORelativeURL = "https://bittrex.com/api/v1.1/account/getbalances?apikey=" + apiKey + "&nonce=" + nonce;
                                                let sign = hmac.buildHmacSignature(ORelativeURL , apiSecret);

                                                request({
                                                    url: ORelativeURL,
                                                    json: true
                                                }, function (error, response, body) {

                                                    if (!error && response.statusCode === 200) {

                                                        let balanceArray=body.result;
                                                        console.log(balanceArray);
                                                        for(i=0 ; i<balanceArray.length() ; i++){
                                                            let balance = balanceArray[i];
                                                            let currency = balance.Currency;
                                                            if(currency == "BTC"){
                                                                let Balance = balance.Balance;
                                                                let Quantity = Balance/temp.Ask;
                                                                if(Balance != 0){
                                                                    if(quantity*temp.Ask > Balance){
                                                                        nonce = dt.getTime();
                                                                        let O1RelativeURL = "https://bittrex.com/api/v1.1/market/buylimit?apikey=" + apikey + "&market=" + highestEth.getMarketName() + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp.Ask ;
                                                                        hmac = new instance1();
                                                                        let sign1 = hmac.buildHmacSignature(O1RelativeURL , apiSecret);
                                                                        request({
                                                                            url: O1RelativeURL,
                                                                            json: true
                                                                        }, function (error, response, body) {

                                                                            if (!error && response.statusCode === 200) {
                                                                                let buyObject = body;
                                                                                if(buyObject.Key_Success == "true"){
                                                                                    Quantity = Quantity + temp0.Bid;
                                                                                    nonce = dt.getTime();
                                                                                    let O2RelativeURL = "https://bittrex.com/api/v1.1/market/selllimit?apikey=" + apikey + "&market=ETH-" + highestEth.getMarketName().substring(4) + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp0.Bid;
                                                                                    hmac = new instance1();
                                                                                    let sign2 = hmac.buildHmacSignature(O2RelativeURL, apiSecret);
                                                                                    request({
                                                                                        url: O2RelativeURL,
                                                                                        json: true
                                                                                    }, function (error, response, body) {

                                                                                        if (!error && response.statusCode === 200) {

                                                                                            buyObject = body;
                                                                                            if(buyObject.Key_Success == "true"){
                                                                                                Quantity = Quantity * temp1.Bid;
                                                                                                nounce = dt.getTime();
                                                                                                let O3RelativeURL = "https://bittrex.com/api/v1.1/market/selllimit?apikey=" + apikey + "&market=BTC-ETH" + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp1.Bid;
                                                                                                hmac = new instance1();
                                                                                                let sign3 = hmac.buildHmacSignature(O3RelativeURL, apiSecret);
                                                                                                request({
                                                                                                    url: O3RelativeURL,
                                                                                                    json: true
                                                                                                }, function (error, response, body) {

                                                                                                    if (!error && response.statusCode === 200) {
                                                                                                        buyObject = body;
                                                                                                    }
                                                                                                    else{
                                                                                                        console.log("error occured");
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                        else{
                                                                                            console.log("error occured");
                                                                                        }
                                                                                    });
                                                                                }
                                                                            }
                                                                            else{
                                                                                console.log("error occured");
                                                                            }
                                                                        });
                                                                        break;
                                                                    }


                                                                    else{
                                                                        Quantity = quantity;
                                                                        nonce = dt.getTime();
                                                                        let O1RelativeURL = "https://bittrex.com/api/v1.1/market/buylimit?apikey=" + apikey + "&market=" + highestEth.getMarketName() + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp.Ask ;
                                                                        hmac = new instance1();
                                                                        let sign1 = hmac.buildHmacSignature(O1RelativeURL , apiSecret);
                                                                        request({
                                                                            url: O1RelativeURL,
                                                                            json: true
                                                                        }, function (error, response, body) {
                                                                            if (!error && response.statusCode === 200) {
                                                                                let buyObject = body;
                                                                                if (buyObject.Key_Success == "true") {
                                                                                    Quantity = Quantity * temp0.Bid;
                                                                                    nonce = dt.getTime();
                                                                                    let O2RelativeURL = "https://bittrex.com/api/v1.1/market/selllimit?apikey=" + apikey + "&market=ETH-" + highestEth.getMarketName().substring(4) + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp0.Bid;
                                                                                    hmac = new instance1();
                                                                                    let sign2 = hmac.buildHmacSignature(O2RelativeURL, apiSecret);
                                                                                    request({
                                                                                        url: O2RelativeURL,
                                                                                        json: true
                                                                                    }, function (error, response, body) {

                                                                                        if (!error && response.statusCode === 200) {
                                                                                            buyObject = body;
                                                                                            if (buyObject.Key_Success == "true") {
                                                                                                Quantity = Quantity * temp1.Bid;
                                                                                                nounce = dt.getTime();
                                                                                                let O3RelativeURL = "https://bittrex.com/api/v1.1/market/selllimit?apikey=" + apikey + "&market=BTC-ETH" + "&nonce=" + nonce + "&quantity=" + Quantity + "&rate=" + temp1.Bid;
                                                                                                hmac = new instance1();
                                                                                                let sign3 = hmac.buildHmacSignature(O3RelativeURL, apiSecret);
                                                                                                request({
                                                                                                    url: O3RelativeURL,
                                                                                                    json: true
                                                                                                }, function (error, response, body) {

                                                                                                    if (!error && response.statusCode === 200) {
                                                                                                        buyObject = body;
                                                                                                    }
                                                                                                    else {
                                                                                                        console.log("error occured");
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        }
                                                                                        else {
                                                                                            console.log("error occured");
                                                                                        }
                                                                                    });
                                                                                }
                                                                                else {
                                                                                    console.log("error occured");
                                                                                }
                                                                            }
                                                                        });
                                                                        break;
                                                                    }
                                                                }

                                                            }
                                                        }
                                                    }
                                                    else{
                                                        console.log("error");
                                                    }

                                                });

                                            }
                                            else{
                                                console.log("error occured");
                                            }
                                        });
                                    }
                                    else{
                                        console.log("error occured");
                                    }
                                });
                            }
                            else{
                                console.log("error occured");
                            }
                        }
                    );
                }
                else{
                    console.log("error occured");
                }
            });
        }
        else{
            console.log("error occured");
        }

    })
}



function getCurrency(jsonArray, btc, eth, keyBaseCurrency, KeyMarketCurrency){

    for(i = 0;i<jsonArray.length;i++){
        temp = jsonArray[i];
        baseCurrency = temp.BaseCurrency;
        marketCurrency = temp.MarketCurrency;

        if(baseCurrency == ("BTC")){
            btc.push(marketCurrency);
        }
        else if(baseCurrency == ("ETH")){
            eth.push(marketCurrency);
        }
    }
}

getAnswer();



