var fs = require('fs');

var configFileGenerator = function(){
	var self = this;

	var sampleConfig = {
		"ftpConfig" : {
		  "host": "",
		  "username": "",
		  "password": ""
		},
		"ftpBatches": [{
			"localRoot": "",
			"remoteRoot": "",
			"match": ["**","!node_modules","!package.json"]
		}]
	};

	self.generate = function(filePath){
		var configJson = JSON.stringify(sampleConfig, null, 4);
		console.log('Generating config...');
		console.log(configJson);
		fs.writeFileSync(filePath,configJson);
		console.log('...done!');
	};
};

module.exports = configFileGenerator;