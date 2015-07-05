var FileUploadController = require("../../FileUploadController.js");

describe('When uploading files', function(){
	var uploadController = new FileUploadController();

	it('does not throw any exceptions', function(){
		var exception;

		try {
			uploadController.upload();
		}
		catch(e){
			exception = e;
		}

		expect(exception).toBe(undefined);
	});
});