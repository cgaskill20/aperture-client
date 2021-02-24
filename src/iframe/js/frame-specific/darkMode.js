
var lightMode = true;
var trueBlack = "#111";
var darkBlack = "#414141"
var softBlack = "#171717"
var brightWhite = "#fbfbfb";
var softWhite = "#f1f1f1"
var trueWhite = "#fff"

document.getElementById('nav-dark-mode-button').addEventListener('click', colorModeSwitch);
function colorModeSwitch() {
	var colorMode1 = document.getElementsByClassName("colorMode1");
	var colorMode2 = document.getElementsByClassName("colorMode2");
	var borders = document.getElementsByClassName("border");
	if(lightMode) {
		for(var i = 0; i < colorMode1.length; i++) {
			colorMode1[i].style.backgroundColor=trueBlack;
			colorMode1[i].style.color=softWhite;
		}
		for(var i = 0; i < colorMode2.length; i++) {
			colorMode2[i].style.backgroundColor=softBlack;
			colorMode2[i].style.color=softWhite;
		}
		for(var i = 0; i < borders.length; i++) {
			borders[i].style.border = "1px solid #f1f1f1";
			borders[i].style.borderRadius = "3px";
		}
	}
	else {
		for(var i = 0; i < colorMode1.length; i++) {
			colorMode1[i].style.backgroundColor=brightWhite;
			colorMode1[i].style.color=trueBlack;
		}
		for(var i = 0; i < colorMode2.length; i++) {
			colorMode2[i].style.backgroundColor=trueWhite;
			colorMode2[i].style.color=softBlack;
		}
		for(var i = 0; i < borders.length; i++) {
			borders[i].style.border = "1px solid #777";
			borders[i].style.borderRadius = "3px";
		}
	}

    // var modal_button = document.querySelectorAll("[id='modal-button-id']");
    // for(var i = 0; i < modal_button.length; i++) {
    //   modal_button[i].classList.toggle("btn-outline-dark-dark-mode");
    // }
	var dropdownArrow = document.getElementsByClassName("dropdown-arrow");
	var tooltipIcon = document.getElementsByClassName("tool-tip");
	var graph = document.getElementsByClassName("graph-button-pic");
	var darkModeButton = document.getElementsByClassName("dark-mode-button");
	if(lightMode) {
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

    lightMode = !lightMode;
}
