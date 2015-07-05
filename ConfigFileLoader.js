ConfigFileLoader = function(fs){
	var self = this;

	var throwFieldNotFound = function(fieldName){
		throw "No value found for '" + fieldName + "' in ftp_config.json";
	};

	var validateRequiredKey = function(obj, key){
		if(obj[key] === undefined){
			throwFieldNotFound(key);
		}
	};

	self.load = function(configFile){
		var config;

		try
		{
			config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
		}
		catch(e)
		{
			if(e.errno == 34){
				console.log('Cannot find file ftp_config.json');
				return;
			}
			throw e;
		}

		validateRequiredKey(config, 'ftpConfig');
		validateRequiredKey(config.ftpConfig, 'host');
		validateRequiredKey(config, 'ftpBatches');
		
		return config;
	};
};

module.exports = ConfigFileLoader;