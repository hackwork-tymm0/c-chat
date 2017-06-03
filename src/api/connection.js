
const log = require("../log");

function connection (req, res) {

	log.apiConnect();

	let response = JSON.stringify({
		response: "apiConnected"
	});

	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write(response);
	res.end();

	log.apiConnected();

}

module.exports = connection;
