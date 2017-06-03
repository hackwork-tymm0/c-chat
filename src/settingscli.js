
const fs = require("fs");
const path = require("path");
const log = require("./log");
const jsonFile = require("jsonfile");

function setPort (port) {

	fs.unlink(path.resolve(__dirname, 'settings', 'port.json'), (err) => {
		
		if (err) {

			console.log(err);

		} else {

			jsonFile.writeFile(path.resolve(__dirname, 'settings', 'port.json'), { port: port }, (err) => {

				if (err) {
					console.log(err);
				} else {

					log.complete();

				}

			});

		}

	});

}

function setName (chatname) {

	fs.unlink(path.resolve(__dirname, 'settings', 'chatname.json'), (err) => {
		
		if (err) {

			console.log(err);

		} else {

			jsonF2ile.writeFile(path.resolve(__dirname, 'settings', 'chatname.json'), { chatname: chatname }, (err) => {

				if (err) {
					console.log(err);
				} else {

					log.complete();

				}

			});

		}

	});


}

module.exports = {

	setPort: setPort,
	setName: setName

};
