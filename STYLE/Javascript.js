function passWord() {
	var cookie = accessCookie("accesscode");
	if (cookie == "notpassword") {
		window.open('https://garrettspage.com/OTHER/PROTECTED/Protected-Hub.html', '_self');
		alert('GRANTED');
		return " ";
	} else if (cookie == "locked") {
		alert('LOCKED');
		return " ";
	}
	var pass = prompt('Enter Access Code','');
	if (pass == "") {
		location.reload();
	} else if (pass.toLowerCase() == "notpassword") {
		directProtected();
	}
	var pass = prompt('INCORRECT','');
	if (pass.toLowerCase()!= "notpassword") {
		createCookie("accesscode", "locked")
		alert('LOCKED');
	}
	if (pass.toLowerCase() == "notpassword") {
		directProtected();
	}
	return " ";
}

function directProtected() {
	createCookie("accesscode", "notpassword")
	window.open('https://garrettspage.com/OTHER/PROTECTED/Protected-Hub.html', '_self');
	alert('GRANTED');
}

function createCookie(cookieName,cookieValue)
{
  document.cookie = cookieName + "=" + cookieValue + "; expires=" + new Date(2147483647 * 1000).toUTCString(); + "; domain=garrettspage.com; path=/; secure; samesite=lax;";
}

function accessCookie(cookieName) {
  var name = cookieName + "=";
  var allCookieArray = document.cookie.split(';');
  for(var i=0; i<allCookieArray.length; i++)
  {
	var temp = allCookieArray[i].trim();
	if (temp.indexOf(name)==0)
	return temp.substring(name.length,temp.length);
  }
	return "";
}