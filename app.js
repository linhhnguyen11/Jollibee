var user = document.getElementsByClassName('show-modal');

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
    modalLogin.style = 'display: none'
}

const swiper = new Swiper('.swiper', {
    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true, 
    },
  });

    