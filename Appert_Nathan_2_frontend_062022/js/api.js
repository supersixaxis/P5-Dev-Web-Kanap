const baseUrl = "http://localhost:3000/" 
export{baseUrl}

let productId = new URL(window.location.href).searchParams.get('id')
export {productId}

