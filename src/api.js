
const url = require("url");
const connection = require("./api/connection");
const auth = require("./api/auth");
const messages = require("./api/messages");

class CChatAPI {

	start (req, res) {

		let values = this.getValues(req.url);

		switch (values.query) {

			case "connection":

				connection(req, res);

			break;

			case "getMessages":

				if (values.user) {

					messages.get(req, res, values.user);

				} else {

					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(JSON.stringify({response: "noUserAccepted"}));
					res.end();

				}

			break;

			case "sendMessage":

				if (values.data) {

					messages.send(req, res, values.data);

				} else {

					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(JSON.stringify({response: "noMessage"}));
					res.end();

				}

			break;

			case "auth":

				if (values.hash) {

					auth.auth(req, res, values.hash)

				} else {

					res.writeHead(200, {"Content-Type": "text/plain"});
					res.write(JSON.stringify({response: "noHash"}));
					res.end();

				}

			break;

		}

	}

	getValues (urlNotParsed) {

		let parsedURL = url.parse(urlNotParsed, true);

		return parsedURL.query;

	}

}

const api = new CChatAPI();

module.exports = {

	start: (req, res) => api.start(req, res)

};
