var user = document.getElementsByClassName('show-modal');

var modalClose = document.querySelector('.modal-login__body');

var modalLogin = document.querySelector('.modal-login');
    for(var i=0; i < user.length; ++i) {
        user[i].onclick = function (e) {
            e.preventDefault();
            modalLogin.style = 'display: flex';
        }
    };

var closeBtn = document.querySelector('.modal__close');

closeBtn.onclick = function(e) {
    e.preventDefault();
    modalLogin.style = 'display: none';
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item");
const panes = $$(".tab-pane");


tabs.forEach((tab, index) => {
    const pane = panes[index];
  
    tab.onclick = function () {
      $(".tab-item.active").classList.remove("active");
      $(".tab-pane.active").classList.remove("active");

  
      this.classList.add("active");
      pane.classList.add("active");
    };
  });

const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
    },
  });

    
