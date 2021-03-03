
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

var darkMode = true;

function switchTheme(e) {

	document.getElementById("sidebar-id").style.transition = "0.3s";

	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
	}

	var dropdownArrow = document.getElementsByClassName("dropdown-arrow");
	var tooltipIcon = document.getElementsByClassName("tool-tip");
	var graphIcon = document.getElementsByClassName("graph-button-pic");
	if(darkMode) {
		for(var i = 0; i < dropdownArrow.length; i++) {
	 		dropdownArrow[i].src="../../images/Dropdown_White.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_White.png";
		}
		for(var i = 0; i < graphIcon.length; i++) {
			graphIcon[i].src="../../images/Graph_White.png";
		}
	}
	else {
		for(var i = 0; i < dropdownArrow.length; i++) {
			dropdownArrow[i].src="../../images/Dropdown_Black.png";
		}
		for(var i = 0; i < tooltipIcon.length; i++) {
			tooltipIcon[i].src="../../images/Info_Black.png";
		}
		for(var i = 0; i < graphIcon.length; i++) {
			graphIcon[i].src="../../images/Graph_Black.png";
		}
	}

	darkMode = !darkMode;
}

toggleSwitch.addEventListener('change', switchTheme, false);
