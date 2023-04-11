let url = `http://localhost:3000/api/products/`
let cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];
let res = await fetch(url);
let products = await res.json();



for (const item of cart) {
    createCartItem(item);
}

function createCartItem(item) {
    let section = document.querySelector('#cart__items')
    // Appel fonctions pour créer l'item panier
    let article = createArticle(item);
    let image = createImage(item);
    let itemsContent = createItemContent(item);

    
    article.appendChild(image);
    article.appendChild(itemsContent);

    section.appendChild(article);

    return section;
}


// Création de la balise article
function createArticle(item) {
    let article = document.createElement('article');
    article.classList.add('cart__item');
    article.dataset.id = item.id;
    article.dataset.color = item.color;
    return article;
}

// Création de la balise image
function createImage(item) {
    let divImage = document.createElement('div')
    divImage.classList.add('cart__item__img');

    let img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.altTxt;
    divImage.appendChild(img);

    return divImage;
}

// Création de la grande div contenant les autres concernant produit
function createItemContent(item) {
    let divContent = document.createElement('div');
    divContent.classList.add('cart__item__content');
    // Regroupement des petites div dans la plus grande
    let content = createItemDescription(item);
    let contentSettings = createContentSettings(item);

    divContent.appendChild(content);
    divContent.appendChild(contentSettings);
    
    return divContent;
}


// Création fonction pour récupérer les prix depuis API
function itemsPrices(item) {
    let priceText = document.createElement('p');
    // Recherche prix dans l'API
    let product = products.find(product => product._id === item.id);
    if (product.price) {
        priceText.textContent = `${product.price}€`;
    } else {
        console.log('Pas de prix')
    }
    return priceText;
}

// Création de la div description du produit
function createItemDescription(item) {
    let divDesc = document.createElement('div');
    divDesc.classList.add('cart__item__content__description');
    let title = document.createElement('h2');
    title.textContent = item.name

    let color = document.createElement('p');
    color.textContent = item.color;

    let price = itemsPrices(item);

    divDesc.appendChild(title);
    divDesc.appendChild(color);
    divDesc.appendChild(price);

    return divDesc;
}


// Création div regroupant éléments concernant les paramètres de la commande
function createContentSettings(item) {
    let settings = document.createElement('div');
    settings.classList.add('cart__item__content__settings');

    let settingsQuantity = createSettingsQuantity(item);
    let setDelete = settingsDelete();

    settings.appendChild(settingsQuantity);
    settings.appendChild(setDelete);

    return settings;
}

// Fonction créant les éléments de paramètres directement rattachés à la div au dessus
function createSettingsQuantity(item) {
    let settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');

    let quantityText = document.createElement('p');
    quantityText.textContent = 'Qté : ';

    let quantityButton = document.createElement('input');
    quantityButton.type = 'number';
    quantityButton.classList.add('itemQuantity');
    quantityButton.name = 'itemQuantity';
    quantityButton.min = '1';
    quantityButton.max = '100';
    quantityButton.value = parseInt(item.quantity);

    // Evènement lors du changement de la valeur de la quantité, ajoutant celle-ci à la quantité de base du panier
    quantityButton.addEventListener('change', (event) => {
        const input = event.target;
        const article = input.closest('article');
        let itemFound = cart.find(item => article.dataset.id == item.id && article.dataset.color == item.color);
        itemFound.quantity = parseInt(input.value);
        window.localStorage.setItem('cart', JSON.stringify(cart));
        displayTotals();
    })

    settingsQuantity.appendChild(quantityText);
    settingsQuantity.appendChild(quantityButton);

    return settingsQuantity;
}


// Fonction pour ajouter la proposition de supprimer le produit du produit(seulement l'élément texte)
function settingsDelete() {
    let settingsDelete = document.createElement('div');
    settingsDelete.classList.add('cart__item__content__settings__delete');
    let settingsDeleteText = document.createElement('p');
    settingsDeleteText.textContent = 'Supprimer';

    // Evènement au clic du texte "Supprimer" pour retirer l'article du panier
    settingsDeleteText.addEventListener('click', (event) => {
        const input = event.target;
        const article = input.closest('article');
        cart = cart.filter(item => !(article.dataset.id == item.id && article.dataset.color == item.color));
        window.localStorage.setItem('cart', JSON.stringify(cart));
        article.remove();
        displayTotals();
    })

    settingsDelete.appendChild(settingsDeleteText);

    return settingsDelete;
}


function displayTotals(){
let cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];
// Récupérer l'élément span
let totalQuantityID = document.getElementById('totalQuantity');
let totalQuantity = 0;
let totalPriceID = document.getElementById('totalPrice');
let totalPrice = 0
// Boucle sur le localStorage et ajout de la quantité et le prix total puis assignation au span correspondant
for (const item of cart) {
  totalQuantity += item.quantity;
  let product = products.find(product => product._id == item.id);
  totalPrice += item.quantity * product.price;
}
totalQuantityID.textContent = totalQuantity;
totalPriceID.textContent = totalPrice;
}

displayTotals();

// **************************** //

// Expressions Régulières

// Récupération formulaire
let form = document.querySelector('.cart__order__form');

// Ajout évènement qui vérifie le prénom entré par l'utilisateur
form.firstName.addEventListener('change', function(event) {
    validFirstName(event.target.value);
})

// Fonction appelée pour vérification contenu champ "prénom"
function validFirstName(inputFirstName) {
    const firstNameError = document.querySelector('#firstNameErrorMsg');
    let firstNameRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    if (firstNameRegExp.test(inputFirstName)) {
        firstNameError.innerHTML = '';
    } else {
        firstNameError.textContent = 'Veuillez donner un prénom valide.';
    }
    return;
}

// Ajout évènement nom utilisateur
form.lastName.addEventListener('change', function(event){
    validLastName(event.target.value);
})

// Fonction appelée vérification champ "nom"
function validLastName(inputLastName) {
    const lastNameError = document.querySelector('#lastNameErrorMsg');
    let lastNameRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    if (lastNameRegExp.test(inputLastName)) {
        lastNameError.innerHTML = '';
    } else {
        lastNameError.textContent = 'Veuillez donner un nom valide.';
    }
    return;
}

// Ajout évènement adresse utilisateur
form.address.addEventListener('change', function(event){
    validAddressName(event.target.value);
})

// Fonction appelée vérification champ "adresse"
function validAddressName(inputAddress) {
    const addressError = document.querySelector('#addressErrorMsg');
    let addressRegExp = /^[1-9]{2,3}[a-zA-Zéèêëàâäîïôöûüùç,\-. ]{2,}$/;
    if (addressRegExp.test(inputAddress)) {
        addressError.innerHTML = '';
    } else {
        addressError.textContent = 'Veuillez donner une adresse valide.';
    }
    return;
}

// Ajout évènement ville utilisateur
form.city.addEventListener('change', function(event){
    validCityName(event.target.value);
})

// Fonction appelée vérification champ "ville"
function validCityName(inputCity) {
    const cityError = document.querySelector('#cityErrorMsg');
    let cityRegExp = /^[a-zA-Zéèêëàâäîïôöûüùç\- ]{2,}$/;
    if (cityRegExp.test(inputCity)) {
        cityError.innerHTML = '';
    } else {
        cityError.textContent = 'Veuillez donner une ville valide.';
    }
    return;
}

// Ajout évènement adresse utilisateur
form.email.addEventListener('change', function(event){
    validEmailName(event.target.value);
})

// Fonction appelée vérification champ "adresse"
function validEmailName(inputEmail) {
    const emailError = document.querySelector('#emailErrorMsg');
    let emailRegExp = /^[a-zA-Z1-9\-_.]*@[a-zA-Z1-9]*.[a-z]*$/;
    if (emailRegExp.test(inputEmail)) {
        emailError.innerHTML = '';
    } else {
        emailError.textContent = 'Veuillez donner une adresse email valide.';
    }
    return;
}

// ******************** //

// Envoi formulaire valide

const formSelect = document.querySelector('.cart__order__form');

formSelect.addEventListener('submit', function(event){
    event.preventDefault();

    const productsData = JSON.parse(window.localStorage.getItem('cart'));
    const formData = {
        contact: {
            firstName: event.target.querySelector('#firstName').value,
            lastName: event.target.querySelector('#lastName').value,
            address: event.target.querySelector('#address').value,
            city: event.target.querySelector('#city').value,
            email: event.target.querySelector('#email').value
        },
        products: productsData
    }

    const chargeUtile = JSON.stringify(formData);

    fetch('http://localhost:3000/api/products/order', {
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body : chargeUtile
    })
    .then(response => console.log(response))
    .catch(error => console.log('Error: ' + error))
})