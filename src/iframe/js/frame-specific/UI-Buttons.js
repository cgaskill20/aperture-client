map.on('click', function () {
    closeNav();
});

document.getElementById('nav-menu-button').addEventListener('click', openNav);
document.getElementById('nav-close-button').addEventListener('click', closeNav);

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
  document.getElementById("sidebar-id").style.transition = "0.7s";
  document.getElementById("main").style.opacity = "0";
}

function closeNav() {
  document.getElementById("sidebar-id").style.width = "0";
  document.getElementById("sidebar-id").style.transition = "0.7s";
  document.getElementById("main").style.opacity = "1";
}
