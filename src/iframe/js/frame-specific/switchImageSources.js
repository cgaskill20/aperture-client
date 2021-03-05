var darkMode = true;
function switchImageSources() {
	var dropdownArrow = document.getElementsByClassName("dropdown-arrow");
	var tooltipIcon = document.getElementsByClassName("tool-tip");
	var moonIcon = document.getElementsByClassName("moon-icon");
	if(darkMode) {
		for(var i = 0; i < dropdownArrow.length; i++) {
	 		dropdownArrow[i].src="../../images/Dropdown_White.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_White.png";
		}
		for(var i = 0; i < moonIcon.length; i++) {
			moonIcon[i].src="../../images/Moon_White.png";
		}
	}
	else {
		for(var i = 0; i < dropdownArrow.length; i++) {
			dropdownArrow[i].src="../../images/Dropdown_Black.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_Black.png";
		}
		for(var i = 0; i < moonIcon.length; i++) {
			moonIcon[i].src="../../images/Moon_Black.png";
		}
	}
	darkMode = !darkMode;
}