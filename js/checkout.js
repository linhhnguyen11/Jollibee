let cityInput = document.querySelector("#city");
let districtInput = document.querySelector("#district");
let wardInput = document.querySelector("#ward");
let addresseInput = document.querySelector("#address");
let formEntered;
let isFormValid;

let cartData = {
  items: [
    {
      id: 1,
      title: "1 MIẾNG GÀ GIÒN VUI VẺ + 1 COMBO GÀ GIÒN VUI VẺ",
      img: "./img/1_mi_ng_ggvv_png_1.png",
      amount: 2,
      price: 66000,
    },
    {
      id: 1,
      title: "1 MIẾNG GÀ GIÒN VUI VẺ + 1 COMBO GÀ GIÒN VUI VẺ",
      img: "./img/1_mi_ng_ggvv_png_1.png",
      amount: 2,
      price: 66000,
    },
  ],
  deliver: 15000,
  discount: 0,
  coupon: 0,
  totalPrice: 120000,
};
function Validator(option) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  var selectorRules = {};

  function validate(inputElement, rule) {
    var errorMessage;
    var errorElement = getParent(
      inputElement,
      option.formGroupSlector
    ).querySelector(option.errorSlector);
    //Lấy ra các rule của selector
    var rules = selectorRules[rule.selector];

    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case "radio":
        case "checkbox":
          errorMessage = rules[i](
            formElement.querySelector(rule.selector + ":checked")
          );
        default:
          errorMessage = rules[i](inputElement.value);
      }
      if (errorMessage) break;
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      getParent(inputElement, option.formGroupSlector).classList.add("invalid");
    } else {
      errorElement.innerText = "";
      getParent(inputElement, option.formGroupSlector).classList.remove(
        "invalid"
      );
    }

    return !errorMessage;
  }

  var formElement = document.querySelector(option.form);

  if (formElement) {
    formElement.onsubmit = function (event) {
      event.preventDefault();
      isFormValid = true;

      option.rule.forEach(function (rule) {
        var inputElement = formElement.querySelector(rule.selector);
        var idValid = validate(inputElement, rule);
        if (!idValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof option.onSubmit === "function") {
          var enableInputs = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );

          var formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            // console.log(values);
            // console.log(input);

            switch (input.type) {
              case "radio":
              case "checkbox":
                values[input.name] = formElement.querySelector(
                  'input[name=" ' + input.name + '"]:checked'
                ).value;
                break;

              default:
                values[input.name] = input.value;
            }

            return values;
          },
          {});

          option.onSubmit(formValues);
        }
      } else {
        console.log("có lỗi");
      }
    };

    //Lặp qua mỗi rule và xử lý lắng nghe sự kiện
    option.rule.forEach(function (rule) {
      //Lưu lại các rules cho mỗi input
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test);
      } else {
        selectorRules[rule.selector] = [rule.test];
      }

      var inputElements = formElement.querySelectorAll(rule.selector);

      Array.from(inputElements).forEach(function (inputElement) {
        if (inputElement) {
          inputElement.onblur = function () {
            validate(inputElement, rule);
          };

          inputElement.oninput = function () {
            var errorElement = getParent(
              inputElement,
              option.formGroupSlector
            ).querySelector(".form-message");
            errorElement.innerText = "";
            getParent(inputElement, option.formGroupSlector).classList.remove(
              "invalid"
            );
          };
        }
      });
    });
  }
}

//Định nghĩa Rule

Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || "Trường này không được để trống";
    },
  };
};

Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      return regex.test(value)
        ? undefined
        : message || "Email không đúng định dạng";
    },
  };
};

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min
        ? undefined
        : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};

Validator.isConfirm = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập vào không chính xác";
    },
  };
};

Validator.isPhone = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      return regex.test(value)
        ? undefined
        : message || "Số điện thoại không đúng định dạng";
    },
  };
};
// const fieldname = "name";
// const fieldage = "age";
// const fieldaddress = "address";
// function arrToObj(arr) {
//   return arr.reduce((obj, cur) => {
//     obj[cur[0]] = cur[1];
//     console.log(obj);
//     return obj;
//   }, {});
// }
// const obj1 = arrToObj([
//   ["name", "Son Dang"],
//   ["age", 21],
//   ["address", "Ha Noi"],
// ]);
// console.log(obj1);

Validator({
  form: "#form-1",
  formGroupSlector: ".form-group",
  errorSlector: ".form-message",
  rule: [
    Validator.isRequired("#fullname", "Vui lòng nhập tên đầy đủ của bạn"),
    Validator.isRequired("#email"),
    Validator.isRequired("#phone"),
    Validator.isEmail("#email"),
    Validator.isPhone("#phone"),
  ],
  onSubmit: function (data) {
    if (isFormValid) {
      overplays.style.visibility = "hidden";
    }
    formEntered = data;
    userData = {
      ...formEntered,
      note: "",
      transport: true,
      pay: true,
      cart: {
        items: [],
        deliver: 0,
        discount: 0,
        coupon: 0,
        totalPrice: 0,
      },
    };
    checkUser(userData);
  },
});

////////////////////////////////////////////////////////////////
const city = [];
let districts = [];
let ward = [];
const fetchCitys = async () => {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/?depth=3");
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const data = await response.json();

    for (const key in data) {
      city.push({
        id: key,
        name: data[key].name,
        district: data[key].districts,
      });
    }
  } catch (e) {}
};
fetchCitys();

////////////////////////////////////////////////////////////////
let isSelected = false;
let citySelected;
const renderListDown = (items, title) => {
  if (document.querySelector(".dropdown-list")) {
    document.querySelector(".dropdown-list").remove();
    return;
  } else {
    const html = `<div class="dropdown-list">
  ${items
    .map((item) => {
      return `<div class="dropdown-list__item" data-id=${item.id}>${item.name}</div>`;
    })
    .join("")}
</div>`;
    const el = document.querySelector(`.dropdown-selected__${title}`);
    el.parentElement.insertAdjacentHTML("afterbegin", html);
  }
};

const dropdownCity = document.querySelector(".dropdown-selected__citys");
const dropdownDistrict = document.querySelector(
  ".dropdown-selected__districts"
);
const dropdownWard = document.querySelector(".dropdown-selected__ward");

dropdownDistrict.parentElement.classList.add("disabled");
dropdownWard.parentElement.classList.add("disabled");
////////////////////////////////////////////////////////////////
dropdownCity.addEventListener("click", (e) => {
  e.preventDefault();
  renderListDown(city, "citys");
  setCity();
});
const setCity = () => {
  document
    .querySelector(".dropdown-list")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains("dropdown-list__item")) {
        cityInput.value = e.target.innerText;
        let districtsRaw = city[e.target.getAttribute("data-id")].district;
        districts = [];
        for (const key in districtsRaw) {
          districts.push({
            id: key,
            name: districtsRaw[key].name,
            wards: districtsRaw[key].wards,
          });
        }
        document.querySelector(".dropdown-list").remove();
        dropdownDistrict.parentElement.classList.remove("disabled");
      }
    });
};
////////////////////////////////////////////////////////////////
dropdownDistrict.addEventListener("click", (e) => {
  e.preventDefault();
  renderListDown(districts, "districts");
  setDistrict(districts);
});

const setDistrict = (values) => {
  document
    .querySelector(".dropdown-list")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains("dropdown-list__item")) {
        districtInput.value = e.target.innerText;
        ward = values[e.target.getAttribute("data-id")].wards;
        // selectedWard(ward);
      }
      document.querySelector(".dropdown-list").remove();
      dropdownWard.parentElement.classList.remove("disabled");
    });
};
////////////////////////////////////////////////////////////////
dropdownWard.addEventListener("click", (e) => {
  e.preventDefault();
  renderListDown(ward, "ward");
  setWard();
});
const setWard = () => {
  document
    .querySelector(".dropdown-list")
    .addEventListener("click", function (e) {
      e.preventDefault();

      // Matching strategy
      if (e.target.classList.contains("dropdown-list__item")) {
        wardInput.value = e.target.innerText;
      }
      document.querySelector(".dropdown-list").remove();
    });
};

////////////////////////////////////////////////////////////////////////////////

const showUserForm = document.querySelector(".showForm");
const btnShowForm = document.querySelector(".btn-show-form");
const overplays = document.querySelector(".overplays");
const btnClose = document.querySelector(".btn-cancel");
const btnAccept = document.querySelector(".btn-accept");
showUserForm.addEventListener("click", (e) => {
  e.preventDefault();
  overplays.style.visibility = "visible";
});
btnShowForm.addEventListener("click", (e) => {
  e.preventDefault();
  overplays.style.visibility = "visible";
});
// btnAccept.addEventListener("click", (e) => {

// });

btnClose.addEventListener("click", (e) => {
  e.preventDefault();
  overplays.style.visibility = "hidden";
});

document.querySelector(".backdrop").addEventListener("click", (e) => {
  e.preventDefault();
  overplays.style.visibility = "hidden";
});

////////////////////////////////////////////////////////////////
let userData = {
  fullname: "",
  email: "",
  sdt: "",
  city: "",
  district: "",
  ward: "",
  address: "",
  note: "",
  transport: true,
  pay: true,
  cart: {
    items: [],
    deliver: 0,
    discount: 0,
    coupon: 0,
    totalPrice: 0,
  },
};
const checkUser = (userData) => {
  if (userData.fullname === "") {
    const a = document.querySelector(".show-form");
    a.style.display = "block";
  } else {
    const a = document.querySelector(".show-form");
    a.style.display = "none";
    const htmlUser = `<div class="info-user">
    <p class="user-name">${userData.fullname}</p>
    <p class="user-phone">Số điện thoại: ${userData.phone}</p>
    <p class="user-address">${userData.address}, ${userData.ward} ${userData.district} ${userData.city}</p>
  </div>`;
    document
      .querySelector(".user__login")
      .insertAdjacentHTML("afterend", htmlUser);
  }
};

checkUser(userData);
////////////////////////////////
const radioBtn = document.querySelectorAll('input[name="deliver"]');
radioBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.value === "1") {
      removeDeliver();
      renderDeliver(0);
      cartData.deliver = 0;
      removeTotal();
      renderTotal(
        cartData.totalPrice -
          cartData.coupon +
          cartData.deliver -
          cartData.discount
      );
      document.querySelector(".selected-group").style.display = "block";
    } else {
      removeDeliver();
      renderDeliver(15000);
      cartData.deliver = 15000;
      removeTotal();
      renderTotal(
        cartData.totalPrice -
          cartData.coupon +
          cartData.deliver -
          cartData.discount
      );
      document.querySelector(".selected-group").style.display = "none";
    }
  });
});
////////////////////////////////////////////////////
var storeStateInfo = {
  HN: {
    name: "Hà Nội",
    store: [
      "Số 12, Phường Trung Kính, Quận Đống Đa",
      "Số 22, Phường Trung Liệt, Quận Đống Đa",
      "Số 122, Chùa Bộc, Quận Đống Đa",
      "Số 32, Phường Khương Trunh, Quận Đống Đa",
      "Số 44, Thái Hà, Quận Đống Đa",
    ],
  },
  TPHCM: {
    name: "Thành Phố Hồ Chí Minh",
    store: [
      "Số 12, Phường Bình Chiểu, Quận 1",
      "Số 22, Phường Bình Chánh, Quận 3",
      "Số 122, Linh Đông, Quận 5",
      "Số 32, Phường Tam Phú, Quận 6",
      "Số 44, Trường Thọ, Quận 8",
    ],
  },
};

const citySelection = document.querySelector("#cityStore");
const storeSelection = document.querySelector("#store");
storeSelection.disabled = true;
for (let city in storeStateInfo) {
  console.log(storeStateInfo[city]);
  citySelection.options[citySelection.options.length] = new Option(
    storeStateInfo[city].name,
    city
  );
}
citySelection.onchange = (e) => {
  storeSelection.disabled = false;
  // todo: Clear all options from State Selection
  storeSelection.length = 1; // remove all options bar first
  // if (e.target.selectedIndex < 1) return; // done
  let stores = storeStateInfo[e.target.value].store;
  // todo: Load states by looping over countryStateInfo
  for (let i = 0; i < stores.length; i++) {
    storeSelection.options[storeSelection.options.length] = new Option(
      stores[i],
      stores[i]
    );
  }
};

////////////////////////////////////////////////////////////////////////
window.onload = () => {
  renderCart();
  renderTotalRaw(cartData.totalPrice);
  renderDeliver(cartData.deliver);
  renderTotal(
    cartData.totalPrice - cartData.coupon + cartData.deliver - cartData.discount
  );
};

const renderCart = () => {
  const htmlCart = cartData.items
    .map((item) => {
      return `<div class="order-item">
    <div class="wrapper-img">
      <img src=${item.img} alt="" />
    </div>
    <div class="item-description">
      <h3>${item.title}</h3>
      <div class="item-description-quality">
        <h4>x${item.amount}</h4>
        <h4>+${item.price.toLocaleString("vi-VN")}đ</h4>
      </div>
    </div>
  </div>`;
    })
    .join("\n");
  document
    .querySelector(".order-items")
    .insertAdjacentHTML("afterbegin", htmlCart);
};
const renderTotalRaw = (value) => {
  const htmlTotalRaw = `<h4>${value.toLocaleString("vi-VN")}đ</h4>`;
  document
    .querySelector(".temporarycost")
    .insertAdjacentHTML("beforeend", htmlTotalRaw);
};

const renderDeliver = (value) => {
  const htmlDeliver = `<h4 class="deliver-price">${value.toLocaleString(
    "vi-VN"
  )}đ</h4>`;
  document
    .querySelector(".delivercost")
    .insertAdjacentHTML("beforeend", htmlDeliver);
};

const removeDeliver = () => {
  document.querySelector(".deliver-price").remove();
};

const renderTotal = (value) => {
  const htmlTotal = `<h3 class="total-value" style="color: #e31837">${value.toLocaleString(
    "vi-VN"
  )}đ</h3>`;
  document
    .querySelector(".totalPrice")
    .insertAdjacentHTML("beforeend", htmlTotal);
};

const removeTotal = () => {
  document.querySelector(".total-value").remove();
};

const renderCoupon = (value) => {
  const htmlCoupon = `<div style="display: flex; justify-content: space-between">
  <h5 style="font-size: 14px; margin: 8px 0 0 0">Coupon:</h5>
  <h5 style="font-size: 14px; margin: 8px 0 0 0">${value.toLocaleString(
    "vi-VN"
  )}đ</h5>
</div>`;
  document.querySelector(".coupon").insertAdjacentHTML("beforeend", htmlCoupon);
};

const removeCoupon = () => {
  cartData.coupon = 0;
  inputCoupon.value = "";
  removeTotal();
  renderTotal(
    cartData.totalPrice - cartData.coupon + cartData.deliver - cartData.discount
  );
  document.querySelector(".description-coupon").remove();
};

const removeVoucher = () => {
  cartData.discount = 0;
  inputVoucher.value = "";
  removeTotal();
  renderTotal(
    cartData.totalPrice - cartData.coupon + cartData.deliver - cartData.discount
  );
  document.querySelector(".description-voucher").remove();
};
const renderVoucher = (value) => {
  const htmlCouvher = `
  <div class="decription description-voucher">
    <div style="display: flex; justify-content: space-between">
        <h5 style="font-size: 14px; margin: 0">Voucher:</h5>
        <h5 style="font-size: 14px; margin: 0">${value.toLocaleString(
          "vi-VN"
        )}đ</h5>
    </div>
    <div class="close-voucher" onClick="removeVoucher()">
        <i class="fas fa-times"></i>
    </div>
</div>`;
  document
    .querySelector(".voucher")
    .insertAdjacentHTML("beforeend", htmlCouvher);
};
////////////////////////////////////////////////////////////////////////
const btnVoucher = document.querySelector(".btn-voucher");
const btnCoupon = document.querySelector(".btn-coupon");
const inputVoucher = document.querySelector(".enteredVoucher");
const inputCoupon = document.querySelector(".enteredCoupon");

btnVoucher.addEventListener("click", () => {
  if (inputVoucher.value.trim() !== "") {
    cartData.discount = 15000;
    renderVoucher(cartData.discount);
    removeTotal();
    renderTotal(
      cartData.totalPrice -
        cartData.coupon +
        cartData.deliver -
        cartData.discount
    );
    toast({
      title: "Thành công!",
      message: "Bạn đã nhập voucher thành công.",
      type: "success",
      duration: 3000,
    });
  } else {
    toast({
      title: "Thất bại!",
      message: "Voucher đã quá hạn hoặc không hợp lệ.",
      type: "error",
      duration: 3000,
    });
  }
  // inputVoucher.value = "";
});

btnCoupon.addEventListener("click", () => {
  if (inputCoupon.value.trim() !== "") {
    cartData.coupon = 15000;
    renderCoupon(cartData.coupon);
    removeTotal();
    renderTotal(
      cartData.totalPrice -
        cartData.coupon +
        cartData.deliver -
        cartData.discount
    );
    toast({
      title: "Thành công!",
      message: "Bạn đã nhập coupon thành công.",
      type: "success",
      duration: 3000,
    });
  } else {
    toast({
      title: "Thất bại!",
      message: "Coupon đã quá hạn hoặc không hợp lệ.",
      type: "error",
      duration: 3000,
    });
  }
  // inputCoupon.value = "";
});

// Toast function
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

function toastPay({
  title = "",
  message = "",
  type = "info",
  duration = 3000,
}) {
  const main = document.getElementById("toast-pay");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`, "toast-pay__des");
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast-message">
                      <div class="toast__icon">
                        <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                    </div>
                    
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

const payBtn = document.querySelector(".pay-btn");

const checkPay = () => {
  if (userData.fullname.trim() === "") {
    toastPay({
      title: "Thất bại!",
      message: "Bạn chưa điền thông tin nhận hàng!.",
      type: "error",
      duration: 1000,
    });
  } else {
    toastPay({
      title: "Thành Công!",
      message: "Bạn đã đặt hàng thành công.",
      type: "success",
      duration: 3000,
    });
  }
};

payBtn.addEventListener("click", (e) => {
  checkPay();
});
