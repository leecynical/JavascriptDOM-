function convertToGS(img) {
	if (!Modernizr.canvas) return;
	// 储存原始彩色版
	img.color = img.src;
	// 创建灰度版
	img.grayscale = createGSCanvas(img);
	
	img.onmouseover = function() {
		this.src = this.color;
	}
	
	img.onmouseout = function() {
		this.src = this.grayscale;
	}
	
	img.onmouseout(); //set the stating point -- grayscale
}

function createGSCanvas(img) {
	var canvas = document.createElement("canvas");
	canvas.height = img.height;
	canvas.width = img.width;
	
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	// http://tutorials.jenkov.com/html5-canvas/pixels.html;
	// 其中计算灰度公式为 gray color = 0.299 × red color + 0.578 × green color + 0.114 * blue color
	var c = ctx.getImageData(0, 0, img.width, img.height);
	for(var x = 0; x < c.width; x++){
		for(var y = 0; y < c.height; y++){
			var index = (x + y * c.width) * 4
			var r = c.data[index];
			var g = c.data[index + 1];
			var b = c.data[index + 2];
			var gray = .299 * r + .587 * g + .114 * b;  

			c.data[index + 0] = gray; // Red channel    
            c.data[index + 1] = gray; // Green channel    
            c.data[index + 2] = gray; // Blue channel    
            c.data[index + 3] = 255; // Alpha channel    
		}
	}
	
	ctx.putImageData(c, 0,0,0,0, c.width, c.height);
	// console.log(canvas.toDataURL());
	return canvas.toDataURL();
}

window.onload = function() {
	convertToGS(document.getElementById("avatar"));
}