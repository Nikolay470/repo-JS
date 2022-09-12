"use strict";

const blockTotal = document.querySelector('.total');
const total = document.querySelector('.blockBasket .total span');
const iconCart = document.querySelector('.cartIconWrap');
const blockBasket = document.querySelector('.blockBasket');
const products = document.querySelector(".featuredItems");
const collButtonAddToCart = products.querySelectorAll('button');
const spanCart = document.querySelector('.cartValue');

spanCart.innerText = '0';

let obj = {}

let n = 0;

collButtonAddToCart.forEach((element) => {
    element.addEventListener('click', (event) => {
        spanCart.innerText = `${++n}`;
        const featuredItem = event.target.closest('.featuredItem');
        const id = +featuredItem.dataset.id;
        const name = featuredItem.dataset.name;
        const price = +featuredItem.dataset.price;

        addToCart(id, name, price);
    });
});

function addToCart(id, name, price) {
    if (!(id in obj)) {
        obj[id] = {
            id: id,
            name: name,
            price: price,
            quant: 0,
        }
    }
    obj[id].quant++;
    total.textContent = getBlockBasketTotalPrice().toFixed(2);
    showProductInBasket(id);
}

function getBlockBasketTotalPrice() {
    return Object.values(obj).reduce((sum, item) => {
         sum = sum + item.price * item.quant;
         return sum;
     }, 0);
 }

 function showProductInBasket(id) {
    const productInBasket = blockBasket
        .querySelector(`.blockBasketRow[data-id="${id}"]`);
    if (!productInBasket) {
        showNewProductInBasket(id);
        return;
    }
    blockBasket.querySelector('.blockBasketRow .productQuant')
        .textContent = obj[id].quant;
    blockBasket.querySelector('.blockBasketRow .productTotal')
        .textContent = obj[id].quant * obj[id].price;
 }

function showNewProductInBasket(id) {
    const productRowHTML = 
    `<div class="blockBasketRow" data-id="${id}">
    <div>${obj[id].name}</div>
    <div>
      <span class="productQuant">${obj[id].quant}</span> шт.
    </div>
    <div>$${obj[id].price}</div>
    <div>
      $<span class="productTotal">${(obj[id].price * obj[id].quant).toFixed(2)}</span>
    </div>
  </div>
  `;

    blockTotal.insertAdjacentHTML('beforebegin', productRowHTML);
}

//сдесь делал что бы появлялся и исчезал список товаров в корзине.

iconCart.addEventListener('click', () => {
    blockBasket.classList.toggle('hidden');
});




