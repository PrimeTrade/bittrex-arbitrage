let https=require('https');
console.log("1 Passed");
let URL=require('url').URL;
let jsonObject;
let jsonArray=[];
let MSObject;
let MSArray=[];
const BASE_URL=new URL('https://bittrex.com/api/v1.1/');
const KEY_BASE_CURRENCY='BaseCurrency';
const KEY_MARKET_CURRENCY='MarketCurrency';
const KEY_MARKET_NAME="MarketName";
const KEY_ASK="Ask";
const KEY_BID="Bid";
let getAnswer= function(){
    console.log("2 Passed");
    let relativeUrl=new URL('public/getmarkets',BASE_URL);
    let req=https.get(relativeUrl,(res)=>{
        console.log(`Status:${res.statusCode}`);
        res.on('data',(chunk)=>{
            jsonObject=JSON.stringify(chunk);
            jsonArray=JSON.parse(jsonObject);
            console.log(`Markets: ${jsonArray.data}`);
        });
        res.on('end',()=>{
            console.log("No more data");
        });
    });
    req.on('error',(e)=>{
        console.log(e);
    });
    let usdt=[];
    let eth=[];
    //req.abort();
    const MarketSummaryRelativeURL=new URL('/public/getmarketsummaries',BASE_URL);
    req=https.get(MarketSummaryRelativeURL,(res)=>{
        console.log(`Status:${res.statusCode}`);
        res.on('data',(chunk)=>{
            MSObject=JSON.stringify(chunk);
            MSArray=JSON.parse(MSObject);
            console.log(`MarketSummaries:${MSArray.data}`);
        });
        res.on('end',()=>{
            console.log('No more data');
        });
    });
    req.on('error',(e)=>{
        console.log(e);
    });
    //req.abort();
    console.log("3 Passed");
    console.log(jsonArray);
    getUSDTETHMarkets(jsonArray, usdt, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);
    let marketAskNames=[];
    let etcName,usdtName;
    for(etcName in eth){
        for(usdtName in usdt){
            if(getAskValue(MSArray,marketAskNames,etcName,usdtName,KEY_MARKET_NAME,KEY_ASK,KEY_BID))
                break;
        }
    }
}
let getUSDTETHMarkets=function(jsonArray,usdt,eth,keyBaseCurrency,keyMarketCurrency){
    let temp,baseCurrency,marketCurrency;
    for(let i=0;i<jsonArray.length;i++){
        temp=jsonArray[i];
        baseCurrency=temp.keyBaseCurrency;
        marketCurrency=temp.keyMarketCurrency;
        if(baseCurrency===("USDT")){
            usdt.push(marketCurrency);
        }
        else if(baseCurrency===("ETH")){
            eth.push(marketCurrency);
        }

    }
}
getAnswer();
