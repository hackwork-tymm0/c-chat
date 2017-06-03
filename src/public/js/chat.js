
var messages = [];

function updateChat () {

	if (messages.length >= 23) {

		var toDelete = messages.length - 23;

		for (var i = 0; i <= toDelete; i++) {

			arrayShift(messages);

		}

	}

	$(".chat").html("");

	for (var i = 0; i <= messages.length; i++) {

		$(".chat").append(messages[i]);

	}

}

function arrayShift (array) {

	var i=0, first_elm=null, cnt=0, tmp_arr = {};

	if( !array || (array.constructor !== Array && array.constructor !== Object) || !array.length ){
	
		return null;
	
	}

	if( array.constructor === Array ){
	
		first_elm = array[0];
	
		for( i = 0; i < array.length; i++ ){
	
			array[i] = array[i+1];
	
		}
	
		array.length--;
	
	} else if( array.constructor === Object ){
	
		for(var key in array){
	
			if( cnt == 0 ){
			
				first_elm = array[key];

			} else {
			
				tmp_arr[key] = array[key];
			}
			
			cnt ++;
	
		}
	
		array = tmp_arr;
	
	}

	return first_elm;

}

function cleanChat () {

	messages = [];

}

function addChatMessage (text = "") {

	messages.push("<div id='message' class='chatMessage'><pre> " + text + "</pre></div>");

}

function addUserMessage (user, usrMessage) {

	messages.push("<div id='message' class='userMessage'><pre> <b>" + user + " >>></b> " + usrMessage + " </pre></div>");

}

function addErrorMessage (error) {

	messages.push("<div id='message' class='errorMessage'><pre> <b>ERROR:</b> " + error + "</pre> </div>");

}

function startChat () {

	addChatMessage("");
	addChatMessage("	CChat");
	addChatMessage("");
	addChatMessage("=======================================");
	addChatMessage("");
	addChatMessage("		Enter \"username=%YOUR_USERNAME%\" to select username.");
	updateChat();

}

function testChat (number) {

	for (var i = 0; i <= number; i++) {

		addChatMessage("TEST CHAT!!!");
	
	}

	updateChat();

}

var chat = {
	start: startChat,
	chatMessage: addChatMessage,
	userMessage: addUserMessage,
	errorMessage: addErrorMessage,
	test: testChat,
	update: updateChat,
	clean: cleanChat
};
