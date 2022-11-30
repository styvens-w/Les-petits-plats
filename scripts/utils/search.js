async function search(inputMain, caractMin, array, inputsFilters) {
    const {recipes} = await array;
    const newArray = [...recipes];


    inputMain.addEventListener("input", async function () {

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


            getFilter(newArray);
            await displayData(newArray);

        } else {

            getFilter(recipes);
            await displayData(recipes);

        }
    });


    if (inputsFilters) {

        inputsFilters.forEach(input => {

            //let filters = document.querySelectorAll("." + input.parentNode.classList[2] + " .dropdown-menu .row span");
            //filtersSelect(filters);

            input.addEventListener("input", function () {
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
                    });

                   updateList(input, newArray);
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

                    });

                    updateList(input, newArray);
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

                    });

                    updateList(input, newArray);
                }
            });


        });
    }
    //console.log(newArray);
}






