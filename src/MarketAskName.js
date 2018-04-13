class MarketAskName {

  constructor(marketName, ask) {
    this.marketName = marketName;
    this.ask = ask;
  }
  
  getBid(){
  	return this.bid;
  }
  
  setBid(bid){
  	this.bid = bid;
  }  
  
  getMarketName(){
  	return this.marketName;
  }
  
  setMarketName(marketName){
  	this.marketName = marketName;
  }
  
  getAsk(){
  	return this.ask;
  }
  
  getCoins(){
  	return 1/this.ask;
  }
  
  setAsk(ask){
  	this.ask = ask;
  }

}

module.exports = MarketAskName;