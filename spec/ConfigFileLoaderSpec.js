var ConfigFileLoader = require('../ConfigFileLoader.js');

describe('When loading the config file', function(){

	var configLoader;
	var fsStub = {};

	beforeEach(function(){
		configLoader = new ConfigFileLoader(fsStub);
	});

	describe('and the config file does not exist', function(){

		beforeEach(function(){
			console.log = jasmine.createSpy('log');
			
			fsStub.readFileSync = jasmine.createSpy('readFileSync').and.callFake(function(){ 
				throw { errno: 34 }
			});

			//Act
			configLoader.load('file_config.json');
		});
		
		it('prompts the user', function(){
			expect(console.log).toHaveBeenCalledWith('Cannot find file ftp_config.json');
		});
	});

	describe('and the config file exists', function(){

		var fieldIsRequiredSpec = function(configJsonContent, fieldName){
			var exception;

			beforeEach(function(){
				fsStub.readFileSync = jasmine.createSpy('readFileSync').and.callFake(function(){ 
					return configJsonContent;
				});

				//Act
				try 
				{
					configLoader.load('file_config.json');
				}
				catch(e) {
					exception = e;
				}
			});

			it('throws an error promting the user that the field is missing', function(){
				expect(exception).not.toBe(null);
				expect(exception).toBe("No value found for '" + fieldName + "' in ftp_config.json");
			});
		};

		describe('and the ftpConfig field is missing', function(){
			fieldIsRequiredSpec("{}", 'ftpConfig');
		});

		describe('and the host field is missing', function(){
			fieldIsRequiredSpec("{ \"ftpConfig\": {} }", 'host');
		});

		describe('and the ftpBatches field is missing', function(){
			fieldIsRequiredSpec("{ \"ftpConfig\": { \"host\": \"some-host\" } }", 'ftpBatches');
		});
	});
});