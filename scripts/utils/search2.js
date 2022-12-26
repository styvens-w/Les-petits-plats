/**
 * Fonction de recherche
 * @param { HTMLElement } inputMain - Le champs de recherche principal
 * @param { Number } caractMin - Le nombres de caractères minimum pour la recherche
 * @param { {recipes: *[]} } array - Le tableau des recettes
 * @param { NodeListOf<Element> } [inputsFilters] - Les champs de recherche pour les filtres
 * @returns {Promise<void>}
 */
function search(inputMain, caractMin, array, inputsFilters) {
    // On récupère le tableau des recettes
    const {recipes} = array;

    // On crée un nouveau tableau qui contiendra les nouvelles recettes selon la recherche (pour le moment contient toute les recettes)
    const newArray = [...recipes];


    // On ajoute un évènement si le champ de recherche principal change
    inputMain.addEventListener("input", function () {

        // On vide le tableau des recettes non affiché
        recipeNotDisplayed.splice(0, recipeNotDisplayed.length);
        // On vide le tableau des filtres selectionné
        filtersSelected.splice(0, filtersSelected.length);
        // On suprime les filtres affiché
        document.querySelector(".search__result").innerHTML = "";

        // Si le nombre de caractère du champ principal est supérieur ou égale au nombre défini
        if (inputMain.value.length >= caractMin) {

            // On initialise le temp à 0
            let time = 0;
            // On récupère la date actuel (pour tester les performances)
            let newdate = new Date();
            // On recupère son temps en ms et on la stocke dans une variable
            const fordiff = newdate.getTime();


            // On vide le tableau qui contient les recettes recherché
            newArray.splice(0, newArray.length)

            // On parcour chaque éléments du tableau des recettes
            recipes.forEach(result => {

                // Si le nom de la recette ou sa description contient le mot du champ de recheche
                if (result.name.sansAccent().includes(this.value.sansAccent()) || result.description.sansAccent().includes(this.value.sansAccent())) {
                    // Et si le tableau des recettes recherché ne contient pas la recette en question
                    if (!newArray.includes(result)) {
                        // On l'ajoute au tableau des recettes recherché
                        newArray.push(result);
                    }
                }

                // On parcour les ingrédients de la recette
                result.ingredients.forEach(ingre => {

                    // Si le nom de l'ingrédient contient le mot du champ de recheche
                    if (ingre.ingredient.sansAccent().includes(this.value.sansAccent())) {
                        // Et si le tableau des recettes recherché ne contient pas la recette en question
                        if (!newArray.includes(result)) {
                            // On l'ajoute au tableau des recettes recherché
                            newArray.push(result);
                        }
                    }
                });
            });

            // Si il n'y a pas de recette
            if (newArray.length <= 0) {

                // On l'affiche sur l'écran
                document.querySelector(".receipts__list").innerHTML = "<h1 style='text-align: center'>Aucune recette ne correspond à votre recherche !</h1>";

            } else {
                // Sinon on affiche les recettes recherché
                displayData(newArray).then(r => r);
            }

            // On recupère la nouvelle date actuel a la fin de la fonction (pour tester les performances)
            newdate = new Date();
            // Le temp est égal au temp initial "0" + le temps de la nouvelle date moin le temps de la première date (On obtient le temps d'éxécution de la fonction)
            time = time + (newdate.getTime() - fordiff);
            // On l'affiche dans la console
            console.log("Méthode forEach = " + time + "ms");

        } else {

            // Sinon on affiche les recettes du tableau complet
            displayData(recipes).then(r => r);

        }
    });


    // Si il y a des champs de recherche pour les filtres
    if (inputsFilters) {
        // On les parcours
        inputsFilters.forEach(input => {
            // On leur ajoute un évènement si le champ de recherche change
            input.addEventListener("input", async function () {
                // On récupère l'id du input et on récupère seulement le premier mot qui correspond a son type (ingredients, appliance ou ustensils)
                const inputType = input.id.replace("-filter--input", "")

                // Si le type de recherche est "ingredients"
                if (inputType === "ingredients") {
                    // On crée un tableau qui contiendra les nouveaux filtres selon la recherche
                    let filter = [];

                    // On parcour le nouveau tableau (des recettes)
                    newArray.forEach(result => {
                        // On parcours les ingrédients d'une recettes
                        result.ingredients.forEach(ing => {
                            // Si le nom de l'ingrédient contient le mot du champ de recherche
                            if (ing.ingredient.sansAccent().includes(input.value.sansAccent())) {
                                // Et si le tableau des nouveaux filtres et les filtres selectionné ne contient pas l'ingredient en question
                                if (!filter.includes(ing.ingredient) && !filtersSelected.includes(ing.ingredient)) {
                                    // On l'ajoute au tableau des nouveaux filtres
                                    filter.push(ing.ingredient);
                                }
                            }
                        });

                        // On supprime la liste de tout les filtres d'ingrédient
                        ingredientsContainer.innerHTML = '';

                        // Si il n'y a pas de filtre
                        if (filter.length <= 0) {

                            // On l'affiche sur l'écran
                            ingredientsContainer.innerHTML = "<p style='text-align: center; color: white; font-size: 16px'>Aucun filtre ne correspond à votre recherche !</p>";

                        } else {
                            // Sinon on appel la fonction createFilter qui vas afficher les nouveaux filtres au conteneur
                            createFilter(filter, ingredientsContainer);
                        }


                        // On stocke dans une variable les filtres du conteneur
                        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
                        // On appel la fonction "filterSelect" qui vas leur ajouter un évènement au click pour affiché la filtre séléctionné
                        filtersSelect(filters);
                        // On appel la fonction "updateList" qui vas mèttre a jour la liste des recettes affiché
                        updateList(newArray);
                    });
                }


                if (inputType === "appliance") {
                    let filter = [];

                    newArray.forEach(result => {
                        if (result.appliance.sansAccent().includes(input.value.sansAccent())) {
                            if (!filter.includes(result.appliance) && !filtersSelected.includes(result.appliance)) {
                                filter.push(result.appliance);
                            }
                        }

                        appareilsContainer.innerHTML = '';

                        // Si il n'y a pas de filtre
                        if (filter.length <= 0) {

                            // On l'affiche sur l'écran
                            appareilsContainer.innerHTML = "<p style='text-align: center; color: white; font-size: 16px'>Aucun filtre ne correspond à votre recherche !</p>";

                        } else {
                            // Sinon on appel la fonction createFilter qui vas afficher les nouveaux filtres au conteneur
                            createFilter(filter, appareilsContainer);
                        }

                        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
                        updateList(newArray);
                    });
                }


                if (inputType === "ustensils") {

                    let filter = [];

                    newArray.forEach(result => {
                        result.ustensils.forEach(ust => {

                            if (ust.sansAccent().includes(input.value.sansAccent())) {
                                if (!filter.includes(ust) && !filtersSelected.includes(ust)) {
                                    filter.push(ust);
                                }
                            }
                        });

                        ustensilsContainer.innerHTML = '';

                        // Si il n'y a pas de filtre
                        if (filter.length <= 0) {

                            // On l'affiche sur l'écran
                            ustensilsContainer.innerHTML = "<p style='text-align: center; color: white; font-size: 16px'>Aucun filtre ne correspond à votre recherche !</p>";

                        } else {
                            // Sinon on appel la fonction createFilter qui vas afficher les nouveaux filtres au conteneur
                            createFilter(filter, ustensilsContainer);
                        }

                        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
                        updateList(newArray);
                    });
                }
            });
        });
    }
}