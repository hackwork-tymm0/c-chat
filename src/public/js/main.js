
var authed = false;

function enterKeyboard () {

	if ($("#inputMessage").val().split("=")[1]) {

		var command = $("#inputMessage").val().split("=")[0];
		var arg = $("#inputMessage").val().split("=")[1];

		server.command(command, arg);

		$("#inputMessage").val("");

	} else {

		if (authed === true) {

			var message = $("#inputMessage").val();

			if (message != "") {

				server.send(message);

				$("#inputMessage").val("");

			} else {

				$("#inputMessage").val("");

			}

		} else {

			$("#inputMessage").val("");

			chat.chatMessage("Please, enter username");
			chat.update();

		}

	}

}

function startApp () {

	$(document).ready(function () {

		log.sended();
		log.start();

		server.connect();

		window.onkeyup = function (e) {

			e = e || window.event;

			if (e.keyCode === 13) {

				enterKeyboard();

			}

			return false;

		}

		$(".button").click(function () {

			enterKeyboard();

		});

	});

}

var app = { start: startApp };