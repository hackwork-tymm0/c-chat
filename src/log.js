
const pkg = require("../package.json");

module.exports = {

	startLog: () => {

		console.log("");
		console.log("	" + pkg.name + " v" + pkg.version);
		console.log("");
		console.log("	" + pkg.description);
		console.log("");
		console.log("----------------------------------------------------------");

	},

	complete: () => {

		console.log("");
		console.log("		OK!");
		console.log("");

	},

	getMessages: (user) => {

		console.log("	User " + user + " get messages");

	},

	sendMessage: (user, encMessage) => {

		console.log('	User ' + user + ' sends ' + encMessage);

	},

	connection: (req) => {

		paths = {

			url: req.url,
			ip: req.connection.remoteAddress.split(":")[3]

		};


		console.log("from: " + paths.ip);
		console.log("to:       " + paths.url);
		console.log("----");

	},

	apiConnect: () => {

		console.log("	API Connection query");

	},

	apiConnected: () => {

		console.log("	API Connected");

	},

	apiAuth: (hash, user) => {

		console.log("	Authenification...");
		console.log("");
		console.log("		user - " + user);
		console.log("		hash - " + hash);

	},

	version: () => {

		console.log("v" + pkg.version);

	},

	root: () => {

		console.log("");
		console.log("Send root");
		console.log("");

	},

	fileNotFound: () => {

		console.log("");
		console.log("File not found");
		console.log("");

	},

	chat: () => {

		console.log("");
		console.log("Send chat");
		console.log("");

	},

	listen: (port, ip) => {

		console.log("");
		console.log("Listen on port " + port);
		console.log("");
		console.log("	Please, check http://" + ip + ":" + port + "/chat in browser");
		console.log("");

	},

	help: () => {

		console.log();
		console.log("	" + pkg.name + " v" + pkg.version);
		console.log("");
		console.log("	Usage: c-chat [command]");
		console.log("");
		console.log("		h, help - help");
		console.log("		v, version - version this programm");
		console.log("		start - start this chat");
		console.log("		set-port=NUMBER_PORT - set port for server");
		console.log("");

	},

	notFound: () => {

		console.log("");
		console.log("	c-chat: command not found");
		console.log("");

	}

}
