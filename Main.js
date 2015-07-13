var commander = require('commander');
var FileUploadController = require("./FileUploadController.js");


commander.usage('[options]')
			.option('-t, --test', 'Test mode: Fakes the FTP calls. Use with debug mode (-d) to verify config file.')
			.option('-d, --debug', 'Debug mode: Log everything!')
			.parse(process.argv);


var uploadController = new FileUploadController();
uploadController.upload(commander.test, commander.debug);