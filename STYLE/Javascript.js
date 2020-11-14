/* Procted Access */

function passCode() {
	window.open('https://server.garrettspage.com', '_self');
}

/* Encrypted Cookie Handler */

function createCookie(cookieName,cookieValue)
{
  document.cookie = SHA256(cookieName) + "=" + CryptoJS.AES.encrypt(cookieValue, "garrettspage") + "; expires=" + new Date(2147483647 * 1000).toUTCString(); + "; path=/; samesite=lax;";
}

function accessCookie(cookieName) {
  var name = SHA256(cookieName) + "=";
  var allCookieArray = document.cookie.split(';');
  for(var i=0; i<allCookieArray.length; i++)
  {
	var temp = allCookieArray[i].trim();
	if (temp.indexOf(name)==0)
	return CryptoJS.AES.decrypt(temp.substring(name.length,temp.length), "garrettspage").toString(CryptoJS.enc.Utf8);
  }
	return "";
}