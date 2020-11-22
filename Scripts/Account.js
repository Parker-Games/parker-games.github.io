var socket = io('https://server.garrettspage.com');
$(document).ready(function(){
	$("#error").hide();
	$("#submit").click(function (e){
		e.preventDefault();
		if ($("#userName").val() == "") {
			$("#error").text("Blank Username");
			$("#error").show();
		}
		socket.emit("acc_send", {
			user: $("#userName").val(),
			pass: $("#passWord").val()
		});
	});
});

socket.on("acc_authed", function(name, other){
	if (name == "link") {
		window.open(other, '_self');
	}
	$("#login").hide();
	alert("Welcome back " + name + ", nice to see you again!");
});

socket.on("acc_invalid", function(){
	alert("Username / Password Invalid, Please try again!");
});

socket.on("acc_disabled", function(){
	alert("Account Disabled!");
});

socket.on("acc_error", function(){
	alert("Error: Please try again!");
});