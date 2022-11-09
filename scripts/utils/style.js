const buttonSearch = document.querySelectorAll(".search__filter button");
const inputSearch = document.querySelectorAll(".search__filter input");

let isFocus = '0';



buttonSearch.forEach(button => {
    let input;
    let parent;
    let menu;
    button.addEventListener("click", function () {

        parent = this.parentNode;
        input = this.nextElementSibling;
        menu = input.nextElementSibling

        if (this.classList.contains('active')) {
            this.classList.remove('active');
            input.classList.remove('active');
        } else {
            this.classList.add('active');
            input.classList.add('active');
        }

        if (parent.classList.contains('active')) {
            parent.classList.remove('active');
        } else {
            parent.classList.add('active');
        }
    });


    button.addEventListener("blur", function () {
        setTimeout(function () {
            if (isFocus === '0') {
                input.classList.remove('active');
                button.classList.remove('active');
                parent.classList.remove("active");
                stop();
            } else {
                menu.classList.add('show');
                menu.removeAttribute('style');
                menu.style.marginTop = "-69px";
                stop();
            }
        }, 100)
    });
});

inputSearch.forEach(input => {
    input.addEventListener('blur', function () {
        const button = this.previousElementSibling;
        const menu = this.nextElementSibling;
        const parent = this.parentNode;

        setTimeout(function () {
            menu.classList.remove('show');
            menu.removeAttribute('style');
            button.classList.remove('active');
            parent.classList.remove("active");
            input.classList.remove('active');
            stop();
        }, 100)
    });
});


function closeFilter(element) {
    const btnAll = element.parentNode;

    btnAll.remove();
}


