const navOpenBtn = document.querySelector("#nav__open");
const navCloseBtn = document.querySelector("#nav__close");
const sidebarEl = document.querySelector("#sidebar");
const overlayEl = document.querySelector(".overlay");

// SideBar Open and Close Functionality
navOpenBtn.addEventListener("click", function () {
  if (!navOpenBtn.classList.contains("nav__hidden")) {
    navOpenBtn.classList.add("nav__hidden");
    navCloseBtn.classList.remove("nav__hidden");
    sidebarEl.classList.add("show__sidebar");
    overlayEl.classList.add("show__overlay");
  }
});

navCloseBtn.addEventListener("click", function () {
  if (!navCloseBtn.classList.contains("nav__hidden")) {
    closeNavBar();
  }
});

function closeNavBar() {
  navOpenBtn.classList.remove("nav__hidden");
  navCloseBtn.classList.add("nav__hidden");
  sidebarEl.classList.remove("show__sidebar");
  overlayEl.classList.remove("show__overlay");
}

window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth >= 768) {
    closeNavBar();
  }
});
