import { menuArray } from '/data.js'

document.addEventListener('click', function(e){
  if(e.target.dataset.id){
      document.getElementById("order-summary").style.display = "block"
      addBtnClicked(e.target.dataset.id)
  }
})

function getMenuItem(){
    let menuHTML = '';
    menuArray.forEach(function(item){
        const itemDetails = `
            <div class="item">
                <div class="item-info">
                    <div class="emoji">${item.emoji}</div>
                    <div>
                        <h3 class="name">${item.name}</h3>
                        <p class="ingredients">${item.ingredients}</p>
                        <p class="price">$ ${item.price}</p>
                    </div>
                </div>
                <button class="add-btn">
                    <img class="add-btn-img" src="/plus-sign-button.png" data-id="${item.id}">
                </button>
            </div>
        `;
        menuHTML += itemDetails;
    });
    return menuHTML;
}


function renderMenu(){
    document.getElementById("menu-section").innerHTML = getMenuItem()
}

renderMenu()

let priceArray = [];

function addBtnClicked(foodId) {
  const targetFoodObj = menuArray.filter(function(food){
    return food.id == foodId
  })
  const item = targetFoodObj[0]
  const itemHTML = `
      <div class="container">
        <div class="item-btn-container">
            <div class="ordered-item">${item.name}</div>
            <button class="remove-item" id="remove-item" data-removeid="${item.id}">remove</button>
        </div>
        <div class="price">$ ${item.price}</div>
      </div>
  `
  document.getElementById("item-details").innerHTML += itemHTML
  
  priceArray.push(item.price)
  
function sumArray(array) {
  return array.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
}
let total = sumArray(priceArray);

document.getElementById("final-price").innerText = "$ " + total
}

document.getElementById("complete-order-btn").addEventListener("click", function(){
    document.getElementById("payment-modal").style.display = "flex"
})

document.getElementById("pay-btn").addEventListener("click", function(){
    document.getElementById("payment-modal").style.display = "none"
    document.getElementById("order-summary").style.display = "none"
    renderOrderMsg()
    priceArray = []
    document.getElementById("item-details").innerHTML = ""
})

function renderOrderMsg() {
    let completeMsg = document.getElementById("complete-msg")
    let customerName = document.getElementById("name-input").value
    let orderComplete = document.getElementById("order-complete")
    completeMsg.innerHTML = `
    Thanks ${customerName}! Your order is on its way!
    `
    orderComplete.style.display = "flex"
}

function sumArray(array) {
  if (array.length === 0) {
    return 0;
  }
  return array.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
}

document.addEventListener('click', function(e){
  if(e.target.dataset.removeid){
      removeBtnClicked(e.target.dataset.removeid)
  }
})

function removeBtnClicked(foodId) {
  // Find the item in the priceArray based on the foodId
  const index = priceArray.findIndex(function(item) {
    return item.id == foodId;
  });

  // Remove the item from the priceArray
  priceArray.splice(index, 1);

  // Update the total price
  document.getElementById("final-price").innerText = "$ " + sumArray(priceArray);

  // Find the item element in the item details section based on the foodId
  const itemElement = document.querySelector(`[data-removeid="${foodId}"]`).parentElement.parentElement;

  // Remove the item element from the item details section
  itemElement.parentElement.removeChild(itemElement);
}
