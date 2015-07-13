var fs = require('fs');

var FileUploader = require("./FileUploader.js");
var BatchPreparer = require("./BatchPreparer.js");
var ConfigFileLoader = require('./ConfigFileLoader.js');

var FileUploadController = function(){
	var self = this;
	
	var batchPreparer = new BatchPreparer();

	

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

	self.upload = function(isTest, isDebug){
		var config = new ConfigFileLoader(fs).load('ftp_config.json');

		if(!config){
			return;
		}

		config.testMode = isTest === true;
		config.debugMode = isDebug === true;

		batchPreparer.prepare(config);

		var uploader = new FileUploader(config);

		batches = config.ftpBatches;
		uploadBatchesRecursive(uploader, 0);
	};
};
module.exports = FileUploadController;