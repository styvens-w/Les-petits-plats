/**
 * Fonction de recherche
 * @param { HTMLElement } inputMain - Le champs de recherche principal
 * @param { Number } caractMin - Le nombres de caractères minimum pour la recherche
 * @param { {recipes: *[]} } array - Le tableau des recettes
 * @param { NodeListOf<Element> } [inputsFilters] - Les champs de recherche pour les filtres
 * @returns {Promise<void>}
 */
async function search(inputMain, caractMin, array, inputsFilters) {
    // On récupère le tableau des recettes
    const {recipes} = array;

    // On crée un nouveau tableau qui contiendra les nouvelles recettes selon la recherche (pour le moment contient toute les recettes)
    const newArray = [...recipes];


    // On ajoute un évènement si le champ de recherche principal change
    inputMain.addEventListener("input", async function () {

        // On vide le tableau des recettes non affiché
        recipeNotDisplayed.splice(0, recipeNotDisplayed.length);
        // On vide le tableau des filtres selectionné
        filtersSelected.splice(0, filtersSelected.length);
        // On suprime les filtres affiché
        document.querySelector(".search__result").innerHTML = "";

        // Si le nombre de caractère du champ principal est supérieur ou égale au nombre défini
        if (inputMain.value.length >= caractMin) {

            // On vide le tableau qui contient les recettes recherché
            newArray.splice(0, newArray.length)

            // On parcour chaque éléments du tableau des recettes
            for (let i = 0; i < recipes.length; i++) {
                // Si le nom de la recette ou sa description contient le mot du champ de recheche
                if (recipes[i].name.sansAccent().includes(this.value.sansAccent()) || recipes[i].description.sansAccent().includes(this.value.sansAccent())) {
                    // Et si le tableau des recettes recherché ne contient pas la recette en question
                    if (!newArray.includes(recipes[i])) {
                        // On l'ajoute au tableau des recettes recherché
                        newArray.push(recipes[i]);
                    }
                }

                // On parcour les ingrédients de la recette
                for (let x = 0; x < recipes[i].ingredients.length; x++) {
                    // Si le nom de l'ingrédient contient le mot du champ de recheche
                    if (recipes[i].ingredients[x].ingredient.sansAccent().includes(this.value.sansAccent())) {
                        // Et si le tableau des recettes recherché ne contient pas la recette en question
                        if (!newArray.includes(recipes[i])) {
                            // On l'ajoute au tableau des recettes recherché
                            newArray.push(recipes[i]);
                        }
                    }
                }
            }

            // On affiche les recettes recherché
            await displayData(newArray);

        } else {

            // Sinon on affiche les recettes du tableau complet
            await displayData(recipes);

        }
    });


    // Si il y a des champs de recherche pour les filtres
    if (inputsFilters) {
        // On les parcours
        for (let i = 0; i < inputsFilters.length; i++) {

            // On leur ajoute un évènement si le champ de recherche change
            inputsFilters[i].addEventListener("input", async function () {
                // On récupère l'id du input et on récupère seulement le premier mot qui correspond a son type (ingredients, appliance ou ustensils)
                const inputType = inputsFilters[i].id.replace("-filter--input", "")

                // Si le type de recherche est "ingredients"
                if (inputType === "ingredients") {
                    // On crée un tableau qui contiendra les nouveaux filtres selon la recherche
                    let filter = [];

                    // On parcour le nouveau tableau (des recettes)
                    for (let x = 0; x < newArray.length; x++) {
                        // On parcours les ingrédients d'une recettes
                        for (let y = 0; y < newArray[x].ingredients.length; y++) {
                            // Si le nom de l'ingrédient contient le mot du champ de recherche
                            if (newArray[x].ingredients[y].ingredient.sansAccent().includes(inputsFilters[i].value.sansAccent())) {
                                // Et si le tableau des nouveaux filtres et les filtres selectionné ne contient pas l'ingredient en question
                                if (!filter.includes(newArray[x].ingredients[y].ingredient) && !filtersSelected.includes(newArray[x].ingredients[y].ingredient)) {
                                    // On l'ajoute au tableau des nouveaux filtres
                                    filter.push(newArray[x].ingredients[y].ingredient);
                                }
                            }
                        }

                        // On supprime la liste de tout les filtres d'ingrédient
                        ingredientsContainer.innerHTML = '';
                        // On appel la fonction createFilter qui vas afficher les nouveaux filtres au conteneur
                        createFilter(filter, ingredientsContainer);
                        // On stocke dans une variable les filtres du conteneur
                        let filters = document.querySelectorAll("." + inputsFilters[i].parentNode.classList[2] + " .dropdown-menu .row span");
                        // On appel la fonction "filterSelect" qui vas leur ajouter un évènement au click pour affiché la filtre séléctionné
                        filtersSelect(filters);
                        // On appel la fonction "updateList" qui vas mèttre a jour la liste des recettes affiché
                        updateList(newArray);
                    }
                }


                if (inputType === "appliance") {
                    let filter = [];

                    for (let x = 0; x < newArray.length; x++) {
                        if (newArray[x].appliance.sansAccent().includes(inputsFilters[i].value.sansAccent())) {
                            if (!filter.includes(newArray[x].appliance) && !filtersSelected.includes(newArray[x].appliance)) {
                                filter.push(newArray[x].appliance);
                            }
                        }

                        appareilsContainer.innerHTML = '';
                        createFilter(filter, appareilsContainer);
                        let filters = document.querySelectorAll("." + inputsFilters[i].parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
                        updateList(newArray);
                    }
                }


                if (inputType === "ustensils") {
                    let filter = [];

                    for (let x = 0; x < newArray.length; x++) {
                        for (let y = 0; y < newArray[x].ustensils.length; y++) {
                            if (newArray[x].ustensils[y].sansAccent().includes(inputsFilters[i].value.sansAccent())) {
                                if (!filter.includes(newArray[x].ustensils[y]) && !filtersSelected.includes(newArray[x].ustensils[y])) {
                                    filter.push(newArray[x].ustensils[y]);
                                }
                            }
                        }

                        ustensilsContainer.innerHTML = '';
                        createFilter(filter, ustensilsContainer);
                        let filters = document.querySelectorAll("." + inputsFilters[i].parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
                        updateList(newArray);
                    }
                }
            });
        }
    }
}