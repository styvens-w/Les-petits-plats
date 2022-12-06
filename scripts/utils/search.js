async function search(inputMain, caractMin, array, inputsFilters) {
    const {recipes} = await array;
    const newArray = [...recipes];


    inputMain.addEventListener("input", async function () {

        recipeNotDisplayed.splice(0, recipeNotDisplayed.length);
        filtersSelected.splice(0, filtersSelected.length);
        document.querySelector(".search__result").innerHTML = "";

        if (inputMain.value.length >= caractMin) {



            newArray.splice(0, newArray.length)

            recipes.forEach(result => {

                if (result.name.sansAccent().includes(this.value.sansAccent()) || result.description.sansAccent().includes(this.value.sansAccent())) {
                    if (!newArray.includes(result)) {
                        newArray.push(result);
                    }
                }

                result.ingredients.forEach(ingredient => {
                    if (ingredient.ingredient.sansAccent().includes(this.value.sansAccent())) {
                        if (!newArray.includes(result)) {
                            newArray.push(result);
                        }
                    }
                });
            });

            await displayData(newArray);

        } else {

            await displayData(recipes);

        }
    });


    if (inputsFilters) {
        inputsFilters.forEach(input => {
            input.addEventListener("input", async function () {
                const inputType = input.id.replace("-filter--input", "")

                if (inputType === "ingredients") {
                    let filter = [];

                    newArray.forEach(result => {
                        result.ingredients.forEach(ing => {
                            if (ing.ingredient.sansAccent().includes(input.value.sansAccent())) {
                                if (!filter.includes(ing.ingredient) && !filtersSelected.includes(ing.ingredient)) {
                                    filter.push(ing.ingredient);
                                }
                            }
                        });

                        ingredientsContainer.innerHTML = '';
                        createFilter(filter, ingredientsContainer);
                        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
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
                        createFilter(filter, appareilsContainer);
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
                        createFilter(filter, ustensilsContainer);
                        let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
                        filtersSelect(filters);
                        updateList(newArray);
                    });
                }
            });
        });
    }
}






