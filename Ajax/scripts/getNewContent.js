function getNewContent(){
	var request = new getHTTPObject();
	if(request){
		request.open("GET", "example.txt", true);
		request.onreadystatechange = function(){
			if(request.readyState == 4){
				var para = document.createElement("p");
				var txt = document.createTextNode(request.responseText);
				para.appendChild(txt);
				document.getElementById("new").appendChild(para);
			}
		};
		request.send(null);
	}else{
		alert("Sorry, your browsers doesn\'t support XMLHttpRequest");
	}
	//alert("Function Done");
}

addLoadEvent(getNewContent);