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
    let itemPrice = products.find(product => product.id == item.id);
    if (itemPrice) {
        itemPrice = itemPrice.price;
        priceText.textContent = `${itemPrice}€`;
    } else {
        console.log('Pas de prix')
    }
    console.log(products);
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
    quantityButton.value = parseInt(item.quantityChoice);

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

    settingsDelete.appendChild(settingsDeleteText);

    return settingsDelete;
}



// Récupérer l'élément span
let totalQuantityID = document.getElementById('totalQuantity');
let totalQuantity = 0;
// Récupération des éléments du localStorage
let items = JSON.parse(localStorage.getItem('cart'));
// Boucle sur le localStorage et ajout de leur quantité à la variable totalQuantity puis assignation au span correspondant
for (let i = 0; i < items.length; i++) {
  totalQuantity += items[i].quantity;
}
totalQuantityID.textContent = totalQuantity;

// Début même chose pour prix total
let totalPriceID = document.getElementById('totalPrice');
let totalPrice = 0
for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price;
}
totalPriceID.textContent = totalPrice;