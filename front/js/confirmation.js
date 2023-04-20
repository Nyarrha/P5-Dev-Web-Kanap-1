// Récupération orderID et assignation au HTML
let orderIdSelect = document.querySelector('#orderId')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId')

// Affichage orderID(numéro commande) puis nettoyage localstorage
orderIdSelect.textContent = orderId;
window.localStorage.clear();