function updateList(recipesList) {
    const newListRecipe = []
    const inputs = document.querySelectorAll(".search__filter input");

    inputs.forEach(input => {
        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");

        filters.forEach(filter => {

            if (filtersSelected.includes(filter.innerText)) {

                filter.remove();

            }

            filter.addEventListener("click", function () {
                filtersSelectedBtn = document.querySelectorAll(".search__result span img");
                const filterType = input.id.replace("-filter--input", "");

                filtersSelected.push(filter.innerText);

                recipesList.forEach(result => {

                    if (filterType === "ingredients") {
                        result.ingredients.forEach(ingre => {
                            if (ingre.ingredient.includes(filter.innerText)) {
                                newListRecipe.push(result);
                            }
                        });
                    }


                    if (filterType === "appliance") {
                        if (result.appliance.includes(filter.innerText)) {
                            newListRecipe.push(result);
                        }
                    }


                    if (filterType === "ustensils") {
                        if (result.ustensils.includes(filter.textContent)) {
                            newListRecipe.push(result);
                        }
                    }


                    if (!newListRecipe.includes(result) && !recipeNotDisplayed.includes(result)) {

                        recipeNotDisplayed.push(result);

                    }
                });

                displayData(newListRecipe).then(r => r);
            });
        });
    });



    filtersSelectedBtn.forEach(btn => {

        btn.addEventListener("click", function () {
            filtersSelectedBtn = document.querySelectorAll(".search__result span img");
            const filterContent = btn.parentNode;

            if (filtersSelected.indexOf(filterContent.innerText) >= 0) {
                filtersSelected.splice(filtersSelected.indexOf(filterContent.innerText), 1);
            }


            recipeNotDisplayed.forEach(result => {

                result.ingredients.forEach(ingre => {
                    if (filtersSelected.every(elem => elem === ingre.ingredient) && !recipesList.includes(result)) {
                        recipesList.push(result);
                    }
                });


                if (filtersSelected.every(elem => elem === result.appliance) && !recipesList.includes(result)) {
                    recipesList.push(result);
                }

                result.ustensils.forEach(ust => {
                    if (filtersSelected.every(elem => elem === ust) && !recipesList.includes(result)) {
                        recipesList.push(result);
                    }
                });




                if (filtersSelected.length <= 0 && !recipesList.includes(result)) {
                    recipesList.push(result)
                }
            });


            filterContent.remove();
            displayData(recipesList).then(r => r);
        });
    });
}