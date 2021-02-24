map.on('click', function () {
    closeNav();
});

document.getElementById('nav-menu-button').addEventListener('click', openNav);
document.getElementById('nav-close-button').addEventListener('click', closeNav);
document.getElementById('nav-graph-button').addEventListener('click', showGraph);

$('#nav-data-exploration-button').on('click', function(e) {
    document.getElementById("sidebar-container").style.display = "grid";
});
$('#nav-modeling-button').on('click', function(e) {
    document.getElementById("sidebar-container").style.display = "none";
});
$('#nav-validation-button').on('click', function(e) {
    document.getElementById("sidebar-container").style.display = "none";
});

function openNav() {
  document.getElementById("sidebar-id").style.width = "52vw";
  document.getElementById("main").style.opacity = "0";
}

function closeNav() {
  document.getElementById("sidebar-id").style.width = "0";
  document.getElementById("main").style.opacity = "1";
}

function showGraph() {
    //FIXME Jean-Marc & Piers, put your graph pop-up JS here
}