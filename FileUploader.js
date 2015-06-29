var path = require('path');
var JSFtp = require("jsftp");


var makeUnixPath = function(filePath) {
	return filePath.split('\\').join('/');
};

var getParentPath = function(filePath){
	return makeUnixPath(path.normalize(path.join(filePath, '..')));	
};

var FileUploader = function(options){
	var self = this;

	var Ftp = new JSFtp({
	  host: options.ftpConfig.host,
	  user: options.ftpConfig.username,
	  pass: options.ftpConfig.password,
	  debugMode: true
	});

	if(options.testMode === true){
		Ftp = new FtpStub();
	}

	if(options.debugMode === true){
		//Writes debug events to the console
		Ftp.on('jsftp_debug', function(eventType, data) {
			console.log('');
			console.log('DEBUG: ', eventType);
			console.log(JSON.stringify(data, null, 2));
			console.log('');
		});
	}

	var isDirectory = function(filePath){
		return filePath.indexOf('.') == -1;
	};

	var dirExists = function(path, callback){
		console.log('Checking if directory ' + path + ' exists...');

		Ftp.list(path, function(err, res) {
			// console.log('Error: ' + err);
			// console.log('Result: ' + res);

			if(res){
				console.log('...directory exists');
				callback(true);
			}
			else {
				console.log('...directory does not exist');
				callback(false);
			}
		});
	};

	var createDir = function(dirPath, callback){
		dirExists(dirPath, function(result){
			if(result){
				//dir already exists, continue
				callback(true);
			}
			else {
				console.log('Creating dir ' + dirPath + '...');

				Ftp.raw.mkd(dirPath, function(err, data) {
					// if(data){
					// 	console.log(data.text); // Show the FTP response text to the user
					// 	console.log(data.code); // Show the FTP response code to the user
					// }

				    if (err) {
				    	console.log(err);
				    	callback(false);
				    }
				    else {
				    	console.log('...done');
					    callback(true);
					}
				});
			}
		});
	};

	var putFile = function(sourcePath, destinationPath, callback){
		console.log('Uploading file ' + sourcePath + ' to ' + destinationPath);

		Ftp.put(sourcePath, destinationPath, function(hadError){
			if(hadError){
				console.log('ERROR: File transfer failed');
				callback(true);
			}
			else{
				callback(false);
			}
		});
	};

	var files = [];

	var uploadFileAtIndex = function(index, callback){
		if(index >= files.length){
			callback();
			return;
		}

		uploadFile(files[index].sourcePath, files[index].destinationPath, function(success){
			uploadFileAtIndex(index + 1, callback)
		});
	};

	var uploadFile = function(sourcePath, destinationPath, callback){
		if(isDirectory(destinationPath)){
			createDir(destinationPath, callback);
		}
		else {
			putFile(sourcePath, destinationPath, callback);
		}
	};

	self.uploadFiles = function(fileUploads, callback){
		Ftp.auth(options.ftpConfig.username, options.ftpConfig.password, function(){
			files = fileUploads;
			uploadFileAtIndex(0, callback);
		});
	};
};

module.exports = FileUploader;