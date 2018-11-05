function SVGRoad(elem) {
	this.pathLength = elem.getTotalLength();
	this.setStrokeDasharrayInPercent = function () {
		var strokeDasharray = "";
		for (i = 0; i < arguments.length; i++) {
			strokeDasharray += arguments[i] / 100 * this.pathLength + " ";
		}
		elem.style.strokeDasharray = strokeDasharray;
	};

	this.setStrokeDashoffsetInPercent = function (strokeDashoffset) {
		elem.style.strokeDashoffset = strokeDashoffset / 100 * this.pathLength;
	};
}

var pathElem = document.getElementById("path");
var SVGRoadInstance = new SVGRoad(pathElem);

//change the following values
SVGRoadInstance.setStrokeDasharrayInPercent(60);
SVGRoadInstance.setStrokeDashoffsetInPercent(0);



function positionTheDot() {

	// What percentage down the page are we? 
	var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
	// SVGRoadInstance.setStrokeDasharrayInPercent(+scrollPercentage);
	// Get path length
	var path = document.getElementById("path_background");
	var pathLen = path.getTotalLength();

	//change the following values + scroll percent 
	SVGRoadInstance.setStrokeDasharrayInPercent(
		Math.ceil((scrollPercentage * 100 == 0 ? 1 : scrollPercentage * 100))
		, Math.ceil((scrollPercentage * 100 == 0 ? 1 : scrollPercentage * 100)) * 1000
	);

	// SVGRoadInstance.setStrokeDasharrayInPercent(60);
	SVGRoadInstance.setStrokeDashoffsetInPercent(0);


	// Get the position of a point at <scrollPercentage> along the path.
	var pt = path.getPointAtLength(scrollPercentage * pathLen);
	console.log(pt)
	// Position the red dot at this point
	var dot = document.getElementById("dot");
	dot.setAttribute("transform", "translate(" + pt.x + "," + pt.y + ")");
};

// Update dot position when we get a scroll event.
window.addEventListener("scroll", positionTheDot);

// Set the initial position of the dot.
positionTheDot();
