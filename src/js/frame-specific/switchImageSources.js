let darkMode = true;
function switchImageSources() {
	let dropdownArrow = Array.prototype.slice.call(document.getElementsByClassName("dropdown-arrow"));
	let tooltipIcon = Array.prototype.slice.call(document.getElementsByClassName("tool-tip"));
	let moonIcon = Array.prototype.slice.call(document.getElementsByClassName("moon-icon"));
	if(darkMode) {
		dropdownArrow.forEach(element => element.src="./images/Dropdown_White.png");
		tooltipIcon.forEach(element => element.src="./images/Info_White.png");
		moonIcon.forEach(element => element.src="./images/Moon_White.png");
	}
	else {
		dropdownArrow.forEach(element => element.src="./images/Dropdown_Black.png");
		tooltipIcon.forEach(element => element.src="./images/Info_Black.png");
		moonIcon.forEach(element => element.src="./images/Moon_Black.png");
	}
	darkMode = !darkMode;
}