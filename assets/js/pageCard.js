import { paginationPage, previousPage, nextPages } from "./pagination.js";
import { setCountOnclick, getCountBasket, getCardToBascet, createPageBusket, getCard } from "./busket.js"
export let numberPage = 0;
let pagesArr = [];
let buskeItems = [];

export function setCardVariableToDefault() {
    numberPage = 0;
    pagesArr = [];
    buskeItems = [];
}

const filterContainer = document.createElement('div');
filterContainer.classList.add('filter-container');

const btnAccept = document.createElement('button')
btnAccept.classList.add('btn-accept');
btnAccept.textContent = 'Применить';
const btnDisable = document.createElement('button')
btnDisable.classList.add('btn-disable');
btnDisable.textContent = 'Х Сбросить';

const filterTitle = document.createElement('h3');
filterTitle.classList.add('filter-title');
filterTitle.textContent = 'Бренды'

const filterForm = document.createElement('form');
filterForm.classList.add('filter-form');

filterContainer.append(filterTitle, filterForm, btnAccept, btnDisable);

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-cantainer');

function createPagination() {
    const container = document.createElement('div');
    container.classList.add('container-pagination');

    const numbPage = document.createElement('p');
    numbPage.classList.add('numb-page');
    numbPage.textContent = '1';
    numbPage.classList.add('page-nav');

    const nextPage = document.createElement('p');
    nextPage.classList.add('next-page');
    nextPage.classList.add('page-nav');
    nextPage.textContent = '+'
    const minusPage = document.createElement('p');
    minusPage.classList.add('minus-page');
    minusPage.classList.add('page-nav');
    minusPage.textContent = '-';
    container.append(minusPage, numbPage, nextPage);
    return container;
}

function createCard(srcLink, cardPrice, currency, cardTitle, id) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardImg = document.createElement('img')
    cardImg.src = srcLink;
    cardImg.classList.add('card-img');

    const price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `${cardPrice} ${currency}`;

    const title = document.createElement('h2');
    title.classList.add('title');
    title.textContent = cardTitle;

    const btnCard = document.createElement('button');
    btnCard.classList.add('btn-card');
    btnCard.id = `btn${id}`
    btnCard.textContent = 'Добавить в корзину';

    card.append(cardImg, title, price, btnCard);

    return card;
};

function createFilter(name, value) {
    const filter = document.createElement('div');
    filter.classList.add('filter-item');

    const filterInput = document.createElement('input');
    filterInput.type = 'checkbox';
    filterInput.id = value;
    filterInput.value = value;

    const filterLabel = document.createElement('label');
    filterLabel.for = value;
    filterLabel.textContent = name;

    filter.append(filterInput, filterLabel);

    filterForm.append(filter)
};

export function renderCard(number) {
    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(cards => {
            pagesArr = paginationPage(cards)
            pagesArr[number].forEach((card) => {
                let cardCard = createCard(
                    card.image,
                    card.regular_price.value,
                    card.regular_price.currency,
                    card.title,
                    card.id)

                cardContainer.append(cardCard);

            });

            const cardss = document.querySelectorAll('.btn-card')
            cardss.forEach((card) => {
                card.addEventListener('click', (event) => {
                    const parrent = card.parentNode
                    const basketCount = document.querySelector('.basket-count');
                    let numb = setCountOnclick()
                    basketCount.textContent = numb;

                    const id = event.target.id
                    buskeItems = getCardToBascet(id,
                        parrent.childNodes[1].textContent,
                        parrent.childNodes[2].textContent)



                });
            })

        })
        .catch(error => console.error(error));
};

function renderFilter() {
    fetch('assets/json/brands.json')
        .then(response => response.json())
        .then(brands => {
            brands.forEach((brand) => {
                createFilter(brand.title, brand.code)
            });
        })
        .catch(error => console.error(error));
};

function createBasket() {
    const basketContainer = document.createElement('div');
    basketContainer.classList.add('basket-container');

    const basket = document.createElement('img');
    basket.src = 'assets/images/basket-shopping-solid.svg';
    basket.classList.add('basket');

    const basketCount = document.createElement('p');
    basketCount.classList.add('basket-count');
    basketCount.textContent = getCountBasket();

    basketContainer.append(basket, basketCount)
    return basketContainer
}

export function pageCardRender() {


    const container = document.createElement('div');
    const pagination = createPagination()
    const buscet = createBasket();
    container.classList.add('container');
    renderCard(numberPage);
    renderFilter();

    container.append(filterContainer, cardContainer, buscet)
    document.querySelector('body').append(container, pagination);
    buscet.addEventListener('click', () => {
        container.style.display = 'none';
        pagination.style.display = 'none';
        let cardItem = buskeItems.map((item) => {
            if (item[3] === undefined) {
                let card = getCard(item[1], 1, item[2]);
                return card

            } else {
                let card = getCard(item[1], item[3], item[2]);
                return card

            }


        })

        document.querySelector('body').append(createPageBusket(cardItem));
    })
    addClickOnNav()

};

function addClickOnNav() {
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

pageCardRender()
