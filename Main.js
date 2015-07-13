var commander = require('commander');
var FileUploadController = require("./FileUploadController.js");
var ConfigFileGenerator = require('./ConfigFileGenerator.js');

commander.usage('[options]')
			.option('-i, --init', 'Generates a ftp_config.json template')
			.option('-t, --test', 'Test mode: Fakes the FTP calls. Use with debug mode (-d) to verify config file.')
			.option('-d, --debug', 'Debug mode: Log everything!')
			.parse(process.argv);

if(commander.init) {
	new ConfigFileGenerator().generate('ftp_config.json');
}
else {
	var uploadController = new FileUploadController();
	uploadController.upload(commander.test, commander.debug);
}