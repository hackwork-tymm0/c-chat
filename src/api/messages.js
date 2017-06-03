
const url = require("url");
const log = require("../log");

let ListMessages = [];

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

function addNameServer () {

	ListMessages.push('chat:');
	ListMessages.push('chat: 	CChat');
	ListMessages.push('chat:');
	ListMessages.push('chat:		Chat started!');
	ListMessages.push('chat:');
	ListMessages.push('chat:s============================');

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

function getMessages (req, res, user) {

	log.getMessages(user);

	let usersList = require("./auth").getUsers();
	let userKeys = require("./auth").getKeys();

	if (usersList.indexOf(user) != -1) {

		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(JSON.stringify({
			response: "getMessagesSuccess",
			list: ListMessages,
			newKeys: userKeys
		}));
		res.end();

	} else {

		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write({
			response: "getMessagesFailed",
			error: "you don't authenificated!"
		});
		res.end();

	}

}

function sendMessage (req, res, data) {

	let usersList = require("./auth").getUsers();
	
	let user = data.split(":")[0];
	let message = data.split(":")[1];

	log.sendMessage(user, message);

	if (usersList.indexOf(user) != -1) {

		ListMessages.push(data);

		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(JSON.stringify({

			response: "sendMessageSuccess"

		}));
		res.end();

	} else {

		res.writeHead(200, {"Content-Type": "text/plain"});
		res.write(JSON.stringify({

			response: "sendMessageFailed",
			error: "you don't authenificated!"
		
		}));
		res.end();

	}

}

function userConnected (user) {

	ListMessages.push('chat:' + user + " >>> connected");

}

module.exports.list = ListMessages;
module.exports.get = getMessages;
module.exports.send = sendMessage;
module.exports.userConnected = userConnected;
module.exports.addNameServer = addNameServer;
