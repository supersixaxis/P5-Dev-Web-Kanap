import { baseUrl } from "./api.js"
import { productId } from "./api.js";

let productPanier = JSON.parse(localStorage.getItem("products"))

// mettre une chaine de caractère vide plus tard
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: ""
}
//RECUPERER LES ID POUR ENVOIE A L'API

let orderId = productPanier.map(product => product._id);
console.log(orderId)

// recuperer les prix qui ne sont pas dans le localstorage pour + de sécurité
fetch(baseUrl + "api/products/")
.then((response) => response.json())
.then((products) => {
  for (let i = 0; i < products.length; i++) {
    let productPrice = products[i].price;
  console.log(productPrice);}})

  //for (let i = 0; i < productsArray.length; i++){}
 // let productPrice = productsArray.map(products => products.price);===> erreur 'not a function'
//console.log(productPrice) 

let afficherPanier = function () {



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
            <p id=price__>${productPanier[i].price * productPanier[i].quantity} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté :<span id="quantity__${productPanier[i]._id}" >${productPanier[i].quantity}</span></p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;


    cardProduct.innerHTML += productAffiche

  }
}



afficherPanier()





// total quantité

let quantiteProduit = [];

let totaleArticles = document.getElementById('totalQuantity')
// parcourir le tableau
for (let i = 0; i < productPanier.length; i++) {
  let quantiteProduitPanier = productPanier[i].quantity;
  //console.log(quantiteProduitPanier)
  quantiteProduit.push(quantiteProduitPanier)
 // console.log(quantiteProduit)
  // faire la somme des produit recupéré
  let reducer = (accumulator, currentValue) => accumulator + currentValue
  let quantiteTotal = quantiteProduit.reduce(reducer,0);
  //console.log(prixTotal)
   // inclure dans le html 
  totaleArticles.innerHTML = `${quantiteTotal}`
}



// total panier

let prixTotalCalcul = [];

let totalePanier = document.getElementById('totalPrice')
// parcourir le tableau
for (let i = 0; i < productPanier.length; i++) {
  let prixProduitsDansLePanier = productPanier[i].price;
 // console.log(prixProduitsDansLePanier)
  prixTotalCalcul.push(prixProduitsDansLePanier)
//  console.log(prixTotalCalcul)
  // faire la somme des produit recupéré
  let reducer = (accumulator, currentValue) => accumulator + currentValue
  let prixTotal = prixTotalCalcul.reduce(reducer,0);
  
  //console.log(prixTotal)
   // inclure dans le html 
  totalePanier.innerHTML = `${prixTotal} ` // * quantite total = not defined


// recuperer l'id
// requete  pour appeler le prix du produit grace au data id

}


/// suppression d'un produit dans le panier

let someProduct = []
// ne pas oublié mise a jour total panier
// on appel le bouton supprimmer
let supprimerSelection = document.querySelectorAll('.cart__item__content__settings__delete .deleteItem ');
// on appel le tableau 
supprimerSelection.forEach((produit) => {
  // on écoute l'événement du click supprimer
  produit.addEventListener('click', () => {
    let totalepanier = productPanier.length
    // si y'a un seul produit = on le supprime
    if (totalepanier == 1) {

      return localStorage.removeItem('products')
    }
    // on filtre le tableau pour différencier l'id et la couleur du produit
    else {
      someProduct = productPanier.filter(el => {
        if (produit.dataset.id != el._id || produit.dataset.color != el.color)
          return true
      });
      // on met à jour le localstorage après la suppression du produit
      localStorage.setItem("products", JSON.stringify(someProduct));
      // Rafraîchissement de la page
      location.reload();
    }

  });

})

//MODIFICATION DE LA QUANTITE 

let inputs = document.querySelectorAll('.itemQuantity');
inputs.forEach((produit) => {
  produit.addEventListener("change", () => {
    let result = document.getElementById('quantity__' + produit.dataset.id)
    let p = productPanier.filter(el => produit.dataset.id != el._id || produit.dataset.color != el.color);
    p[0].quantity = parseInt(produit.value)
    result.innerHTML = produit.value;
    localStorage.setItem("products", JSON.stringify(productPanier));
  })
})

// refaire cette boucle pour mettre a jour le prix
// appelé la mise a jour du total prix







/// formulaire des utilisateurs 



// sélection du bouton Valider

let btnValidate = document.querySelector("#order");

// Écoute du bouton Valider sur le click pour pouvoir contrôler, valider et ennoyer le formulaire et les produits au back-end

btnValidate.addEventListener("click", (event) => {
  event.preventDefault();

  // Regex pour le contrôle des champs Prénom, Nom et Ville
  let regExPrenomNomVille = (value) => {
    return /^[^@&"()!_$*€£`+=\/;?#\d]+$/.test(value);   ///^[a-z A-Z]/
  };

  // Regex pour le contrôle du champ Adresse
  let regExAdresse = (value) => {
    return /(?!^\d+$)^[^@&"()!_$*€£`+=\/;?#]+$/.test(value); // /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/
  };

  // Regex pour le contrôle du champ Email
  let regExEmail = (value) => {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(
      value
    );
  };
  let errorFirstName = document.getElementById("firstNameErrorMsg")
  let firstName = document.getElementById('firstName')

  // formulaire prénom 
  function firstNameValidation() {

    let prenom = contact.firstName.value;
    if (regExPrenomNomVille(prenom)) {
      firstName.style.backgroundColor = "green";
      errorFirstName.textContent = "";
      return true;
    } else {
      firstName.style.backgroundColor = "#FF6F61"
      errorFirstName.textContent =
        "Champ Prénom de formulaire invalide, ex: Paul";
      return false;
    }
  }


  // formulaire nom de famille

  let errorLastName = document.getElementById("lastNameErrorMsg")
  let lastName = document.getElementById("lastName")

  function lastNameValidation() {
    let nom = contact.lastName.value;
    if (regExPrenomNomVille(nom)) {
      lastName.style.backgroundColor = "green";

      errorLastName.textContent = "";
      return true;
    } else {
      lastName.style.backgroundColor = "#FF6F61";

      errorLastName.textContent =
        "Champ Nom de formulaire invalide, ex: Durand";
      return false;
    }
  }

  // formulaire adresse 

  let adress = document.getElementById("address")
  let errorAdress = document.getElementById("addressErrorMsg")

  function adressValidation() {
    let adresse = contact.address.value;
    if (regExAdresse(adresse)) {
      adress.style.backgroundColor = "green";

      errorAdress.textContent = "";
      return true;
    } else {
      city.style.backgroundColor = "#FF6F61"
      errorAdress.textContent =
        "Champ Adresse de formulaire invalide, ex: 50 rue de la paix";
      return false;
    }

  }

  // formumaire ville
  let city = document.getElementById("city")
  let errorCity = document.getElementById("cityErrorMsg")

  function cityValidation() {

    let ville = contact.city.value;
    if (regExPrenomNomVille(ville)) {
      city.style.backgroundColor = "green";

      errorCity.textContent = "";
      return true;
    } else {
      city.style.backgroundColor = "#FF6F61";

      errorCity.textContent =
        "Champ Ville de formulaire invalide, ex: Paris";
      return false;
    }

  }

  // fomulaire email 

  let email = document.getElementById("email")
  let errorEmail = document.getElementById("emailErrorMsg")

  function emailValidation() {
    let courriel = contact.email.value;
    if (regExPrenomNomVille(courriel)) {
      email.style.backgroundColor = "green";

      errorEmail.textContent = "";
      return true;
    } else {
      email.style.backgroundColor = "#FF6F61";

      errorEmail.textContent =
        "Champ Email de formulaire invalide, ex: example@contact.fr";
      return false;
    }
  };



  // on controle la validité du formulaire 
  let result = firstNameValidation()
  result = lastNameValidation() && result
  result = adressValidation() && result
  result = cityValidation() && result
  result = emailValidation() && result
  if (result) {
    contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value
    }
    // enregistrer le formulaire dans le local storage
    localStorage.setItem("contact", JSON.stringify(contact))
    document.querySelector("#order").value =
      "Commande valide, vous pouvez passer la commande"
    addContact();
  } else {
    console.error("Veuillez remplir le formulaire")
  }




  function addContact() {

    fetch(baseUrl + "api/products/order", {
      method: "POST",

      body: JSON.stringify({
        "contact": contact

        ,
        "products": orderId

      }),

      headers: {
        "Content-Type": "application/json",
      },
    })
      // Ensuite on stock la réponse de l'api (orderId)
      .then((response) => {
        return response.json();
        // le numéro de commande est dans la réponse
      })
      .then((server) => {
        orderId = server.orderId;
        console.log(orderId);
        console.log(contact)
        // enregistrer dans le local storage puis mettre le if order après 
      });
    // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable
    if (orderId != "") {
      location.href = "confirmation.html?id=" + orderId; // c'est le numéro de commande
    }
  }
});




/******************************* FIN REQUÊTE DU SERVEUR ET POST DES DONNÉES ***************/

// Maintenir le contenu du localStorage dans le champs du formulaire

/*let dataFormulaire = JSON.parse(localStorage.getItem("contact"));

console.log(dataFormulaire);
if (dataFormulaire) {
  document.querySelector("#firstName").value = dataFormulaire.firstName;
  document.querySelector("#lastName").value = dataFormulaire.lastName;
  document.querySelector("#address").value = dataFormulaire.address;
  document.querySelector("#city").value = dataFormulaire.city;
  document.querySelector("#email").value = dataFormulaire.email;
} else {
  console.log("Le formulaire est vide");
}*/