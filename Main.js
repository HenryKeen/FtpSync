var fs = require('fs');

var FileUploader = require("./FileUploader.js");
var BatchPreparer = require("./BatchPreparer.js");


var batchPreparer = new BatchPreparer();

var logBatches = function(batches){
	console.log("Found files:");
	
	batches.forEach(function(ftpBatch){
		ftpBatch.files.forEach(function(file){
			console.log(file.sourcePath);
		});

		ftpBatch.files.forEach(function(file){
			console.log(file.destinationPath);
		});
	});
};

var batches = [];

var uploadBatchesRecursive = function(uploader, i){
	if(i >= batches.length){
		console.log('Finished all uploads!');
		process.exit();
		return;
	}

	uploader.uploadFiles(batches[i].files, function(){
		uploadBatchesRecursive(uploader, i + 1);
	});
};

var upload = function(configFile){
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

	batchPreparer.prepare(config);

	if(config.debugMode === true)
		logBatches(config.ftpBatches);

	var uploader = new FileUploader(config);

	batches = config.ftpBatches;
	uploadBatchesRecursive(uploader, 0);
};

upload('ftp_config.json');