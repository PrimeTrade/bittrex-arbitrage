let request = require("request")
let instance = require('./MarketAskName.js');

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
		 										console.log(quantity);
		 										// to be continued here from collection
		 										
		 										
		 										
		 										
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
        //console.log(temp);
        baseCurrency = temp.BaseCurrency;
        marketCurrency = temp.MarketCurrency;

        //console.log(baseCurrency);
        //console.log(marketCurrency);

        if(baseCurrency == ("BTC")){
            btc.push(marketCurrency);
        }
        else if(baseCurrency == ("ETH")){
            eth.push(marketCurrency);
        }
    }
    //console.log(btc);
}

getAnswer();


