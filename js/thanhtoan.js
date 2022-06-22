
const array_HaNoi = ["Q.Tay Ho", "Q.Dong Da", "Q.Ba Dinh"];
const array_HCM = ["Q.Go Vap", "Q.Tan Binh", "Q.Binh Thanh"];

function selectTinh() {
  let Tinh = document.querySelector("#select_Tinh").value;
  console.log(Tinh);
  if (Tinh === "Ha_Noi") {
    const Quan = document.querySelector("#select_Quan");
    Quan.innerHTML = "";
    array_HaNoi.forEach((element) => {
      let option = document.createElement("option");
      option.textContent = element;
      option.value = element;

      Quan.appendChild(option);
    });
  } else {
    const Quan = document.querySelector("#select_Quan");
    Quan.innerHTML = "";
    array_HCM.forEach((element) => {
      let option = document.createElement("option");
      option.textContent = element;
      option.value = element;
      Quan.appendChild(option);
    });
  }
}
function selectQuan() {

}