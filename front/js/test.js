var paramsString = ("http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926")
var searchParams = new URLSearchParams(paramsString);

// Itère sur les paramètres de recherche.
for (let p of searchParams) {
  console.log(p);
}

var str = "http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926";
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 
if(search_params.has('id')) {
  var name = search_params.get('id');
  console.log(id)
}



let cardProduct = function () {
  productId = new URL(window.location.href).searchParams.get('id')
  console.log(productId)
  fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    
    .then((products) => {
      console.log(products);

  let product = document.getElementsByClassName('item')

  if (productId == products) {
    const productCard = `<div class="item__img">
<img src="${products.imageUrl}" 
alt="${products.altTxt}">
</div>
<div class="item__content">

<div class="item__content__titlePrice">
  <h1 id="title">${products.name}</h1>
  <p>Prix : <span id="price">${products.price}</span>€</p>
</div>

<div class="item__content__description">
  <p class="item__content__description__title">Description :</p>
  <p id="description">${products.description}</p>
</div>`;
    product.innerHTML += productCard
  }
});
};
cardProduct()



let productPanier = {
  id : productId,
  quantity : "20",//document.querySelector('input')
  colors : "green"//document.querySelector('select')

}
let panierLinea = JSON.stringify(productPanier);
localStorage.setItem("product",panierLinea);
console.log(localStorage)









function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

function addBasket(products) {
  let basket = getBasket();
  let foundProduct = basket.find(p => p.id == products.id);
  if (foundProduct != undefined) {
    foundProduct.quantity++;
  } else {
    products.quantity = 1;
    basket.push(products);
  }
  
  saveBasket(basket);
}

function removeFromBasket(products){
  let basket = getBasket();
  basket = basket.filter(p => p.id != products.id)
  saveBasket(basket)
}

//addBasket({id:"50", "name": "produit1", "price": 20})
//addBasket({id:"50", "name": "produit1", "price": 20})
//addBasket({id:"50", "name": "produit1", "price": 20})
//addBasket({id:"55", "name": "produit1", "price": 20})
//removeFromBasket({id:"55"})





function addToCart() { }
const addToCartBtn = document.getElementById('addToCart');    // On récupère l'élément sur lequel on veut détecter le clic
addToCartBtn.addEventListener('click', () => {
  if (productsNumber.value > 0 && productsNumber.value < 100) {
    let productAdded = {
      name: itemTitle.textContent,
      color: color.innerHTML,
      price: parseFloat(itemPrice.textContent),
      quantity: parseFloat(document.querySelector("#quantity").value),
      _id: productId,
    };

   // On écoute l'événement click
//);

let arrayProductsInCart = [];
      
      // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau arrayProductsInCart, puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
      if (localStorage.getItem("products") !== null) {
        arrayProductsInCart = JSON.parse(localStorage.getItem("products"));
        
        
        // Si le LS est vide, on le crée avec le produit ajouté
      } 
        arrayProductsInCart.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProductsInCart));
      }});