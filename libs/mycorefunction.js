"use strict";
var crypto  = require('crypto');
const fs = require('fs');
module.exports.encrypt = function(password){
	return crypto.createHash('sha256').update(password).digest('hex');
}
module.exports.checkDirectorySync = function(directory) {  
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}
module.exports.checkFileExists = function(path,callback){
	fs.exists(path, function(exists) {
	  	callback(exists) 
	});
}
