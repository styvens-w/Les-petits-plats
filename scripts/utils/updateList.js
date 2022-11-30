function updateList(element, recipesList) {
    let newListRecipe = []
    let filters = document.querySelectorAll("." + element.parentNode.classList[2] + " .dropdown-menu .row span");
    filtersSelect(filters);

    filters.forEach(filter => {

        if (filtersSelected.includes(filter.innerText)) {
            filter.remove()
        }


        filter.addEventListener("click", function () {
            const filterType = element.id.replace("-filter--input", "");

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


            getFilter(newListRecipe);
            displayData(newListRecipe).then(r => r);

            element.value = "";
        });
    });


    filtersSelectedBtn = document.querySelectorAll(".search__result span img");

    console.log(recipeNotDisplayed);
    filtersSelectedBtn.forEach(btn => {
        btn.addEventListener("click", function () {
            const filterContent = this.parentNode;
            const filterType = filterContent.classList[1].replace("search__result__", "");



            recipeNotDisplayed.forEach(result => {
                if (filterType === "ingredients") {

                    result.ingredients.forEach(ingre => {
                        if (!ingre.ingredient.includes(filterContent.innerText) && !recipesList.includes(result)) {

                            filtersSelected.forEach(filter => {
                                if (ingre.ingredient.includes(filter)) {
                                    recipesList.push(result)
                                    //recipeNotDisplayed.splice(recipeNotDisplayed.indexOf(result), 1);



                                }
                            });
                        }
                    });
                }


                if (filterType === "appliance") {

                }


                if (filterType === "ustensils") {

                }
            });


            if (filtersSelected.includes(filterContent.innerText)) {
                filtersSelected.splice(filtersSelected.indexOf(filterContent.innerText), 1);
            }

            getFilter(recipesList);
            displayData(recipesList).then(r => r);

            filterContent.remove();

        });

    });



}
