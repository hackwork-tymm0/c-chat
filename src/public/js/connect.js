
var aesTool = GibberishAES;

var aesKey = null;
var serverAddr = null;
var usersKeys = null; 
var username = null;

function connectToServer () {

	serverAddr = window.location.href.split("/")[2];

	log.connect(serverAddr);

	$.ajax({
		url: "http://" + serverAddr + "/api",
		method: "get",
		data: {"query": "connection"},
		success: function (data) {

			var dataParsed = JSON.parse(data);

			if (dataParsed.response === "apiConnected") {

				log.confirm({type: "connect"});
				chat.start();

				chat.chatMessage("")
				chat.chatMessage("-----------------------------------------");
				chat.chatMessage("");
				chat.chatMessage("		Server connected!");
				chat.chatMessage("");
				chat.update();

			} else {

				log.confirm({type: "connectError"});
				chat.errorMessage("Server connection refused!");
				chat.update();

			}

		}, 
		error: function () {

			log.confirm({type: "connectError"});
			chat.errorMessage("Server connection refused!");
			chat.update();

		}
	});
}

function addMessagesToChat (arrayMessages) {

	chat.clean();
	chat.update();

	for (var i = 0; i < arrayMessages.length; i++) {

		var sender = arrayMessages[i].split(":")[0];
		var message = arrayMessages[i].split(":")[1];

		if (sender === "chat") {

			chat.chatMessage(message);

		} else {

			var decryptedMessage = aesTool.dec(message, usersKeys[sender]);

			chat.userMessage(sender, decryptedMessage);

		}

	}

}

function authUser (user) {

	if (authed === false) {

		chat.chatMessage("	Auth " + user +"...");
		chat.chatMessage("");
		chat.chatMessage("	Generating AES Key");
		chat.update();
		log.genAES();

		aesKey = randomInt(0, 9).toString();

		for (var i = 0; i <= 9; i++) {

			aesKey += randomInt(0, 9).toString();

		}

		chat.chatMessage("	Generating hash");
		chat.update();

		var hash = base64_encode(
			JSON.stringify({
				user: user,
				aes: aesKey
			})
		);

		chat.chatMessage("	generated hash = " + hash);
		chat.update();
		log.auth(user, hash);

		$.ajax({

			url: "http://" + serverAddr + "/api",
			method: "get",
			data: {"query": "auth", "hash": hash},
			success: function (data) {

				var parsedData = JSON.parse(data);

				if (parsedData.response === "authSuccess") {

					authed = true;

					username = user;

					log.authSuccess();

					usersKeys = parsedData.aesKeys;

					chat.chatMessage("	Auth Successful!");
					chat.update();

					console.log(usersKeys);

					getMessages();

				} else {

					log.authFailed();
					chat.errorMessage("Auth Failed! Message: " + parsedData.error);
					chat.update();

				}

			},
			error: function () {
			
				log.confirm({type: "connectError"});
				chat.errorMessage("Server connection refused!");
				chat.update();
			
			}

		});

	} else {

		chat.chatMessage("You authinificated!");
		chat.update();

	}

}

function getMessages () {

	$.ajax({

		url: "http://" + serverAddr + "/api",
		method: "get",
		data: {"query": "getMessages", "user": username},
		success: function (data) {

			var parsedData = JSON.parse(data);

			if (parsedData.response === "getMessagesSuccess") {

				usersKeys = parsedData.newKeys;

				addMessagesToChat(parsedData.list);
				chat.update();

				getMessages();

			} else {

				chat.errorMessage("get messages failed. message: " + parsedData.error);
				chat.update();

				getMessages();

			}

		},
		error: function () {

			log.confirm({type: "connectError"});
			chat.errorMessage("Server connection refused!");
			chat.update();			

		}

	});

}

function randomInt (min, max) {

	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);

	return rand;

}

function base64_encode( data ) {	// Encodes data with MIME base64
	// 
	// +   original by: Tyler Akins (http://rumkin.com)
	// +   improved by: Bayron Guevara

	var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var o1, o2, o3, h1, h2, h3, h4, bits, i=0, enc='';

	do { // pack three octets into four hexets
		o1 = data.charCodeAt(i++);
		o2 = data.charCodeAt(i++);
		o3 = data.charCodeAt(i++);

		bits = o1<<16 | o2<<8 | o3;

		h1 = bits>>18 & 0x3f;
		h2 = bits>>12 & 0x3f;
		h3 = bits>>6 & 0x3f;
		h4 = bits & 0x3f;

		// use hexets to index into b64, and append result to encoded string
		enc += b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
	} while (i < data.length);

	switch( data.length % 3 ){
		case 1:
			enc = enc.slice(0, -2) + '==';
		break;
		case 2:
			enc = enc.slice(0, -1) + '=';
		break;
	}

	return enc;
}

function decodeBase64 (s) {

                var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
                var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                for(i=0;i<64;i++){e[A.charAt(i)]=i;}
                for(x=0;x<L;x++){
                            c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
                            while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
                }

                return r;
};


function sendMessage (text) {

	$.ajax({

		url: "http://" + serverAddr + "/api",
		method: "get",
		data: {"query": "sendMessage", "data": username + ":" + aesTool.enc(text, aesKey)},
		success: function (data) {

			var parsedData = JSON.parse(data);

			if (parsedData.response === "sendMessageSuccess") {

				log.messageSended();

			} else {

				chat.errorMessage("Send message failed. Message: " + parsedData.error);
				chat.update();

			}

		},
		error: function () {

			log.confirm({type: "connectError"});
			chat.errorMessage("Server connection refused!");
			chat.update();			

		}

	});

}

function commandShell (command, arg) {

	switch (command) {

		case "username":

			authUser(arg);

		break;

		case "getz":

			chat.chatMessage("Getz loves " + arg);
			chat.update();

		break;

		default:

			chat.errorMessage("Unknown command!");
			chat.update();

		break;

	}

}

var server = {

	connect:  connectToServer,
	send: sendMessage,
	command: commandShell

};