/* Procted Access */

function passCode() {
	var code = accessCookie("accesscode");
	if (code != "") {
		if (code == "LOCKED") {
			alert('LOCKED');
			return " ";
		}
		var pass = deCode(code)
		alert(pass);
		if (validURL(pass)) {
			window.open(pass, '_self');
			alert('GRANTED');
			return " ";
		}
	}else {
		var code = prompt('Enter Access Code','');
		var pass = deCode(code);
		if (code == "") {
			return;
		}
		if (validURL(pass)) {
			createCookie("accesscode", code)
			window.open(pass, '_self');
			alert('GRANTED');
			return;
		}
		var code = prompt('INCORRECT','');
		var pass = deCode(code);
		if (validURL(pass)) {
			createCookie("accesscode", code)
			window.open(pass, '_self');
			alert('GRANTED');
			return;
		} else {
			createCookie("accesscode", "LOCKED")
			alert('LOCKED');
			return;
		}
	}
	return;
}

/* PROTECTED LINK U2FsdGVkX1+TIzQZ24AOi2t/mxZAwlTUpVNBCj4q/YxUGePN8oPiw51OMNpP1fBVlOPB5KmOwehmRvPFcL/xM1X+dUAery6VFzaIS7Vq72Y=
	LOCKED */

function deCode(code){
	var secret = "U2FsdGVkX1+TIzQZ24AOi2t/mxZAwlTUpVNBCj4q/YxUGePN8oPiw51OMNpP1fBVlOPB5KmOwehmRvPFcL/xM1X+dUAery6VFzaIS7Vq72Y=";
	var decode = CryptoJS.AES.decrypt(secret, code).toString(CryptoJS.enc.Utf8);
	return decode;
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
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