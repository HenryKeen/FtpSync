var fs = require('fs');
var ConfigGenerator = require('../../ConfigFileGenerator.js');

describe('When generating a config file ', function(){
	
	var filePath = './test_data/ftp_config.json';
	var configGenerator;

	beforeEach(function(){
		configGenerator = new ConfigGenerator();
		configGenerator.generate(filePath);
	});

	it('it creates a new config file', function(){
		var fileLength = fs.readFileSync(filePath, 'utf8');

		expect(fileLength.length).toBeGreaterThan(0);
	});

	afterEach(function(){
		fs.unlinkSync(filePath);
	});
});