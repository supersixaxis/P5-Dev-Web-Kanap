import { baseUrl } from "./api.js"
import { productId } from "./api.js";



const productsNumber = document.getElementById("quantity");
const itemTitle = document.getElementById('title')
const itemPrice = document.getElementById('price');

// Je récupère l'id de l'objet choisi


let cardProduct = function () {

  // J'envoie la requête de l'élément pour récupérer son contenu
  fetch(baseUrl + "api/products/" + productId)
    .then((response) => response.json())

    .then((products) => {
      console.log(products);
      // J'insère le contenue dans le HTML

      if (products) {
        const image = document.createElement('img');
        image.src = products["imageUrl"];
        image.alt = products["altTxt"];
        document.querySelector('.item__img').appendChild(image);


        let itemTitle = document.getElementById('title');
        itemTitle.textContent = products["name"];

        let itemPrice = document.getElementById('price');
        itemPrice.textContent = products["price"]

        let itemDescription = document.getElementById('description');
        itemDescription.textContent = products["description"];

        const itemColor = document.getElementById('colors');
        for (let i = 0; i < products.colors.length; i++) {
          const color = document.createElement('option')
          itemColor.appendChild(color)
          color.value = products["colors"][i];
          color.innerHTML = products["colors"][i];
        }

      }
    });
};



cardProduct()


let choixCouleur = document.querySelector("#colors");
// On écoute ce qu'il se passe dans #colors
choixCouleur.addEventListener("input", (ec) => {
  let selectColor;
  // on récupère la valeur de la cible de l'évenement dans couleur
  selectColor = ec.target.value
});


function addToCart() {


  const addToCartBtn = document.getElementById('addToCart');
  // On récupère l'élément sur lequel on veut détecter le clic
  addToCartBtn.addEventListener('click', () => {
    // on rappel la variable couleur et on récupère le produit
    let selectColor = document.querySelector("#colors")
    if (productsNumber.value > 0 && productsNumber.value < 100) {
      let productAdded = {
        name: itemTitle.textContent,
        color: selectColor.value,
        price: parseFloat(itemPrice.textContent),// faire une requete au serveur pour recuperer le prix a l'endroit ou j'ai besoin qu'il s'affiche
        quantity: parseFloat(document.querySelector("#quantity").value), 
        _id: productId,
        imageUrl: document.querySelector(".item__img img ").src,
        altTxt: document.querySelector(".item__img img  ").alt,
      };
      // on crée le panier 
      let productPanier = JSON.parse(localStorage.getItem("products"));
      // on crée un array panier et on ajoute le 1er produit
      if (productPanier == null) {

        productPanier = [];
        productPanier.push(productAdded);
        localStorage.setItem("products", JSON.stringify(productPanier));
        // si quantité et color sont pareil on ajoute juste la quantité
      } else {
        let miseAJourEffectue = false
        for (let i = 0; i < productPanier.length; i++) {
          if (productPanier[i]._id === productAdded._id && productPanier[i].color === productAdded.color) {
            productPanier[i].quantity++
            localStorage.setItem("products", JSON.stringify(productPanier))
            miseAJourEffectue = true
            break
          }
          // si non identique on crée un nouveau produit dans l'array
        }
        if (!miseAJourEffectue) {
          productPanier.push(productAdded);
          localStorage.setItem("products", JSON.stringify(productPanier));
        }


      }

      return (productPanier = JSON.parse(localStorage.getItem("products")))
    }
  });
}

addToCart()




