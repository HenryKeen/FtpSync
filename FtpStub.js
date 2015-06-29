var FtpStub = function(){
	var self = this;

	self.auth = function(username, password, callback){
		callback();
	};

	self.on = function(){};

	self.list = function(dirPath, callback){
		callback();
	};

	self.put = function(sourcePath, destinationPath, callback){
		callback();
	};

	self.raw = {
		mkd: function(dirPath, callback){
			callback();
		}
	};
};

module.exports = FtpStub;