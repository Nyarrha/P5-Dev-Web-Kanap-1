const kanapsList = document.getElementById('items');
const url = 'http://localhost:3000/api/products/';
let html = '';

// Fonction créant le lien vers la page produit de l'objet
function createLink(kanap) {
    let link = document.createElement('a');
    link.href = "./product.html?id=" + kanap._id;
    return link;
}

// Fonction création image objet
function createImage(kanap) {
    let image = document.createElement('img');
    image.src = kanap.imageUrl;
    image.alt = kanap.altTxt;
    return image;
}

// Fonction création nom objet
function createTitle(kanap) {
    let title = document.createElement('h3');
    title.classList.add("productName");
    title.textContent = kanap.name;
    return title;
}

// Fonction création description objet
function createDescription(kanap) {
    let desc = document.createElement('p');
    desc.classList.add('productDescription');
    desc.textContent = kanap.description;
    return desc;
}

// Création de la fonction qui génère l'objet dans une div article
function getKanap(kanap) {
    let link = createLink(kanap);
    let image = createImage(kanap);
    let title = createTitle(kanap);
    let desc = createDescription(kanap);

    let article = document.createElement('article')

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(desc);
    link.appendChild(article);
    
    return link;
}


// Appel API
fetch(url)
    // Promesse pour transformer le résultat en .JSON
   .then((response) => response.json())
//    Affichage des produits sur le DOM
   .then((kanaps) =>{
        for (const kanap of kanaps) {
            kanapsList.appendChild(getKanap(kanap));
        }
   })
   // Réponse en cas d'erreur
   .catch((error) =>{
   return error;
   });
