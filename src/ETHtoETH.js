let request = require ("request")
let x,y;
function getAnswerETH(){
let relativeURL= "https://bittrex.com/api/v1.1/public/getmarkets";
request({
	url: relativeURL,
	json: true
}, async function(error,response,body){
	if(!error && response.statusCode===200){
		 x=body.result;


let MarketSummaryRelativeURL="https://bittrex.com/api/v1.1/public/getmarketsummaries"
request({
	url: MarketSummaryRelativeURL,
	json: true

}, async function(error,response,body) {
	if(!error && response.statusCode===200){
		 y=body.result;
		console.log(y);
	}
	else {
		console.log("error occured");
	}

    }
);
let btc=[];
let eth=[];
let KEY_MARKET_CURRENCY="MarketCurrency";
let KEY_BASE_CURRENCY="BaseCurrency";
getCurrency(x,btc,eth,KEY_BASE_CURRENCY,KEY_MARKET_CURRENCY);
let marketAskNames=[];
let etcName;
let btcName;
for(etcName in eth){
for(btcName in btc){

}}
}
else{
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
	console.log(eth);
}
getAnswerETH();
let MongoClient=require('mongodb').MongoClient;
let url="mongodb://localhost:27017/";
MongoClient.connect(url,function (err,db) {
    if (err) throw err;
    var collection = db.db("cryptoCurrency");
    collection.createCollection("COLLECTION_NAME", function (err, res) {
        if (err) throw err;
        console.log("collection created!");
        db.close;

    });
});
	

