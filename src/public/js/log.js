
function logStartApp () {

	console.log(">-------------------------------------------------------------");
	console.log(">");
	console.log(">	CChat Client App");
	console.log(">");
	console.log(">-------------------------------------------------------------");
	console.log("");

}

function logGenHash () {

	console.log("	Generating hash...");

}

function logAppSended () {

	console.log("");
	console.log("App sended and loaded");
	console.log("");

}

function logMessageSended () {

	console.log("	Your message sended");

}

function logConnect (server) {

	console.log("");
	console.log("Connect to server: " + server);
	console.log("");

}

function logAuth (user, hash) {
	console.log("");
	console.log("	User - " + user);
	console.log("	Hash - " + hash);
	console.log("");

}

function logAuthSuccess () {

	console.log("	Auth Success");
	console.log("	Get users AES-keys");

}

function logAuthFailed () {

	console.log("	Auth failed!");

}

function logConfirm (obj) {

	switch (obj.type) {

		case "connect":

			console.log("Server connected!");

		break;

		case "connectError":

			console.log("Server refused!");

		break;

	}

}

function logGenAES () {

	console.log("	Generating AES Key...");

}

var log = {
	start: logStartApp,
	sended: logAppSended,
	connect: logConnect,
	confirm: logConfirm,
	auth: logAuth,
	authSuccess: logAuthSuccess,
	authFailed: logAuthFailed,
	genHash: logGenHash,
	genAES: logGenAES,
	messageSended: logMessageSended
}