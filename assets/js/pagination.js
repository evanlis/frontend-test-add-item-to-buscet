import { renderCard } from './pageCard.js'
const pagePlus = document.querySelector('next-page');
const pageMinus = document.querySelector('minus-page');

export function paginationPage(arr) {
    let pages = [];
    let page = [];
    for (let i = 0; i < arr.length; i++) {
        if (page?.length !== 6) {
            page.push(arr[i]);
        } else {
            pages.push(page);
            page = [];
            page.push(arr[i])
        }
    }
    if (page.length !== 6 & page.length !== 0) {
        pages.push(page)
    }

    return pages;
}


export function nextPages(numberPage) {
    if( numberPage < 1) {
        return ++numberPage

    } else {return numberPage}
    // renderCard(numberPage)
}
export function previousPage(numberPage) {
    if( numberPage > 0) {
        return --numberPage

    } else {return numberPage}

}

export function addClickOnNav (numberPage) {
    const cardContainer = document.querySelector('card-cantainer');
    const pagePlus = document.querySelector('.next-page');
    const pageMinus = document.querySelector('.minus-page');
    const pageNumb = document.querySelector('.numb-page');

    pagePlus.addEventListener('click', () => {
        numberPage = nextPages(numberPage)
        cardContainer.textContent = ''
        renderCard(numberPage)
        pageNumb.textContent = numberPage + 1
    })
    pageMinus.addEventListener('click', () => {
        numberPage = previousPage(numberPage)
        cardContainer.textContent = ''
        renderCard(numberPage)
        pageNumb.textContent = numberPage + 1
    })
}