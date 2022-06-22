const list_nav = document.querySelectorAll(".navbar-item2");
const list_thucdon = document.querySelectorAll(".thuc_don");
let arrOrder = [];
let arrOrder2 = [];
let arrOrder3 = [];
let arrOrder4 = [];
let arrOrder5 = [];
const data = {
  name: "02 GÀ SỐT CAY + 02 MỲ Ý SỐT BÒ BẰM + 01 KHOAI TÂY CHIÊN VỪA + 2 LY PEPSI VỪA",
  price: 149000,
};
const data2 = {
  name: "03 GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 KHOAI TÂY CHIÊN VỪA + 2 LY PEPSI VỪA",
  price: 139000,
};
const data3 = {
  name: "02 GÀ GIÒN VUI VẺ + 02 MỲ Ý SỐT BÒ BẰM + 01 KHOAI TÂY CHIÊN VỪA + 2 LY PEPSI VỪA",
  price: 139000,
};
const data4 = {
  name: "03 GÀ GIÒN VUI VẺ + 02 MỲ Ý SỐT BÒ BẰM + 01 KHOAI BBQ VỪA + 03 LY PEPSI VỪA",
  price: 179000,
};
const data5 = {
  name: "01 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 NƯỚC NGỌT (VỪA)",
  price: 65000,
};

list_nav.forEach(function (nav_item, index_nav) {
  nav_item.addEventListener("click", function () {
    const currentNavActive = document.querySelector(".thanhmenu_active");
    currentNavActive.classList.remove("thanhmenu_active");
    nav_item.classList.add("thanhmenu_active");
    list_thucdon.forEach(function (thucdon, index_thucdon) {
      thucdon.classList.remove("display_flex");
      if (index_nav == index_thucdon) {
        console.log("index_nav", index_nav, "index_thucdon", index_thucdon);
        thucdon.classList.add("display_flex");
      }
    });
  });
});

let dia_chi = false;

const container_TinhThanh = document.querySelector("#container_TinhThanh");
const button_XacNhan = document.querySelector("#Xac_nhan");
const combo_container = document.querySelector(".combo-container");
const gio_hang = document.querySelector("#order-bar");
const gio_hang2 = document.querySelector("#order-bar2");
const gio_hang2_top=document.querySelector(".order-bar2-top")
const textPrice = document.querySelector(".text_price");
const changeOptions = document.querySelectorAll(".upsize1 .change-options");

const array_select_01 = document.querySelectorAll(".select_01");
const orderList = document.querySelector("#list-order");
const button_datHang = document.querySelector("#click_dathang");
const panel = document.querySelector("#panel_1");
const select_food_1 = document.querySelector("#select_food_1");
const price1 = document.querySelector("#price1");
const btn_confim = document.querySelector("#btn-confim");

const orderList2 = document.querySelector("#list-order2");
const button_datHang2 = document.querySelector("#click_dathang2");
const panel2 = document.querySelector("#panel_2");
const select_food_2 = document.querySelector("#select_food_2");
const price2 = document.querySelector("#price2");
const btn_confim2 = document.querySelector("#btn-confim2");

const orderList3 = document.querySelector("#list-order3");
const button_datHang3 = document.querySelector("#click_dathang3");
const panel3 = document.querySelector("#panel_3");
const select_food_3 = document.querySelector("#select_food_3");
const price3 = document.querySelector("#price3");
const btn_confim3 = document.querySelector("#btn-confim3");

const array_select_02 = document.querySelectorAll(".select_02");
const orderList4 = document.querySelector("#list-order4");
const button_datHang4 = document.querySelector("#click_dathang4");
const panel4 = document.querySelector("#panel_4");
const select_food_4 = document.querySelector("#select_food_4");
const price4 = document.querySelector("#price4");
const btn_confim4 = document.querySelector("#btn-confim4");

const orderList5 = document.querySelector("#list-order5");
const button_datHang5 = document.querySelector("#click_dathang5");
const panel5 = document.querySelector("#panel_5");
const select_food_5 = document.querySelector("#select_food_5");
const price5 = document.querySelector("#price5");
const btn_confim5 = document.querySelector("#btn-confim5");
// const sum_order=document.querySelector("#sum-order")

const createLineOrder = (name, price, number) => {
  const lineOrder = document.createElement("div");
  lineOrder.classList.add("line-order")
  const nameProduct = document.createElement("h4");
  nameProduct.textContent = name;
  const priceProduct = document.createElement("span");
  priceProduct.classList.add("price-product")
  priceProduct.textContent = price;
  // priceProduct.style =
  //   "display:inline-block;width:48%;text-align:left;font-size:16px;";
  const numberProduct = document.createElement("span");
  numberProduct.classList.add("number-product");
  // numberProduct.style =
  //   "display:inline-block;width:48%;text-align:right;font-size:16px;";
  numberProduct.textContent = " x " + number;
  lineOrder.appendChild(nameProduct);
  lineOrder.appendChild(priceProduct);
  lineOrder.appendChild(numberProduct);
  return lineOrder;
};
let total = 0;
button_XacNhan.addEventListener("click", function () {
  dia_chi = true;
  container_TinhThanh.classList.add("hidden");
});

function clickDatHang(
  container_TinhThanh,
  panel,
  selectFoodNumber,
  price,
  button_datHang,
  arraySelect,
  comboContainer
) {
  if (!dia_chi) {
    container_TinhThanh.classList.remove("hidden");
  } else {
    panel.classList.remove("hidden");
    selectFoodNumber.classList.add("show_combo");
    price.classList.add("hidden");
    button_datHang.classList.add("hidden");
    arraySelect.forEach((element) => {
      element.classList.add("hidden");
    });
    selectFoodNumber.classList.remove("hidden");
    selectFoodNumber.style.width = "100%";
    comboContainer.style.flex = "30%";
    // sum_order.textContent="Tổng: "+total+"đ"
  }
}
//luu y orderList
function clickConfim(
  arrOrder,
  orderList,
  data,
  textPrice,
  panel,
  selectFood,
  button_datHang,
  price,
  arraySelect
) {
  //du lieu
  arrOrder.push(data);
  orderList.innerHTML = "";
  if (!gio_hang2.classList.contains("hidden")) {
    const lineOrder = createLineOrder(data.name, data.price, arrOrder.length);
    orderList.prepend(lineOrder);
  }
  total += data.price;
  textPrice.textContent = total + "đ";
  //an hien
  panel.classList.add("hidden");
  // selectFood.classList.remove("show_combo");
  button_datHang.classList.remove("hidden");
  price.classList.remove("hidden");
  arraySelect.forEach((element) => {
    element.classList.remove("hidden");
  });
  selectFood.style = "";
  selectFood.classList.remove("show_combo");
  // sum_order.textContent="Tổng: "+total+"đ"
}
button_datHang.addEventListener("click", () =>
  clickDatHang(
    container_TinhThanh,
    panel,
    select_food_1,
    price1,
    button_datHang,
    array_select_01,
    combo_container
  )
);
button_datHang2.addEventListener("click", () =>
  clickDatHang(
    container_TinhThanh,
    panel2,
    select_food_2,
    price2,
    button_datHang2,
    array_select_01,
    combo_container
  )
);
button_datHang3.addEventListener("click", () =>
  clickDatHang(
    container_TinhThanh,
    panel3,
    select_food_3,
    price3,
    button_datHang3,
    array_select_01,
    combo_container
  )
);
button_datHang4.addEventListener("click", () =>
  clickDatHang(
    container_TinhThanh,
    panel4,
    select_food_4,
    price4,
    button_datHang4,
    array_select_02,
    combo_container
  )
);
button_datHang5.addEventListener("click", () =>
  clickDatHang(
    container_TinhThanh,
    panel5,
    select_food_5,
    price5,
    button_datHang5,
    array_select_02,
    combo_container
  )
);

btn_confim.addEventListener("click", () =>
  clickConfim(
    arrOrder,
    orderList,
    data,
    textPrice,
    panel,
    select_food_1,
    button_datHang,
    price1,
    array_select_01
  )
);
btn_confim2.addEventListener("click", () =>
  clickConfim(
    arrOrder2,
    orderList2,
    data2,
    textPrice,
    panel2,
    select_food_2,
    button_datHang2,
    price2,
    array_select_01
  )
);
btn_confim3.addEventListener("click", () =>
  clickConfim(
    arrOrder3,
    orderList3,
    data3,
    textPrice,
    panel3,
    select_food_3,
    button_datHang3,
    price3,
    array_select_01
  )
);
btn_confim4.addEventListener("click", () =>
  clickConfim(
    arrOrder4,
    orderList4,
    data4,
    textPrice,
    panel4,
    select_food_4,
    button_datHang4,
    price4,
    array_select_02
  )
);
btn_confim5.addEventListener("click", () =>
  clickConfim(
    arrOrder5,
    orderList5,
    data5,
    textPrice,
    panel5,
    select_food_5,
    button_datHang5,
    price5,
    array_select_02
  )
);
gio_hang.addEventListener("click", function () {
  if (arrOrder.length > 0) {
    const lineOrder = createLineOrder(data.name, data.price, arrOrder.length);
    orderList.prepend(lineOrder);
  }
  if (arrOrder2.length > 0) {
    const lineOrder = createLineOrder(
      data2.name,
      data2.price,
      arrOrder2.length
    );
    orderList.prepend(lineOrder);
  }
  if (arrOrder3.length > 0) {
    const lineOrder = createLineOrder(
      data3.name,
      data3.price,
      arrOrder3.length
    );
    orderList.prepend(lineOrder);
  }
  if (arrOrder4.length > 0) {
    const lineOrder = createLineOrder(
      data4.name,
      data4.price,
      arrOrder4.length
    );
    orderList.prepend(lineOrder);
  }
  if (arrOrder5.length > 0) {
    const lineOrder = createLineOrder(
      data5.name,
      data5.price,
      arrOrder5.length
    );
    orderList.prepend(lineOrder);
  }
  gio_hang2.classList.remove("hidden");
  gio_hang.classList.add("hidden");
});

gio_hang2_top.addEventListener("click", function () {
  orderList.innerHTML = "";
  orderList2.innerHTML = "";
  orderList3.innerHTML = "";
  orderList4.innerHTML = "";
  orderList5.innerHTML = "";

  gio_hang2.classList.add("hidden");
  gio_hang.classList.remove("hidden");
});
// changeOptions.forEach(element=>{
//   element.addEventListener("click", function(){

// })
const button_close = document.querySelector("#close");
button_close.addEventListener("click", function () {
  container_TinhThanh.classList.add("hidden");
});

const array_HaNoi = ["Q.Tay Ho", "Q.Dong Da", "Q.Ba Dinh"];
const array_HCM = ["Q.Go Vap", "Q.Tan Binh", "Q.Binh Thanh"];
const gia_tri = document.querySelector(".gia_tri");
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
  gia_tri.classList.remove("hidden");
  console.log("abc");
}
