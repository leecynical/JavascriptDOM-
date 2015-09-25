function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var placeholder = document.createElement("img");
	placeholder.setAttribute("src", "images/placeholder.gif");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("alt", "my image gallery");
	var description = document.createElement("p");
	description.setAttribute("id", "description");
	var desctext = document.createTextNode("Choose an image");
	description.appendChild(desctext);
	insertAfter(placeholder, gallery);
	insertAfter(description, placeholder);
}

function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var placeholder = document.getElementById("placeholder");
	if(placeholder.nodeName != "IMG") return false; //nodeName?
	var source = whichpic.getAttribute("href");
	placeholder.setAttribute("src", source);
	if(document.getElementById("description")){
		var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
		var description = document.getElementById("description");
		if(description.childNodes[0].nodeType == 3){
			description.childNodes[0].nodeValue = text; // p节点下的文本节点的nodeValue
			//description.firstNode.nodeValue = text; 
		}
		
	}
	return true;
}

function prepareGallery(){
	if(!document.getElementById) return false;
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this) ? false : true;
			//return false;
		}
	}
}

// created by Simon Willison
// deal with onload event with muptiply functions
// func para is function called when page finishing loading

function addLoadEvent(func){
	var oldonload = window.onload;
	if (typeof window.onload != 'function'){
		window.onload = func;
	}else{
		window.onload = function(){
			oldonload();
			func();
		}
	}
}

// insertAfter() is not in the DOM methods
// We can create one using insertBefore and appendChild, which is DOM methods

function insertAfter(newElement, targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);












