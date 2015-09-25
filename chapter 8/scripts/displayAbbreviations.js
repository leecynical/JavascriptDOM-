function displayAbbreviations(){
	if(!document.getElementsByTagName || !document.createElement || !document.createTextNode)
		return false;
	var abbreviations = document.getElementsByTagName("abbr");
	if(abbreviations.length < 1) return false;
	var defs = new Array();
	for(var i = 0; i < abbreviations.length; i++){
		var current_abbr = abbreviations[i];
		if(current_abbr.childNodes.length < 1) continue; // 兼容IE 6
		var definition = current_abbr.getAttribute("title");
		var key = current_abbr.lastChild.nodeValue;
		defs[key] = definition;
	}

	var dlist = document.createElement("dl");

	for(key in defs){
		var definition = defs[key];
		var dt = document.createElement("dt");
		var dt_text = document.createTextNode(key);
		dt.appendChild(dt_text);
		var dd = document.createElement("dd");
		var dd_text = document.createTextNode(definition);
		dd.appendChild(dd_text);
		dlist.appendChild(dt);
		dlist.appendChild(dd);
	}
	if(dlist.childNodes.length < 1) return false;
	var header = document.createElement("h2");
	var header_text = document.createTextNode("abbreviations");
	header.appendChild(header_text);
	document.body.appendChild(header);
	document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);