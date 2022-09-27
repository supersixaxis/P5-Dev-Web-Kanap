import { baseUrl } from "./api.js"
import { productId } from "./api.js";

let productPanier = JSON.parse(localStorage.getItem("products"))
if (productPanier === null) {
  productPanier = []
}

// mettre une chaine de caractère vide plus tard
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: ""
}



let produits = null
let afficherPanier = function () {

  // recuperer les prix qui ne sont pas dans le localstorage pour + de sécurité
  fetch(baseUrl + "api/products/")
    .then((response) => response.json())
    .then((products) => {
      produits = products
      let html = ""
      let cardProduct = document.getElementById("cart__items")
      for (let i = 0; i < productPanier.length; i++) {
        const p = produits.filter(el => el._id === productPanier[i]._id)[0]
        const productAffiche = `<article class="cart__item" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">
        <div class="cart__item__img">
          <img src="${p.imageUrl}" alt="${p.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${productPanier[i].name}</h2>
            <p>${productPanier[i].color}</p>
            <p id=price__><span id="price__${productPanier[i]._id}${productPanier[i].color}" >${p.price * productPanier[i].quantity}</span> €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté :<span id="quantity__${productPanier[i]._id}${productPanier[i].color}" >${productPanier[i].quantity}</span></p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="1" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem" data-id="${productPanier[i]._id}" data-color="${productPanier[i].color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

        html += productAffiche

      }
      cardProduct.innerHTML = html
      totalQuantite()
      totalPanier()
      modifyQuantity()
      supprimerProduit()
    })
};


// total quantité
let totalQuantite = function () {
  let quantiteProduit = [];

  let totaleArticles = document.getElementById('totalQuantity')
  // parcourir le tableau
  for (let i = 0; i < productPanier.length; i++) {
    let quantiteProduitPanier = productPanier[i].quantity;
    quantiteProduit.push(quantiteProduitPanier)
  }
  // faire la somme des produit recupéré
  let reducer = (accumulator, currentValue) => accumulator + currentValue
  let quantiteTotal = quantiteProduit.reduce(reducer, 0);
  // inclure dans le html 
  totaleArticles.innerHTML = `${quantiteTotal}`
}


// total panier
let totalPanier = function () {
  let prixTotalCalcul = [];
  let totalePanier = document.getElementById('totalPrice')
  // parcourir le tableau
  for (let i = 0; i < productPanier.length; i++) {
    // recuperer l'id
    const p = produits.filter(el => el._id === productPanier[i]._id)[0]
    let prixProduitsDansLePanier = p.price * productPanier[i].quantity;
    prixTotalCalcul.push(prixProduitsDansLePanier)
  }
  let reducer = (accumulator, currentValue) => accumulator + currentValue
  let prixTotal = prixTotalCalcul.reduce(reducer, 0);
  totalePanier.innerHTML = `${prixTotal} `
}

//MODIFICATION DE LA QUANTITE 
let modifyQuantity = function () {
  let inputs = document.querySelectorAll('.itemQuantity');
  inputs.forEach((produit) => {
    produit.addEventListener("change", () => {
      let result = document.getElementById('quantity__' + produit.dataset.id + produit.dataset.color)
      let priceResult = document.getElementById('price__' + produit.dataset.id + produit.dataset.color)
      let p = productPanier.filter(el => produit.dataset.id === el._id && produit.dataset.color === el.color);
      p[0].quantity = parseInt(produit.value)
      result.innerHTML = produit.value;
      const m = produits.filter(el => el._id === p[0]._id)[0]
      priceResult.innerHTML = p[0].quantity * m.price
      localStorage.setItem("products", JSON.stringify(productPanier));
      totalPanier()
      totalQuantite()


    })
  })

}


/// suppression d'un produit dans le panier
let supprimerProduit = function () {
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
        productPanier = []
        afficherPanier()
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
        productPanier = someProduct
        afficherPanier();
      }

    });

  })
}


afficherPanier()

                                        /// FORMUALAIRE DES UTILISATEURS ///



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

    let verif_prenom = document.getElementById('firstName').value;
    if (regExPrenomNomVille(verif_prenom)) {
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
    let verif_nom = document.getElementById('lastName').value;
    if (regExPrenomNomVille(verif_nom)) {
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
    let verif_adress = document.getElementById('address').value;
    if (regExAdresse(verif_adress)) {
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

    let verif_ville = document.getElementById('city').value;
    if (regExPrenomNomVille(verif_ville)) {
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
    let verif_email = document.getElementById('email').value;
    if (regExEmail(verif_email)) {
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

    addContact();
  } else {
    alert("Veuillez remplir le formulaire")
  }




  function addContact() {
    //RECUPERER LES ID POUR ENVOIE A L'API

    let orderId = productPanier.map(product => product._id);
    //console.log(orderId)


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
      //  console.log(orderId);
       // console.log(contact)
        // enregistrer dans le local storage puis mettre le if order après 
      });
    // Si la variable orderId n'est pas une chaîne vide on redirige notre utilisateur sur la page confirmation avec la variable
    if (orderId != "") {
      document.querySelector("#order").value =
        "Commande valide, vous pouvez passer la commande"
      localStorage.clear("products")
      location.href = "confirmation.html?id=" + orderId; // c'est le numéro de commande
    }
    else {
      alert('Veuillez ajouter un produit dans le panier')
    }
  }
});



