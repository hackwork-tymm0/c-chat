
const settingsPort = require("./settings/port.json");
const log = require("./log");
const http = require("http");
const fs = require("fs");
const path = require("path");
const ip = require("ip");
const api = require("./api");

class chatClass {

	start () {

		require('./api/messages').addNameServer();
		http.createServer((req, res) => this.handleHTTP(req, res)).listen(settingsPort.port, () => log.listen(settingsPort.port, ip.address()));

	}

	handleHTTP (req, res) {

		log.connection(req);

		switch (req.url.split("?")[0]) {

			case "/":

				this.root(req, res);

			break;

			case "/api":

				api.start(req, res);

			break;

			case "/chat":

				this.chat(req, res);

			break;

			default:

				switch (path.extname(req.url)) {

					case ".js":

						this.fileGet("javascript", req, res);

					break;

					case ".css":

						this.fileGet("css", req, res);

					break;

					default:

						this.notFound(req, res);

					break;

				}

			break;

		}

	}

	root (req, res) {

		log.root();

		res.writeHead(200, {"Content-Type": "text/html"});

		let stream = fs.createReadStream(path.resolve(__dirname, "public", "redirect.html"));
		stream.pipe(res);

	}

	chat (req, res) {

		log.chat();

		res.writeHead(200, {"Content-Type": "text/html"});

		let stream = fs.createReadStream(path.resolve(__dirname, "public", "chat.html"));
		stream.pipe(res);

	}

	notFound (req, res) {

		log.fileNotFound();

		res.writeHead(404, {"Content-Type": "text/html"});

		let stream = fs.createReadStream(path.resolve(__dirname, "public", "error.html"));
		stream.pipe(res);

	}
	
	fileGet (type, req, res) {

		let filePath = '';
		let contentType = "text/" + type;

		res.statusCode = 200;
		res.setHeader("Content-Type", contentType);

		switch (type) {

			case "css":

				filePath = path.resolve(__dirname, "public", "css", req.url.split("/")[2]);

			break;

			case "javascript":

				filePath = path.resolve(__dirname, "public", "js", req.url.split("/")[2]);

			break

		}

		let stream = fs.createReadStream(filePath	);
		stream.pipe(res);

		stream.on("error", error => {

			if (error === "ENOENT") {

				res.writeHead(404, {"Content-Type": "text/plain"});
				res.write("not found");
				res.end();

			} else {

				res.writeHead(500, {"Content-Type": "text/plain"});
				res.write(error.message);
				res.end();

			}

		});

	}

}

module.exports = {

	start: () => {

		log.startLog();

		let chat = new chatClass();

		chat.start();

	},

	version: () => log.version(),
	help: () => log.help(),
	notFound: () => log.notFound()

}
