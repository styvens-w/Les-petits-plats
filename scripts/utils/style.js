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


function resizeArticle(element) {
    for (let i = 0; i < element.length; i++) {
        element[i].removeAttribute("style");
    }

    if (window.innerWidth >= 1400) {

        for (let i = 1; i < element.length; i += 3) {
            element[i].style.marginLeft = "50px";
            element[i].style.marginRight = "50px";
        }

    }
    if (window.innerWidth < 1400) {

        for (let i = 1; i < element.length; i += 3) {
            element[i].style.marginLeft = "15px";
            element[i].style.marginRight = "15px";
        }

    }
    if (window.innerWidth < 1200) {

        for (let i = 1; i < element.length; i += 2) {
            element[i].style.marginLeft = "30px";
            element[i].style.marginRight = "0";
        }

    }
    if (window.innerWidth < 992) {

        for (let i = 1; i < element.length; i += 2) {
            element[i].style.marginLeft = "10px";
            element[i].style.marginRight = "0";
        }

    }
    if (window.innerWidth < 768) {

        for (let i = 1; i < element.length; i += 2) {
            element[i].removeAttribute("style");
        }

    }
}


String.prototype.sansAccent = function(){
    const accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /\321/g, /\361/g, // N, n
        /\307/g, /\347/g, // C, c
    ];
    const noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    let str = this;
    for(let i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str.toLowerCase();
}