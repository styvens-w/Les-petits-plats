function receiptsFactory(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils } = data;
    const article = document.createElement('article');


    function getReceiptsCardDOM() {

        article.classList.add("col-4");
        article.classList.add("receipts__list__article");

        const principal = document.createElement('div');
        principal.classList.add('row');


        const sectionImage = document.createElement("section");
        sectionImage.classList.add("col-12");
        sectionImage.classList.add("receipts__list__article__image");


        const sectionInfo = document.createElement("section");
        sectionInfo.classList.add("col-12");
        sectionInfo.classList.add("receipts__list__article__information");
        const title = document.createElement("p");
        title.classList.add("col-12");
        title.classList.add("receipts__list__article__information__title");
        title.textContent = name;
        const times = document.createElement("span");
        times.classList.add("receipts__list__article__information__title__time");
        times.innerHTML = "<img src='public/assets/images/time.png' alt='time.png'>" + time + " min";
        title.appendChild(times);
        sectionInfo.appendChild(title);


        const sectionIngre = document.createElement("section");
        sectionIngre.classList.add("col-6");
        sectionIngre.classList.add("receipts__list__article__ingredients");
        const list = document.createElement("ul");
        ingredients.forEach(ingre => {
            const listElem = document.createElement("li");
            listElem.textContent = ingre.ingredient;

            if (ingre.quantity !== undefined) {
                const span = document.createElement("span");
                listElem.textContent += ": ";
                span.textContent = ingre.quantity;

                if (ingre.unit !== undefined) {
                    if (ingre.unit === "grammes") {
                        span.textContent += " g"
                    } else {
                        span.textContent += " " + ingre.unit.substring(0, 9);
                    }
                }

                listElem.appendChild(span);
            }

            list.appendChild(listElem);
        });

        sectionIngre.appendChild(list);


        const sectionDescr = document.createElement("section");
        sectionDescr.classList.add("col-6");
        sectionDescr.classList.add("receipts__list__article__description");
        sectionDescr.innerHTML = "<p>" + description + "</p>";


        principal.appendChild(sectionImage);
        principal.appendChild(sectionInfo);
        principal.appendChild(sectionIngre);
        principal.appendChild(sectionDescr);
        article.appendChild(principal);

        return (article);
    }

    return { id, name, servings, ingredients, time, description, appliance, ustensils, getReceiptsCardDOM }
}