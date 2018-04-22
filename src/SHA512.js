let crypto = require('crypto');

class SHA512 {
	
	buildHmacSignature(value ,secret){
		let algorithm = 'sha512';
		let hmacSHA512 = crypto.createHmac(algorithm, secret);
		hmacSHA512.write(value); 
		hmacSHA512.end();    
	
		let result = hmacSHA512.read().toString('hex');
		//console.log("hash of the string is:-", result);
		if(result.length % 2 != 0){
    		result = "0"+result;
		}
		return result;
	}
}

module.exports = SHA512;

