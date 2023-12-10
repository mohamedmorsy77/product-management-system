let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let create = document.querySelector(".create");
let Delete = document.querySelector(".delete");
let Update = document.querySelector(".update");
let deleteAll = document.querySelector(".deleteAll")
let totalArr = [price,taxes,ads,discount,count];
console.log(total)
console.log(price)

let mood = "create";
let tmp ;
//  Total Function
function totalPrice() {
  if(price.value === "") {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(199, 18, 18)"
  } else {
        var totalCount =  +price.value   + +taxes.value + +ads.value - +discount.value;
        total.innerHTML = totalCount;
        total.style.backgroundColor = "#08a308"
        if(count.value !="") {
            totalCount =  totalCount * Math.floor(count.value);
            total.innerHTML = totalCount;
        }
    
  } 

}
totalArr.forEach((input) => {
    input.addEventListener("input", totalPrice);
})


// Create Function

let dataArr ;
if(localStorage.product != null) {
    dataArr = JSON.parse(localStorage.product);
} else {
 dataArr = [];

}
 
function createData() {
    let newObject = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total: total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    if(title.value != '' && price.value != "" && category.value != "" && count.value.length < 100) {
        if(mood === "create") {
            if(newObject.count > 1) {
                for(let i = 0; i < count.value ; i++) {
                    dataArr.push(newObject)
                } 
            } else {
                dataArr.push(newObject)
            }
    
        } else {
            dataArr[tmp] = newObject;
            mood = "create";
            create.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
      
    }
    
    localStorage.setItem("product", JSON.stringify(dataArr));
    
    readData();
}
create.addEventListener("click" , createData);


// Clear Input values

function clearData() {
    title.value = "";
    total.innerHTML = "";
    price.value = "";
    taxes.value ="";
    ads.value = "";
    count.value = "";
    discount.value = "";
    category.value = "";
    total.style.backgroundColor = "rgb(199, 18, 18)"

}


// Read Data 
function readData() {
    let table = ``;
    for(let i = 0 ; i < dataArr.length; i++) {
        table += ` <tr>
                        <td>${i + 1}</td>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</</td>
                        <td>${dataArr[i].taxes}</</td>
                        <td>${dataArr[i].ads}</</td>
                        <td>${dataArr[i].discount}</</td>
                        <td>${dataArr[i].total}</</td>
                        <td>${dataArr[i].category}</</td>
                        <td><button class="update" onclick= "updateData(${i})"  id="update">Update</button></td>
                        <td><button class="delete" onclick= "deleteData(${i})" id="delete">Delete</button></td>
                </tr>`
    }
    


    document.querySelector(".tbody").innerHTML = table;
    let btnDeleteAll = document.querySelector(".deleteAll");
    
    if(dataArr.length > 0) {
        btnDeleteAll.innerHTML = `<button class ="delAll">DeleteAll(${dataArr.length})</button>`
    } else {
        btnDeleteAll.innerHTML= ""
    }
    
}

readData();

// Delete Function 
function deleteData(i) {
    dataArr.splice(i,1);
    localStorage.product = JSON.stringify(dataArr);
    readData();
   
}


// DeleteAll Data
function deleteAllData() {
    localStorage.clear();
    dataArr.splice(0);
    readData();

}
deleteAll.addEventListener("click", deleteAllData);


// Update Data
function updateData(i) {
    title.value = dataArr[i].title;
    price.value = dataArr[i].price;
    taxes.value = dataArr[i].taxes;
    ads.value = dataArr[i].ads;
    discount.value = dataArr[i].discount;
    category.value = dataArr[i].title;
    count.style.display = "none";
    create.innerHTML = "Update";
    totalPrice()

    mood = "update";
    tmp = i;
    scroll({
        top : 0,
        behavior : "smooth"
    })

}

// Search Data

let searchMood = "title";


function getSearchMood(id) {
    let searchInput = document.querySelector(".search");
    if(id == "searchTitle") {
        searchMood = "title";
        searchInput.placeholder = "search by title"
        
    } else {
        searchMood = "category";
        searchInput.placeholder = "search by category"
    }
    searchInput.value = "";
    searchInput.focus()
}


function search(value) {
    let table = ``;
    for(let i = 0 ; i < dataArr.length; i++) {
    if(searchMood == "title") {
      
            if(dataArr[i].title.includes(value.toLowerCase())) {
                table += ` <tr>
                        <td>${i + 1}</td>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</</td>
                        <td>${dataArr[i].taxes}</</td>
                        <td>${dataArr[i].ads}</</td>
                        <td>${dataArr[i].discount}</</td>
                        <td>${dataArr[i].total}</</td>
                        <td>${dataArr[i].category}</</td>
                        <td><button class="update" onclick= "updateData(${i})"  id="update">Update</button></td>
                        <td><button class="delete" onclick= "deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

            }
        

    }else {
        
            if(dataArr[i].category.includes(value.toLowerCase())) {
                table += ` <tr>
                        <td>${i + 1}</td>
                        <td>${dataArr[i].title}</td>
                        <td>${dataArr[i].price}</</td>
                        <td>${dataArr[i].taxes}</</td>
                        <td>${dataArr[i].ads}</</td>
                        <td>${dataArr[i].discount}</</td>
                        <td>${dataArr[i].total}</</td>
                        <td>${dataArr[i].category}</</td>
                        <td><button class="update" onclick= "updateData(${i})"  id="update">Update</button></td>
                        <td><button class="delete" onclick= "deleteData(${i})" id="delete">Delete</button></td>
                </tr>`

            }
        
    }
}
    document.querySelector(".tbody").innerHTML = table;
}