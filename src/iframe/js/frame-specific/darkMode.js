
var darkMode = true;

var trueBlack = "#111";
var softBlack = "#181818"
var brightWhite = "#fbfbfb";
var trueWhite = "#fff";
var transitionTime = "0.3s";
var realBorderRadius = "3px";

document.getElementById('nav-dark-mode-button').addEventListener('click', colorModeSwitch);
function colorModeSwitch() {
	var colorMode1 = document.getElementsByClassName("colorMode1");
	var colorMode2 = document.getElementsByClassName("colorMode2");
	var borders = document.getElementsByClassName("border");
	if(darkMode) {
		for(var i = 0; i < colorMode1.length; i++) {
			colorMode1[i].style.backgroundColor=trueBlack;
			colorMode1[i].style.color=trueWhite;
			colorMode1[i].style.transition=transitionTime;
		}
		for(var i = 0; i < colorMode2.length; i++) {
			colorMode2[i].style.backgroundColor=softBlack;
			colorMode2[i].style.color=trueWhite;
			colorMode2[i].style.transition=transitionTime;
		}
		for(var i = 0; i < borders.length; i++) {
			borders[i].style.border = "1px solid #f1f1f1";
			borders[i].style.borderRadius = realBorderRadius;
		}
	}
	else {
		for(var i = 0; i < colorMode1.length; i++) {
			colorMode1[i].style.backgroundColor=brightWhite;
			colorMode1[i].style.color=trueBlack;
			colorMode1[i].style.transition=transitionTime;
		}
		for(var i = 0; i < colorMode2.length; i++) {
			colorMode2[i].style.backgroundColor=trueWhite;
			colorMode2[i].style.color=softBlack;
			colorMode2[i].style.transition=transitionTime;
		}
		for(var i = 0; i < borders.length; i++) {
			borders[i].style.border = "1px solid #777";
			borders[i].style.borderRadius = realBorderRadius;
		}
	}

	var darkButtons = document.getElementsByClassName("btn-outline-dark");
	if(darkMode) {
		for(var i = 0; i < darkButtons.length; i++) {
			darkButtons[i].style.color="#f8f9fa";
			darkButtons[i].style.backgroundColor="transparent";
			darkButtons[i].style.backgroundImage="none";
			darkButtons[i].style.borderColor="#f8f9fa";
			// darkButtons[i].style:hover.color="#212529";
			// darkButtons[i].style:hover.backgroundColor="#f8f9fa";
			// darkButtons[i].style:hover.borderColor="#f8f9fa";
		}
	}
	else {
		for(var i = 0; i < darkButtons.length; i++) {
			darkButtons[i].style.color="#343a40";
			darkButtons[i].style.backgroundColor="transparent";
			darkButtons[i].style.backgroundImage="none";
			darkButtons[i].style.borderColor="#343a40";
			// darkButtons[i].style:hover.color="#fff";
			// darkButtons[i].style:hover.backgroundColor="#343a40";
			// darkButtons[i].style:hover.borderColor="#343a40";
		}
	}

	var dropdownArrow = document.getElementsByClassName("dropdown-arrow");
	var tooltipIcon = document.getElementsByClassName("tool-tip");
	var graph = document.getElementsByClassName("graph-button-pic");
	var darkModeButton = document.getElementsByClassName("dark-mode-button");
	if(darkMode) {
		for(var i = 0; i < dropdownArrow.length; i++) {
	 		dropdownArrow[i].src="../../images/Dropdown_White.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_White.png";
		}
		for(var i = 0; i < graph.length; i++) {
			graph[i].src="../../images/Graph_White.png";
		}
		for(var i = 0; i < darkModeButton.length; i++) {
			darkModeButton[i].src="../../images/Moon.png";
		}
	}
	else {
		for(var i = 0; i < dropdownArrow.length; i++) {
			dropdownArrow[i].src="../../images/Dropdown_Black.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_Black.png";
		}
		for(var i = 0; i < graph.length; i++) {
			graph[i].src="../../images/Graph_Black.png";
		}
		for(var i = 0; i < darkModeButton.length; i++) {
			darkModeButton[i].src="../../images/Sun.png";
		}
	}

    darkMode = !darkMode;
}
