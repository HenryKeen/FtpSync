#auto-ftp
auto-ftp is an automation tool for deploying via FTP. It allows you to describe the files that need to be deployed, where to deploy it to, and what credentials to use in a configuration file so it works the same every time.


##Installation

``npm install -g auto-ftp``

##Configuration

Create ftp_config.json file.

To copy all files in the upload apart from config.json to the "/website-root" directory, your config would look like this...

```json
{
	"ftpConfig" : {
	  "host": "yourhost.com",
	  "username": "yourusername",
	  "password": "yourpassword"
	},
	"ftpBatches": [{
		"localRoot": "",
		"remoteRoot": "/website-root",
		"match": ["**", "!config.json"]
	}],
	"testMode": false,
	"debugMode": false
}
```

To copy all files from the "web" directory and the "config.json" file from the "/config/production" to the root ftp directory...

```json
{
	"ftpConfig" : {
	  "host": "yourhost.com",
	  "username": "yourusername",
	  "password": "yourpassword"
	},
	"ftpBatches": [{
		"localRoot": "web",
		"remoteRoot": "",
		"match": ["**"]
	},
	{
		"localRoot": "",
		"remoteRoot": "/website-root",
		"match": ["config/production/config.json"]
	}],
	"testMode": false,
	"debugMode": false
}
```

##Run it

``auto-ftp``