// Got help from Kent Korgan and Kevin


var Crypto;

Crypto = function(text) {
	this.text = text;
};

Crypto.prototype.normalizePlaintext =  function() {
	var message = this.text.replace(/[.,\/#!$%\^&\*;?:{}=\-_`~()]/g, '');
	message = message.replace(/\s+/g, ''); 	// remove spaces
	message = message.toLowerCase(); 		// all lower case
	return message;
};

Crypto.prototype.size = function() {
	var message = this.normalizePlaintext(); 	// normalize
	var size = Math.sqrt(message.length); 		// find the square

	if (size % 1 === 0) //
		return size;
	else 				// round up if it isn't a perfect square
		return Math.ceil(size);
};
	
Crypto.prototype.plaintextSegments = function() {
	var message = this.normalizePlaintext();
	var segments = [];

	for (i = 0; i < this.size(); i++) {		
		segments[i] = message.slice(i * this.size(), (i+1) * this.size());	
	}
	if (segments[segments.length-1] === '')	
		segments.pop();
	return segments;
};

Crypto.prototype.ciphertext = function() {
	var segments = this.plaintextSegments();
	var message = '';

	for (i = 0; i < this.size(); i++) {			// run through array
		// run through strings keeping charAt() in bounds
		for(j = 0; j < segments.length && i < segments[j].length; j++) { 
			message += segments[j].charAt(i);	// add letters in order
		}
	}
	return message;
};

module.exports = Crypto;
