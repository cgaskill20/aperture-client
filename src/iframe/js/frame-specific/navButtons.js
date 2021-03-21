map.on('click', function () {
    closeNav();
});

document.getElementById('nav-menu-button').addEventListener('click', openNav);
document.getElementById('nav-close-button').addEventListener('click', closeNav);
document.getElementById('nav-data-exploration-button').addEventListener('click', showDataExploration);
document.getElementById('nav-modeling-button').addEventListener('click', showModeling);
// document.getElementById('nav-validation-button').addEventListener('click', showValidation);

function openNav() {
  document.getElementById("sidebar-id").style.width = "52vw";
  document.getElementById("sidebar-id").style.transition = "0.7s";
  document.getElementById("main").style.opacity = "0";
}

function closeNav() {
  document.getElementById("sidebar-id").style.width = "0";
  document.getElementById("sidebar-id").style.transition = "0.7s";
  document.getElementById("main").style.opacity = "1";
}

function showDataExploration() {
    document.getElementById("sidebar-container").style.display = "grid";
    document.getElementById("model-container").style.display = "none";
    document.getElementById("clusterLegendContainer").style.display = "none";
    map.removeLayer(dataModelingGroup)
    map.addLayer(dataExplorationGroup)
}

function showModeling() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "block";
    document.getElementById("clusterLegendContainer").style.display = "block";
    map.addLayer(dataModelingGroup)
    map.removeLayer(dataExplorationGroup)
}

function showValidation() {
    document.getElementById("sidebar-container").style.display = "none";
    document.getElementById("model-container").style.display = "none";
}
