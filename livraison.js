if (document.readyState =='loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready () {
    let supprimerBoutons = document.getElementsByClassName('bouton-supprimer')
    for (let i = 0; i < supprimerBoutons.length; i++) {
        let button = supprimerBoutons[i]
        button.addEventListener('click',supprimerPlat)
    }

    let inputQuantites = document.getElementsByClassName ('quantites-panier')
    for (let i = 0; i < inputQuantites.length; i++){
        let input = inputQuantites[i]
        input.addEventListener('change', quantitesChangees)
    }

    let ajouterPanierBoutons = document.getElementsByClassName ('button-ajouter')
    for (let i = 0; i < ajouterPanierBoutons.length; i++) {
        let button = ajouterPanierBoutons[i]
        button.addEventListener ('click', ajouterPanierClick)
    }

    document.getElementsByClassName('bouton-acheter')[0].addEventListener('click',acheterClick)
}

function acheterClick () {
    alert ('Merci pour votre Achat !')
    let panierPlats = document.getElementsByClassName('panier-plats')[0]
    while (panierPlats.hasChildNodes()){
        panierPlats.removeChild(panierPlats.firstChild)
    }
    updateCartTotal()
}

function supprimerPlat(event) {
    let boutonClick = event.target
    boutonClick.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantitesChangees (event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function ajouterPanierClick (event) {
    let button = event.target
    let platShop = button.parentElement.parentElement
    let titre = platShop.getElementsByClassName ('nom-plat')[0].innerText
    let prix = platShop.getElementsByClassName ('prix')[0].innerText
    ajouterAuPanier (titre,prix)
    updateCartTotal()
}

function ajouterAuPanier (titre, prix) {
    let lignePanier = document.createElement ('div')
    lignePanier.classList.add('ligne-panier')
    let panierPlats = document.getElementsByClassName('panier-plats')[0]
    let panierPlatNoms = panierPlats.getElementsByClassName('nom-plat-panier')
    for (let i = 0; i < panierPlatNoms.length; i++){
        if (panierPlatNoms[i].innerText==titre) {
            alert ('Cet article est déjà dans votre panier !')
            return
        }
    }
    let panierPlatContenu = `
    <div class="panier-plat row">
        <div class="col-5 nom-plat-panier">${titre}</div>
        <div class="col-2 prix-plat-panier">${prix}</div>
        <div class="col-5 quantites">
            <input class="quantites-panier" type="number" value="1">
            <button class="btn btn-danger bouton-supprimer" type="button">Supprimer</button>
        </div>
        </div>
    `
    lignePanier.innerHTML = panierPlatContenu
    panierPlats.append(lignePanier)
    lignePanier.getElementsByClassName('bouton-supprimer')[0].addEventListener('click', supprimerPlat)
    lignePanier.getElementsByClassName('quantites-panier')[0].addEventListener('change', quantitesChangees)
}

function updateCartTotal () {
    let panierContenu = document.getElementsByClassName('panier-plats')[0]
    let lignesPanier = panierContenu.getElementsByClassName('ligne-panier')
    let total = 0
    for (let i = 0; i < lignesPanier.length; i++) {
        let lignePanier = lignesPanier [i]
        let prixElement = lignePanier.getElementsByClassName('prix-plat-panier')[0]
        let quantiteElement = lignePanier.getElementsByClassName('quantites-panier')[0]
        let prix = parseFloat(prixElement.innerText.replace('€', ''))
        let quantites = quantiteElement.value
        total = total + (prix * quantites)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('prix-total-panier')[0].innerText = total + '€'
}