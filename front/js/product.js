// Récupération de l'ID du produit sélectionné dans l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
let kanapPrice = 0
let imgUrl, altText, productName

// Appel API du produit sélectionné
fetch(`http://localhost:3000/api/products/${id}`)
// Promesse pour changer la réponse en JSON
.then((response) => response.json())
// Promesse pour traiter les données reçues
.then((res) => retrieveData(res))
.catch((reject) => reject)

// Fonction regroupant les différentes données du produits et les fonctions pour les afficher
function retrieveData(kanap){
    const {altTxt, colors, description, imageUrl, name, price} = kanap;
    kanapPrice = price
    imgUrl = imageUrl
    altText = altTxt
    productName = name
    createImage(imageUrl, altTxt)
    createTitle(name)
    createPrice(price)
    createDescription(description)
    createColors(colors)
}

// Fonction pour afficher l'image et le texte alt. sur le DOM
function createImage(imageUrl, altTxt){
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

// Fonction pour afficher le nom du produit sur le DOM
function createTitle(name){
    const title = document.querySelector('#title')
    if (title != null) title.innerText = name
}

// Fonction pour afficher le prix en € sur le DOM
function createPrice(price){
    const priceEuros = document.querySelector('#price')
    if (priceEuros != null) priceEuros.innerText = price
}

// Fonction pour afficher la description du produit sur le DOM
function createDescription(description){
    const descriptif = document.querySelector('#description')
    if (descriptif != null) descriptif.innerText = description
    }

// Fonction pour afficher les différents choix de couleurs du produit sur le DOM
function createColors(colors){
    const select = document.querySelector('#colors')
    if (select != null) {
        // Pour chaque couleur du tableau des couleurs du produit
        colors.forEach((color) => {
            // Créer un élément <option> à la valeur et au texte de chaque couleur
        const option = document.createElement('option')
        option.value = color
        option.innerText = color
            // Assigner la boucle de création de couleurs au HTML sur l'id #colors
        select.appendChild(option)
        })
    }
}

// Création variable pour créer l'EventListener
const button = document.querySelector('#addToCart')
if (button != null) {
    // Création EventListener du clic sur le bouton et variables pour stocker les choix utilisateur
button.addEventListener('click', (e) => {
    const colorChoice = document.querySelector('#colors').value;
    const quantityChoice = parseInt(document.querySelector('#quantity').value);
    // Traitement des différents cas d'erreur(s'il n'y a pas de couleur ou de quantité choisie, par exemple)
    if (!colorChoice || quantityChoice < 1 || quantityChoice > 100) {
    alert('Veuillez choisir une couleur et une quantité');
    return
    } else {
        // Création objet à stocker dans le localStorage
        const data = {
        'id' : id,
        'name' : productName,
        'color' : colorChoice,
        'quantity' : quantityChoice,
        'imageUrl' : imgUrl,
        'altTxt' : altText
        }
        // Appel d'un tableau contenant les objets à stocker(ou création d'un tableau vide s'il n'y en a pas déjà un)
        let cart = JSON.parse(window.localStorage.getItem('cart')) ?? [];
        // Recherche id et couleurs identiques existant dans tableau d'objets, puis ajout objet s'il n'existe pas, ou addition quantités s'il existe déjà
        let productFound = cart.find(item => id == item.id && colorChoice == item.color);
        if (productFound == undefined){
            cart.push(data);
        } else {
            productFound.quantity += quantityChoice;
        }
        // Stockage du tableau dans le localStorage
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }
})
}