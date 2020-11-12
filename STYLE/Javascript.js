function passWord() {
	var pass = accessCookie("accesscode")
	if (checkCode( pass, "checkCookie") == "TRUE") {
		directProtected();
		return " ";
	} else if (checkCode( pass, "checkCookie") == "LOCKED") {
		alert('LOCKED');
		return " ";
	} else {
		var pass = prompt('Enter Access Code','');
		if (pass == "") {
			location.reload();
		} else if (checkCode( pass, "passWord") == "TRUE") {
			directProtected();
			return " ";
		}
		var pass = prompt('INCORRECT','');
		if (checkCode( pass, "passWord") != "TRUE") {
			createCookie("accesscode", "bfc160483cb0e2c3834a16e02ba45e2995e8f00fdcab3a22505d495ab9ec288b")
			alert('LOCKED');
			return " ";
		}
		if (checkCode( pass, "passWord") == "TRUE") {
			directProtected();
			return " ";
		}
	}
	return " ";
}

function checkCode(string, code){
	switch(code) {
		case "passWord":
			if (SHA256(string) == "05f721989a4f70756a3b8387767affd11c776a0c863f1a22410855e606753321")
				return "TRUE";
			if (SHA256(string) == "bfc160483cb0e2c3834a16e02ba45e2995e8f00fdcab3a22505d495ab9ec288b")
				return "LOCKED";
			break;
		case "checkCookie":
			if (string == "05f721989a4f70756a3b8387767affd11c776a0c863f1a22410855e606753321")
				return "TRUE";
			if (string == "bfc160483cb0e2c3834a16e02ba45e2995e8f00fdcab3a22505d495ab9ec288b")
				return "LOCKED";
			break;
	  default:
		return "FALSE";
	}
	return " ";
}

function directProtected() {
	createCookie("accesscode", "05f721989a4f70756a3b8387767affd11c776a0c863f1a22410855e606753321");
	window.open('https://garrettspage.com/OTHER/PROTECTED/Protected-Hub.html', '_self');
	alert('GRANTED');
}

function createCookie(cookieName,cookieValue)
{
  document.cookie = SHA256(cookieName) + "=" + cookieValue + "; expires=" + new Date(2147483647 * 1000).toUTCString(); + "; path=/; samesite=lax;";
}

function accessCookie(cookieName) {
  var name = SHA256(cookieName) + "=";
  var allCookieArray = document.cookie.split(';');
  for(var i=0; i<allCookieArray.length; i++)
  {
	var temp = allCookieArray[i].trim();
	if (temp.indexOf(name)==0)
	return temp.substring(name.length,temp.length);
  }
	return "";
}