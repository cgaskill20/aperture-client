import { switchImageSources } from "./switchImageSources";

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
function switchTheme(e) {
	document.getElementById("sidebar-id").style.transition = "0.3s";

	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
	}

	switchImageSources();

    if (window.chartSystem) {
        window.chartSystem.update()
    }
}
toggleSwitch.addEventListener('change', switchTheme, false);
