let ingredients = [];
let appareils = [];
let ustensils = [];


function createFilter(tableau, container) {
    tableau.forEach( text => {
        const span = document.createElement("span");
        span.classList.add("col-4");
        span.textContent = text;
        container.appendChild(span);
    });
}


function styleFilter(element) {
    for (let i = 0; i < element.childNodes.length; i++) {
        element.childNodes[i].removeAttribute("style");
    }

    for (let i = 0; i < element.childNodes.length; i += 3) {
        element.childNodes[i].style.paddingLeft = "32px";
    }
}


async function getReceipts() {

    let getJson = fetch("./data/recipes.json");
    getJson = getJson.then(response => {
        return  response.json();
    });

    const recipes = await getJson.then(json => json.recipes);

    recipes.forEach(reci => {
        reci.ingredients.forEach(ingre => {
            if (ingredients.indexOf(ingre.ingredient) === -1) {
                ingredients.push(ingre.ingredient);
            }
        });

        if (appareils.indexOf(reci.appliance) === -1) {
            appareils.push(reci.appliance);
        }

        reci.ustensils.forEach(uste => {
            if (ustensils.indexOf(uste) === -1) {
                ustensils.push(uste);
            }
        });
    });

    return ({
        recipes: [...recipes]
    });

}


async function displayData(recipes) {

    const recipesSection = document.querySelector(".receipts__list");
    recipes.forEach((recipe) => {
        const recipeModel = receiptsFactory(recipe);

        const recipeCardDOM = recipeModel.getReceiptsCardDOM();

        recipesSection.appendChild(recipeCardDOM);

    });


    const ingredientFilter = document.querySelector(".search__filter__ingredients .dropdown-menu .row");
    createFilter(ingredients, ingredientFilter);
    styleFilter(ingredientFilter);


    const appareilFilter = document.querySelector(".search__filter__appareils .dropdown-menu .row");
    createFilter(appareils, appareilFilter);
    styleFilter(appareilFilter);


    const ustensilFilter = document.querySelector(".search__filter__ustensils .dropdown-menu .row");
    createFilter(ustensils, ustensilFilter);
    styleFilter(ustensilFilter);


    const addFilter = document.querySelectorAll(".dropdown-menu span");
    addFilter.forEach(element => {
        element.addEventListener("click", function () {

            const filterContainer = document.querySelector(".search__result");
            const filterParent = element.parentNode.parentNode;

            const img = document.createElement("img");
            img.src = "public/assets/images/closeFilter.png";
            img.alt = "closeFilter.png";
            img.setAttribute("onclick", "closeFilter(this)");

            const span = document.createElement("span");
            span.classList.add("col-auto");
            span.classList.add("search__result__"+filterParent.getAttribute("aria-labelledby").slice(0, -15));
            span.textContent = element.textContent;

            span.appendChild(img);
            filterContainer.append(span);
            this.remove();


            styleFilter(ustensilFilter);
            styleFilter(ingredientFilter);
            styleFilter(appareilFilter);

        });
    });


    const articles = document.querySelectorAll(".receipts__list__article");
    for (let i = 1; i < articles.length; i += 3) {
        articles[i].style.marginLeft = "50px";
        articles[i].style.marginRight = "50px";
    }


    const filter = document.querySelectorAll(".search__filter .dropdown-menu span");
    for (let i = 0; i < filter.length; i += 3) {
        filter[i].style.paddingLeft = "32px";
    }
}


async function init() {
    const { recipes } = await getReceipts();

    await displayData(recipes);
}


init().then(r => r);