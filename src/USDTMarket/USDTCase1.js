let https=require('https');
let URL=require('url').URL;
const BASE_URL=new URL('https://bittrex.com/api/v1.1');
const KEY_BASE_CURRENCY='BaseCurrency';
const KEY_MARKET_CURRENCY='MarketCurrency';
let getAnswer= function(){
    let jsonObject,MSObject,jsonArray,MSArray;
    const relativeUrl=new URL('/public/getmarkets',BASE_URL);
    let req=https.request(relativeUrl,(res)=>{
        console.log(`Status:${res.statusCode}`);
        res.on('data',(chunk)=>{
            jsonObject=JSON.stringify(chunk);
            jsonArray=JSON.parse(jsonObject);
            console.log(`Body: ${jsonArray}`);
        });
        res.on('end',()=>{
            console.log('No more data');
        });
    });
    req.on('error',(e)=>{
        console.log(e);
    });
    let usdt=[];
    let eth=[];
    req.abort();
    const MarketSummaryRelativeURL=new URL('/public/getmarketsummaries',BASE_URL);
    req=https.request(MarketSummaryRelativeURL,(res)=>{
        console.log(`Status:${res.statusCode}`);
        res.on('data',(chunk)=>{
            MSObject=JSON.stringify(chunk);
            MSArray=JSON.parse(MSObject);
            console.log(`MarketSummaries:${MSObject}`);
        });
        res.on('end',()=>{
            console.log('No more data');
        });
    });
    req.on('error',(e)=>{
        console,log(e);
    });
    req.abort();
    getUSDTETHMarkets(jsonArray, usdt, eth, KEY_BASE_CURRENCY, KEY_MARKET_CURRENCY);
    let marketAskNames=[];
}
let getUSDTETHMarkets=function(jsonArray,usdt,eth,keyBaseCurrency,keyMarketCurrency){
    for(let i=0;i<jsonArray.length();i++){
        temp=jsonArray[i];


    }
}
getAnswer();
