// search param ou url param pour recuper l'id de commande puis lafficher

let orderId = new URL(window.location.href).searchParams.get('id')
let confirmation = document.getElementById('orderId')
confirmation.innerHTML = orderId
