const list_nav = document.querySelectorAll(".navbar-item2");
const list_thucdon = document.querySelectorAll(".thuc_don");

list_nav.forEach(function (nav_item, index_nav) {
  nav_item.addEventListener("click", function () {
    const currentNavActive = document.querySelector(".thanhmenu_active");
    currentNavActive.classList.remove("thanhmenu_active");
    nav_item.classList.add("thanhmenu_active");
    list_thucdon.forEach(function (thucdon, index_thucdon) {
      thucdon.classList.remove("display_flex");
      if (index_nav == index_thucdon) {
        console.log("index_nav", index_nav,"index_thucdon", index_thucdon)
        thucdon.classList.add("display_flex");
      }
    });
  });
});