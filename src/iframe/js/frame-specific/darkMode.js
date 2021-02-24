
let lightMode = true;

document.getElementById('nav-dark-mode-button').addEventListener('click', colorModeSwitch);
function colorModeSwitch() {
	var darkMode1 = [];
	var darkModeBorder = [];
	var sidebar = document.getElementsByClassName("sidebar");
	var menuColumn = document.getElementsByClassName("menuColumn");
	var majorHeaders = document.getElementsByClassName("vertical-center titleText");
	var minorHeaders = document.getElementsByClassName("menuHeaderLabel");
	var menuHeaders = document.getElementsByClassName("menuHeader");
	var layerSelectors = document.getElementsByClassName("layerSelector");
	var layerConstraints = document.getElementsByClassName("layerConstraints");
	var contentSections = document.getElementsByClassName("content-section");
	darkMode1.push(sidebar);
	darkMode1.push(menuColumn);
	darkMode1.push(majorHeaders);
	darkMode1.push(minorHeaders);
	darkMode1.push(menuHeaders);
	darkMode1.push(layerSelectors);
	darkMode1.push(layerConstraints);
	darkMode1.push(contentSections);
	darkModeBorder.push(layerConstraints);
	darkModeBorder.push(contentSections);
	if(lightMode) {
		for(let outer = 0; outer < darkMode1.length; outer++) {
			for(let inner = 0; inner < darkMode1[outer].length; inner++) {
				darkMode1[outer][inner].style.backgroundColor="#111";
				darkMode1[outer][inner].style.color="#f1f1f1";
			}
		}
		for(let outer = 0; outer < darkModeBorder.length; outer++) {
			for(let inner = 0; inner < darkModeBorder[outer].length; inner++) {
				darkModeBorder[outer][inner].style.border = "1px solid #f1f1f1";
				darkModeBorder[outer][inner].style.borderRadius = "3px";
			}
		}
	}









    // document.getElementById("sidebar-id").classList.toggle("sidebar-dark-mode");
    // document.getElementById("Tract,_County,_&_State_Data").classList.toggle("primary-dark-mode");
    // document.getElementById("Infrastructure_&_Natural_Features").classList.toggle("primary-dark-mode");
    // document.getElementById("Tract,_County,_&_State_DataCounty_Level").classList.toggle("primary-dark-mode");
    // document.getElementById("Tract,_County,_&_State_DataTract_Level").classList.toggle("primary-dark-mode");
    // document.getElementById("Infrastructure_&_Natural_FeaturesAuto_Generated").classList.toggle("primary-dark-mode");

    // var major_headers = document.querySelectorAll("[id='major-header-id']");
    // for(var i = 0; i < major_headers.length; i++) {
    //   major_headers[i].classList.toggle("primary-dark-mode");
    // }
    // var menu_headers = document.querySelectorAll("[id='menu-header-label-id']");
    // for(var i = 0; i < menu_headers.length; i++) {
    //   menu_headers[i].classList.toggle("primary-dark-mode");
    // }
    // var layer_selectors = document.querySelectorAll("[id='layer-selector-id']");
    // for(var i = 0; i < layer_selectors.length; i++) {
    //   layer_selectors[i].classList.toggle("primary-dark-mode");
    // }
    // var data_container = document.querySelectorAll("[id='data-container-id']");
    // for(var i = 0; i < data_container.length; i++) {
    //   data_container[i].classList.toggle("primary-dark-mode-with-border");
    // }
    // var layer_constraints = document.querySelectorAll("[id='layer-constraint-id']");
    // for(var i = 0; i < layer_constraints.length; i++) {
    //   layer_constraints[i].classList.toggle("secondary-dark-mode-with-border");
    // }

    // var dropdown_arrow = document.querySelectorAll("[id='dropdown-arrow-id']");
    // for(var i = 0; i < dropdown_arrow.length; i++) {
    //   if(lightMode) dropdown_arrow[i].src="../../images/Dropdown_White.png";
    //   else dropdown_arrow[i].src="../../images/Dropdown_Black.png";
    // }
    // var tooltip = document.querySelectorAll("[id='tooltip-id']");
    // for(var i = 0; i < tooltip.length; i++) {
    //   if(lightMode) tooltip[i].src="../../images/Info_White.png";
    //   else tooltip[i].src="../../images/Info_Black.png";
    // }
    // var graph = document.querySelectorAll("[id='graph-icon-id']");
    // for(var i = 0; i < graph.length; i++) {
    //   if(lightMode) graph[i].src="../../images/Graph_White.png";
    //   else graph[i].src="../../images/Graph_Black.png";
    // }
    // var dark_mode_icon = document.querySelectorAll("[id='dark-mode-icon-id']");
    // for(var i = 0; i < dark_mode_icon.length; i++) {
    //   if(lightMode) dark_mode_icon[i].src="../../images/Moon.png";
    //   else dark_mode_icon[i].src="../../images/Sun.png";
    // }

    // var modal_button = document.querySelectorAll("[id='modal-button-id']");
    // for(var i = 0; i < modal_button.length; i++) {
    //   modal_button[i].classList.toggle("btn-outline-dark-dark-mode");
    // }

    lightMode = !lightMode;
}
