let orderIdSelect = document.querySelector('#orderId')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderId = urlParams.get('orderId')

orderIdSelect.textContent = orderId;
window.localStorage.clear();