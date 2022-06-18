const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const captacha = $(".captacha");
  // var captacha = document.querySelector.bind(".captacha");

let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                     'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                     'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                     't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


function getCaptcha(){
  for (let i = 0; i < 6; i++) {
    let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
    captacha.innerText += ` ${randomCharacter}`;
  }
}
getCaptcha();

captacha.addEventListener("click", ()=>{
    removeCapcha();
    getCaptcha();
});

function removeCapcha() {
    captacha.innerText = "";
}