let btn = document.querySelector("#btn");

let sidebar = document.querySelector(".sidebar");

let content = document.querySelector(".home_content")

const tabs = document.querySelectorAll(".tab-item");

const panes = document.querySelectorAll(".panel-item");

const navs = document.querySelectorAll(".nav-item");
const contents = document.querySelectorAll(".content-item");

navs.forEach((nav,index) => {
  const content = contents[index];

  nav.onclick = function (e) {
    e.preventDefault();
    document.querySelector(".nav-item.active").classList.remove("active");
    document.querySelector(".content-item.active").classList.remove("active");


    this.classList.add("active");
    content.classList.add("active");
  };
});

btn.onclick = function() {
    sidebar.classList.toggle("active");

    content.classList.toggle("active");
}

const btnAddForm = document.querySelector(".add-form_btn");

const form = document.querySelector(".form");
btnAddForm.onclick = function() {
    form.classList.toggle("active");
}

const submitBtn = document.querySelector(".submit-btn");


function clear() {
  document.getElementById("name").value = ""
  document.getElementById("money").value = "";
  document.getElementById("group-name").value = "";

}

function checkInput() {
    const inputElement = form.querySelectorAll(".form-input");
    for(var i=0; i<inputElement.length; ++i) {
      if(inputElement[i].value === "") {
        inputElement[i].parentElement.querySelector(".error-message").innerText = "Dòng này không được để trống";
      } else {
        inputElement[i].parentElement.querySelector(".error-message").innerText = " ";
      }
    }
}

function renderSearch(array) {
  let item = `
    <tr>
      <th>STT</th>
      <th>Tên món</th>
      <th>Giá tiền</th>
      <th>Danh mục</th>
      <th>Hành động</th>
    </tr>
    `;

      array.map((value, index) => {
      item += `
      <tr>
        <td>${index+1}</td>
        <td>${value.name}</td>
        <td>${value.money} VNĐ</td>
        <td>${value.groupName}</td>
        <td>
          <button class="btn-edit" onclick="editItem(${index})">Sửa</button>
          <button class="btn-del" onclick="delItem(${index})">Xoá</button>
        </td>
      </tr>
      `;
    });

    document.getElementById("table-content").innerHTML = item;
}

function addData() {
    checkInput();
    const errorElement = form.querySelectorAll(".error-message");
    const arrError = [];
    for(var i=0; i<errorElement.length; i++) {
        arrError.push(errorElement[i].innerText);
    }
    const checkError = arrError.every(value => value === "");
    if(checkError) {
        let name = document.getElementById("name").value;
        let money = document.getElementById("money").value;
        let groupName = document.getElementById("group-name").value;
        let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
        if(listItem.length === 0) {
          listItem.push({
            name: name,
            money: money,
            groupName: groupName
          })
        }
        else {
          for(var i=0; i<listItem.length; ++i) {
            if(listItem[i].name === name) {
              console.log(listItem[i].name);
              console.log(name);
              alert("Sản phẩm đã tồn tại");
              break;
            } else {
              listItem.push({
                name: name,
                money: money,
                groupName: groupName
            })
              break;
            }
          }
        }
        localStorage.setItem("list-item", JSON.stringify(listItem));
        renderData();
        clear();
    }
}

function renderData() {
    let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
    let item = `
    <tr>
      <th>STT</th>
      <th>Tên</th>
      <th>Giá tiền</th>
      <th>Danh mục</th>
      <th>Hành động</th>
    </tr>
    `;

      listItem.map((value, index) => {
      item += `
      <tr>
        <td>${index+1}</td>
        <td>${value.name}</td>
        <td>${value.money} VNĐ</td>
        <td>${value.groupName}</td>
        <td>
          <button class="btn-edit" onclick="editItem(${index})">Sửa</button>
          <button class="btn-del" onclick="delItem(${index})">Xoá</button>
        </td>
      </tr>
      `;
    });

    document.getElementById("table-content").innerHTML = item;
}

submitBtn.onclick = function() {
  checkInput();
  addData();
}


function editItem(index) {
  let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
  document.getElementById("name").value = listItem[index].name;
  document.getElementById("money").value = listItem[index].money;
  document.getElementById("group-name").value = listItem[index].groupName;
  document.getElementById("index").value = index;
  document.getElementById("add").style.display = "none";
  document.getElementById("save").style.display = "block";
  form.classList.add("active");
}

function changeItem() {
  let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
  let index = document.getElementById("index").value;
  var checkRepeat = document.getElementById("name").value;
  for(var i=0; i<listItem.length; i++) {
    if(listItem[i].name === checkRepeat && i !== index) 
    {
      alert("Sản phẩm đã tồn tại");
      break;
    } else {
      listItem[index] = {
        name: document.getElementById("name").value,
        money: document.getElementById("money").value,
        groupName: document.getElementById("group-name").value,
      }
      break;
    }
  }

  

  localStorage.setItem("list-item", JSON.stringify(listItem));
  renderData();
  document.getElementById("add").style.display = "block";
  document.getElementById("save").style.display = "none";
  clear();
}

function delItem(index) {
  let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
  if(confirm("Bạn có chắc chắn xoá không?")) {
    listItem.splice(index, 1);
    localStorage.setItem("list-item", JSON.stringify(listItem));
    renderData();
  }

}

function searchItem() {
  let searchInput = document.getElementById("search").value;
  let listItem  = localStorage.getItem("list-item") ? JSON.parse(localStorage.getItem("list-item")) : [];
  let item = listItem.filter(value => {
    return value.name.toUpperCase().includes(searchInput.toUpperCase());
  })

  renderSearch(item);

}

// Chart Start 
const ctx = document.getElementById('lineChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {

        labels: ['1', '2', '3', '4', '5', '6', '7', '8','9','10','11','12'],
        datasets: [{
            label: 'Thống kê doanh thu 12 tháng (Trăm triệu đồng)',
            data: [45, 2, 4, 14, 6, 8, 12, 18, 26,30,52,60],
            backgroundColor: [
                'rgba(85 , 85, 85, 1)',
            ],
            borderColor: [
                'rgb(41, 155, 99)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Ứng tuyển

const btnActive = document.querySelectorAll(".waitting");

btnActive.forEach(value => {
  value.onclick = function () {
     value.classList.toggle("active");
     if(value.classList.value === "waitting active") {
      value.innerText = "Đã nhận";
     } else {
      value.innerText = "Đang chờ";
     }
  };
})

// Cart Start 

let btnDetails = document.querySelectorAll(".btn-detail");

let cartDetails = document.querySelectorAll(".cart-item__detail");

btnDetails.forEach((btnDetail,index) => {
  let cartDetail = cartDetails[index];

  btnDetail.onclick = function() {
    cartDetail.classList.toggle("active");
  }
})

