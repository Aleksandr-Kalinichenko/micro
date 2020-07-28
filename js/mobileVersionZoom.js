function magnify(imgID, zoom) {
	var img, glass, w, h, bw;
	img = document.getElementById(imgID);

	/*створую збільшувальне скло:*/
	glass = document.createElement("DIV");
	glass.setAttribute("class", "img-magnifier-glass");

	/*добавляю збільшувальне скло:*/
	img.parentElement.insertBefore(glass, img);

	/*встановити фонові властивості збільшувального скла:*/
	glass.style.backgroundImage = "url('" + img.src + "')";
	glass.style.backgroundRepeat = "no-repeat";
	glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
	bw = 3;
	w = glass.offsetWidth / 2;
	h = glass.offsetHeight / 2;

	/*виконати функцію, коли хтось переміщує скло лупи над зображенням:*/
	glass.addEventListener("mousemove", moveMagnifier);
	img.addEventListener("mousemove", moveMagnifier);

	/*а також для сенсорних екранів:*/
	glass.addEventListener("touchmove", moveMagnifier);
	img.addEventListener("touchmove", moveMagnifier);
	function moveMagnifier(e) {
		var pos, x, y;
		/*запобігайте будь-яким іншим діям, які можуть статися при переміщенні зображення*/
		e.preventDefault();
		/*отримати позиції курсора x і y:*/
		pos = getCursorPos(e);
		x = pos.x;
		y = pos.y;
		/*запобігайте розміщенню лупи поза зображенням::*/
		if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
		if (x < w / zoom) {x = w / zoom;}
		if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
		if (y < h / zoom) {y = h / zoom;}
		/*встановити положення лупи:*/
		glass.style.left = (x - w) + "px";
		glass.style.top = (y - h) + "px";
		/*відобразити те, що бачить лупа:*/
		glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
	}

	function getCursorPos(e) {
		var a, x = 0, y = 0;
		e = e || window.event;
		/*отримайте позиції x і y зображення:*/
		a = img.getBoundingClientRect();
		/*обчисліть координати курсора x і y відносно зображення:*/
		x = e.pageX - a.left;
		y = e.pageY - a.top;
		/*розглянути будь-яку прокрутку сторінки:*/
		x = x - window.pageXOffset;
		y = y - window.pageYOffset;
		return {x : x, y : y};
	}
}