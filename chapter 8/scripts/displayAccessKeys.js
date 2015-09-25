function displayAccessKeys(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode)
		return false;
	var links = document.getElementsByTagName("a");
	var akeys = new Array();
	for(var i = 0; i < links.length; i++){
		var curr_link = links[i];
		if(!curr_link.getAttribute("accesskey")) continue;
		var key = curr_link.getAttribute("accesskey");
		var text = curr_link.lastChild.nodeValue;
		akeys[key] = text;
	}

	var list = document.createElement("ul");
	for(key in akeys){
		var text = akeys[key];
		var str = key + " : " + text;
		var item = document.createElement("li");
		var item_text = document.createTextNode(str);
		item.appendChild(item_text);
		list.appendChild(item);
	}
	var header = document.createElement("h3");
	var header_text = document.createTextNode("AccessKey");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(list);
}

addLoadEvent(displayAccessKeys);