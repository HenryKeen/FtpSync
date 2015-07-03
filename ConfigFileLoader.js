var fs = require('fs');

ConfigFileLoader = function(){
	var self = this;

	self.load = function(configFile){
		var config;

		try
		{
			config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
		}
		catch(e)
		{
			if(e.errno == 34){
				console.log('Cannot find file ftp_config.json, exiting...');
				process.exit();
			}
			throw e;
		}

		return config;
	};
};

module.exports = ConfigFileLoader;