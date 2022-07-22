import{baseUrl} from "./api.js"

let cardsFetch = function () {
  // je récupère le tableau dans l'api 'products'
  fetch(baseUrl + "api/products/")
    .then((response) => response.json())
    .then((products) => {
      console.log(products);
      // j'ajoute ce qu'il y a dans le tableau à l'intérieur de l'HTML
      let productSection = document.getElementById("items");

      for (let i = 0; i < products.length; i++) {
        const productCard = `
          <a href="product.html?id=${products[i]._id}">
            <article>
              <img
                src="${products[i].imageUrl}"
                alt="${products[i].altTxt}"
              />
              <h3 class="productName">${products[i].name}</h3>
              <p class="productDescription">
                ${products[i].description}
              </p>
            </article>
          </a>`
          ;
        productSection.innerHTML += productCard;
      }
    });
};
cardsFetch();



