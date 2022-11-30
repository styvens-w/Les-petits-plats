const ingredientsFilter = [];
const appareilsFilter = [];
const ustensilsFilter = [];
const filtersSelected = [];
const recipeNotDisplayed = []
let filtersSelectedBtn;
const ingredientsContainer = document.querySelector(".search__filter__ingredients .dropdown-menu .row");
const appareilsContainer = document.querySelector(".search__filter__appliance .dropdown-menu .row");
const ustensilsContainer = document.querySelector(".search__filter__ustensils .dropdown-menu .row");



function styleFilter(element) {
    for (let i = 0; i < element.childNodes.length; i++) {
        element.childNodes[i].removeAttribute("style");
    }

    for (let i = 0; i < element.childNodes.length; i += 3) {
        element.childNodes[i].style.paddingLeft = "32px";
    }
}


function createFilter(tableau, container) {
    tableau.forEach( text => {
        const span = document.createElement("span");
        span.classList.add("col-4");
        span.textContent = text;
        container.appendChild(span);
    });

    styleFilter(container);
}


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


            styleFilter(ustensilsContainer);
            styleFilter(ingredientsContainer);
            styleFilter(appareilsContainer);

            filtersSelected.push(element.textContent);

        });
    });
}


function getFilter(tab) {
    ingredientsFilter.splice(0, ingredientsFilter.length);
    appareilsFilter.splice(0, appareilsFilter.length);
    ustensilsFilter.splice(0, ustensilsFilter.length);

    tab.forEach(reci => {
        reci.ingredients.forEach(ingre => {
            if (ingredientsFilter.indexOf(ingre.ingredient) === -1) {
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


async function getReceipts() {

    let getJson = fetch("./data/recipes.json");
    getJson = getJson.then(response => {
        return  response.json();
    });

    const recipes = await getJson.then(json => json.recipes);

    getFilter(recipes);

    return ({
        recipes: [...recipes]
    });

}


async function displayData(recipes) {
    const recipesSection = document.querySelector(".receipts__list");
    recipesSection.innerHTML = "";
    recipes.forEach((recipe) => {
        const recipeModel = receiptsFactory(recipe);

        const recipeCardDOM = recipeModel.getReceiptsCardDOM();

        recipesSection.appendChild(recipeCardDOM);

    });


    ingredientsContainer.innerHTML = '';
    createFilter(ingredientsFilter, ingredientsContainer);

    appareilsContainer.innerHTML = '';
    createFilter(appareilsFilter, appareilsContainer);

    ustensilsContainer.innerHTML = '';
    createFilter(ustensilsFilter, ustensilsContainer);

    const inputs = document.querySelectorAll(".search__filter input");
    inputs.forEach(input => {
        updateList(input, recipes);
    });



    const filter = document.querySelectorAll(".dropdown-menu span")
    for (let i = 0; i < filter.length; i += 3) {
        filter[i].style.paddingLeft = "32px";
    }


    const articles = document.querySelectorAll(".receipts__list__article");
    function resize() {
        resizeArticle(articles);
    }
    resize();
    window.onresize = resize;


}



async function init() {
    const { recipes } = await getReceipts();
    await displayData(recipes);

    const searchMain = document.getElementById("search");
    const searchSecondary = document.querySelectorAll(".search__filter input");
    await search(searchMain, 3, await getReceipts(), searchSecondary);
}

init().then(r => r);