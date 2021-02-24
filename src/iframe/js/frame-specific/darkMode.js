
let lightMode = true;

document.getElementById('nav-dark-mode-button').addEventListener('click', colorModeSwitch);
function colorModeSwitch() {
    document.getElementById("sidebar-id").classList.toggle("sidebar-dark-mode");
    document.getElementById("Tract,_County,_&_State_Data").classList.toggle("primary-dark-mode");
    document.getElementById("Infrastructure_&_Natural_Features").classList.toggle("primary-dark-mode");
    document.getElementById("Tract,_County,_&_State_DataCounty_Level").classList.toggle("primary-dark-mode");
    document.getElementById("Tract,_County,_&_State_DataTract_Level").classList.toggle("primary-dark-mode");
    document.getElementById("Infrastructure_&_Natural_FeaturesAuto_Generated").classList.toggle("primary-dark-mode");
    var major_headers = document.querySelectorAll("[id='major-header-id']");
    for(var i = 0; i < major_headers.length; i++) {
      major_headers[i].classList.toggle("primary-dark-mode");
    }
    var menu_headers = document.querySelectorAll("[id='menu-header-label-id']");
    for(var i = 0; i < menu_headers.length; i++) {
      menu_headers[i].classList.toggle("primary-dark-mode");
    }
    var layer_selectors = document.querySelectorAll("[id='layer-selector-id']");
    for(var i = 0; i < layer_selectors.length; i++) {
      layer_selectors[i].classList.toggle("primary-dark-mode");
    }
    var data_container = document.querySelectorAll("[id='data-container-id']");
    for(var i = 0; i < data_container.length; i++) {
      data_container[i].classList.toggle("primary-dark-mode-with-border");
    }
    var layer_constraints = document.querySelectorAll("[id='layer-constraint-id']");
    for(var i = 0; i < layer_constraints.length; i++) {
      layer_constraints[i].classList.toggle("secondary-dark-mode-with-border");
    }
    var modal_button = document.querySelectorAll("[id='modal-button-id']");
    for(var i = 0; i < modal_button.length; i++) {
      modal_button[i].classList.toggle("btn-outline-dark-dark-mode");
    }
    var dropdown_arrow = document.querySelectorAll("[id='dropdown-arrow-id']");
    for(var i = 0; i < dropdown_arrow.length; i++) {
      if(lightMode) dropdown_arrow[i].src="../../images/Dropdown_White.png";
      else dropdown_arrow[i].src="../../images/Dropdown_Black.png";
    }
    var tooltip = document.querySelectorAll("[id='tooltip-id']");
    for(var i = 0; i < tooltip.length; i++) {
      if(lightMode) tooltip[i].src="../../images/Info_White.png";
      else tooltip[i].src="../../images/Info_Black.png";
    }
    var graph = document.querySelectorAll("[id='graph-icon-id']");
    for(var i = 0; i < graph.length; i++) {
      if(lightMode) graph[i].src="../../images/Graph_White.png";
      else graph[i].src="../../images/Graph_Black.png";
    }
    var dark_mode_icon = document.querySelectorAll("[id='dark-mode-icon-id']");
    for(var i = 0; i < dark_mode_icon.length; i++) {
      if(lightMode) dark_mode_icon[i].src="../../images/Moon.png";
      else dark_mode_icon[i].src="../../images/Sun.png";
    }
    lightMode = !lightMode;
}
