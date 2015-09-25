// 工具方法
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    }else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    }else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    }else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}
//突出当前页面 index.html
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;

    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
// 移动元素，工具方法
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);

    if(elem.movement){
        clearTimeout(elem.movement);
    }

    if (!elem.style.left){
        elem.style.left = "0px";
    }

    if (!elem.style.top){
        elem.style.top = "0px";
    }

    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil( (final_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil( (xpos - final_x) / 10);
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil( (final_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil( (ypos - final_y) / 10);
        ypos -= dist;
    }

    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";

    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";

    elem.movement = setTimeout(repeat, interval);
}
// 幻灯片 index.html
function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = document.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function() {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1){
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1){
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1){
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1){
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}

function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id){
            sections[i].style.display = "none";
        }else{
            sections[i].style.display = "block";
        }
    }
}
//显示点击nav的内容 about.html
function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName("article");
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;

    var links = navs[0].getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if (!document.getElementById(sectionId)) continue;
        links[i].destination = sectionId; //自定义属性，保证showSection执行时调用到sectionId
        links[i].onclick = function() {
            showSection(this.destination);
            return false;
        }
    }
}
// photos.html
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
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

function showPic(whichpic){
    if(!document.getElementById("placeholder")) return false;
    var placeholder = document.getElementById("placeholder");
    if(placeholder.nodeName != "IMG") return false; //nodeName 返回大写字母的值
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
// table中添加odd(偶数行)样式 live.html
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}
// 高亮当前mouseon的行，这里注意调用顺序，先调用addLoadEvent(stripTables),否则oldClassName不等于odd
function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this,"highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}
// 列出abbr
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
    if(dlist.childNodes.length < 1) return false; // 兼容IE 6
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
// label...for contact.html
function focusLabels() {
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            elem.focus();
        }
    }
}
//占位符值
function resetFields(whichform) {
    if (!Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.type == "submit") continue;
        var check = element.placeholder || element.getAttribute("placeholder"); //兼容不同浏览器
        if (!check) continue;
        element.onfocus = function() {
            var text = this.placeholder || this.getAttribute("placeholder");
            if (this.value == text) {
                this.className = "";
                this.value = "";
            }
        }

        element.onblur = function() {
            if (this.value == "") {
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute("placeholder");
            }
        }
        element.onblur();
    }
}

//验证表单
function isFilled(field) {
    if (field.value.replace(" ", "").length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute("placeholder");
    return (field.value != placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") !=-1);
}

function validateForm(whichform) {
    for (var i = 0; i < whichform.elements.length; i++){
        var element = whichform.elements[i];
        if (element.required == "required") {
            if (!isFilled(element)) {
                alert("Please fill in the " + element.name + "field.");
                return false;
            }
        }

        if (element.type == "email") {
            if (!isEmail(element)) {
                alert("The " + element.name + "field must be a valid email address.");
                return false;
            }
        }
        return true;
    }
}

//Ajax 获取XMLHttpRequest对象
function getHTTPObject(){
    if(typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function(){
            try{ return new ActiveXObject("Mircosoft.XMLHTTP");}
            catch(e){}
        }// support IE browser
    return new XMLHttpRequest();
}


function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    var context = document.createElement("img");
    context.setAttribute("src", "images/loading.gif");
    context.setAttribute("alt", "Loading...");
    element.appendChild(context);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for (var i = 0; i < whichform.elements.length; i++) {
        element = whichform.elements[i];
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if (matches.length > 1) {
                    thetarget.innerHTML = matches[1];
                } else{
                    thetarget.innrHTML = "<p>Oops, there was an error. Sorry.</p>";
                }
            } else {
                thetarget.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    };
    request.send(data);
    return true;
}

function prepareForms(){
    for (var i = 0; i < document.forms.length; i++) {
        var thisform = document.forms[i];
        resetFields(thisform);
        thisform.onsubmit = function() {
            if (!validateForm(this)) return false;
            var article = document.getElementsByTagName("article")[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);