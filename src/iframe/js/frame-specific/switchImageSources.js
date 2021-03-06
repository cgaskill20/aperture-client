let darkMode = true;
function switchImageSources() {
	let dropdownArrow = document.getElementsByClassName("dropdown-arrow");
	let tooltipIcon = document.getElementsByClassName("tool-tip");
	let moonIcon = document.getElementsByClassName("moon-icon");
	if(darkMode) {
		// dropdownArrow.forEach(element => element.src="../../images/Dropdown_White.png");
		for(let i = 0; i < dropdownArrow.length; i++) {
	 		dropdownArrow[i].src="../../images/Dropdown_White.png";
		}
		for(let i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_White.png";
		}
		for(let i = 0; i < moonIcon.length; i++) {
			moonIcon[i].src="../../images/Moon_White.png";
		}
	}
	else {
		for(let i = 0; i < dropdownArrow.length; i++) {
			dropdownArrow[i].src="../../images/Dropdown_Black.png";
		}
		for(let i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_Black.png";
		}
		for(let i = 0; i < moonIcon.length; i++) {
			moonIcon[i].src="../../images/Moon_Black.png";
		}
	}
	darkMode = !darkMode;
}