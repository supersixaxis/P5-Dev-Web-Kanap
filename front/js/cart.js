import { baseUrl } from "./api.js"


let afficherPanier = function () {
    let productPanier = JSON.parse(localStorage.getItem("products"))
    console.log(productPanier)

    let cardProduct = document.getElementById("cart__items")
    for (let i = 0; i < productPanier.length; i++) {
        const productAffiche = `<article class="cart__item" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">
        <div class="cart__item__img">
          <img src="${productPanier[i].imageUrl}" alt="">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productPanier[i].name}</h2>
            <p>${productPanier[i].color}</p>
            <p>${productPanier[i].price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : ${productPanier[i].quantity}</p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
        cardProduct.innerHtml += productAffiche

    }

}
afficherPanier()
//localStorage["id", "quantity", "colors"];

