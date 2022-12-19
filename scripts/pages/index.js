const ingredientsFilter = [];
const appareilsFilter = [];
const ustensilsFilter = [];
const filtersSelected = [];
const recipeNotDisplayed = [];
const ingredientsContainer = document.querySelector(".search__filter__ingredients .dropdown-menu .row");
const appareilsContainer = document.querySelector(".search__filter__appliance .dropdown-menu .row");
const ustensilsContainer = document.querySelector(".search__filter__ustensils .dropdown-menu .row");
let filtersSelectedBtn = document.querySelectorAll(".search__result span img");


/**
 * Supprime l'attribut style et ajoute des marges à certains filtres.
 * @param { * } container - Élément qui contient les filtres
 */
function styleFilter(container) {
    for (let i = 0; i < container.childNodes.length; i++) {
        container.childNodes[i].removeAttribute("style");
    }

    for (let i = 0; i < container.childNodes.length; i += 3) {
        container.childNodes[i].style.paddingLeft = "32px";
    }
}


/**
 * Ajoute les filtres au conteneur.
 * @param { Array } tableau - Tableau des filtres
 * @param { * } container - Élément qui contient les filtres
 */
function createFilter(tableau, container) {
    tableau.forEach( text => {
        const span = document.createElement("span");
        span.classList.add("col-4");
        span.textContent = text;
        container.appendChild(span);
    });

    styleFilter(container);
}


/**
 * Au clic sur un filtre, on crée un filtre similaire pour l'ajouter au conteneur des filtres sélectionné.
 * @param { NodeListOf<Element> } tab - Liste de tous les filtres
 */
function filtersSelect(tab) {
    tab.forEach(element => {
        const filterParent = element.parentNode.parentNode;

        element.addEventListener("click", function () {
            const filterContainer = document.querySelector(".search__result");

            const img = document.createElement("img");
            img.src = "public/assets/images/closeFilter.png";
            img.alt = "closeFilter.png";

            const span = document.createElement("span");
            span.classList.add("col-auto");
            span.classList.add("search__result__"+filterParent.getAttribute("aria-labelledby").slice(0, -15));
            span.textContent = element.textContent;

            span.appendChild(img);
            filterContainer.append(span);

            const inputs = document.querySelectorAll(".search__filter input");
            inputs.forEach(input => {

                // On supprime la valeur des champs de recherche pour les filtres
                input.value = "";
            });

        });
    });
}


/**
 * On récupère les ingrédients, les appareils et les ustensiles des recettes pour les ajouter à leur tableau respectif.
 * @param { Array } tab - Tableau des recettes
 */
function getFilter(tab) {
    ingredientsFilter.splice(0, ingredientsFilter.length);
    appareilsFilter.splice(0, appareilsFilter.length);
    ustensilsFilter.splice(0, ustensilsFilter.length);

    // On boucle sur le tableau des recettes pour les récupérer une à une.
    tab.forEach(reci => {

        // On boucle sur les ingredients d'une recette.
        reci.ingredients.forEach(ingre => {

            // Si le tableau des ingredients ne contient pas l'ingredient de la recette
            if (ingredientsFilter.indexOf(ingre.ingredient) === -1) {

                // On l'ajoute au tableau
                ingredientsFilter.push(ingre.ingredient);
            }
        });

        if (appareilsFilter.indexOf(reci.appliance) === -1) {
            appareilsFilter.push(reci.appliance);
        }

        reci.ustensils.forEach(uste => {
            if (ustensilsFilter.indexOf(uste) === -1) {
                ustensilsFilter.push(uste);
            }
        });
    });
}

/**
 * On récupère les recettes du fichier JSON.
 * @returns { Promise<{recipes: *[]}> } - Retourne le tableau des recettes.
 */
async function getReceipts() {

    let getJson = fetch("./data/recipes.json");
    getJson = getJson.then(response => {
        return  response.json();
    });

    const recipes = await getJson.then(json => json.recipes);

    return ({
        recipes: [...recipes]
    });

}


/**
 * On affiche les recettes et les filtres.
 * @param { Array } recipes - Tableau des recettes
 * @returns {Promise<void>} - Retourne l'état de l'appel.
 */
async function displayData(recipes) {
    const recipesSection = document.querySelector(".receipts__list");

    // On supprime toute les recettes afficher
    recipesSection.innerHTML = "";

    // On boucle sur le tableau des recettes
    recipes.forEach(recipe => {

        // On appel la fonction receiptsFactory qui prend en paramètre chaque photographe pour la stocker dans une variable.
        const recipeModel = receiptsFactory(recipe);

        // On récupère la carte d'une recette qui correspond à ses éléments HTML.
        const recipeCardDOM = recipeModel.getReceiptsCardDOM();

        // Puis on l'ajoute à la section des recettes
        recipesSection.appendChild(recipeCardDOM);

    });

    getFilter(recipes);

    ingredientsContainer.innerHTML = '';
    createFilter(ingredientsFilter, ingredientsContainer);

    appareilsContainer.innerHTML = '';
    createFilter(appareilsFilter, appareilsContainer);

    ustensilsContainer.innerHTML = '';
    createFilter(ustensilsFilter, ustensilsContainer);


    const filter = document.querySelectorAll(".dropdown-menu span");
    filtersSelect(filter);
    updateList(recipes);

    styleFilter(ustensilsContainer);
    styleFilter(ingredientsContainer);
    styleFilter(appareilsContainer);


    const articles = document.querySelectorAll(".receipts__list__article");
    function resize() {
        resizeArticle(articles);
    }
    resize();
    window.onresize = resize;
}


/**
 * Fonction d'initialisation
 * @returns {Promise<void>}
 */
async function init() {
    const { recipes } = await getReceipts();
    await displayData(recipes);

    const searchMain = document.getElementById("search");
    const searchSecondary = document.querySelectorAll(".search__filter input");
    await search(searchMain, 3, await getReceipts(), searchSecondary);
}

init().then(r => r);