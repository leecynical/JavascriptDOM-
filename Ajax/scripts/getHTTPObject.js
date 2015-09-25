function getHTTPObject(){
	if(typeof XMLHttpRequest == "undefined")
		XMLHttpRequest = function(){
			try{ return new ActiveXObject("Mircosoft.XMLHTTP");}
			catch(e){}
		}// support IE browser
		return new XMLHttpRequest();
}
