import { pageCardRender, numberPage } from "./pageCard.js"
import { previousPage, nextPages } from "./pagination.js";

pageCardRender()
const pagePlus = document.querySelector('.next-page');
const pageMinus = document.querySelector('.minus-page');
pagePlus.addEventListener('click', () => {
    nextPages(numberPage)
    console.log(numberPage)
})
pageMinus.addEventListener('click', () => {
    numberPage = previousPage(numberPage)
    console.log(numberPage)
    return numberPage
})

export function createPageBusket(getCard) {
    const buscetContainer = document.createElement('div')
    buscetContainer.classList.add('buscet-container');

    const buscetTitle = document.createElement('h2')
    buscetTitle.classList.add('buscet-title');
    buscetTitle.textContent = 'Список товаров добавленных в корзину:'


    const buscetContant = document.createElement('div');
    buscetContant.classList.add('buscet-content');
    getCard.forEach((card) => {
        return buscetContant.append(card)
    });

    buscetContainer.append(buscetTitle, buscetContant, createTotalSum())
    return buscetContainer;
}

export function getCard(name, count, currentStr) {
    const currentArr = setMonyAndCurrent(currentStr);
    const mony = currentArr[1];
    const current = currentArr[0];
    totalItemBusket += +current;
    totalSumBusket += +(count * +current);
    console.log(totalSumBusket)
    const item = document.createElement('div');
    item.classList.add('busket-card');

    const nameItem = document.createElement('h3');
    nameItem.classList.add('item-name');
    nameItem.textContent = `${name}`;

    const totalSumItem = document.createElement('p')
    totalSumItem.classList.add('item-sum');
    totalSumItem.textContent = `${count * current} ${mony}`

    const countItem = document.createElement('p');
    countItem.classList.add('item-count');
    countItem.textContent = `${count} шт.`

    const btnPlus = document.createElement('button');
    btnPlus.classList.add('item-btn-plus');
    btnPlus.textContent = '+';
    const btnMinus = document.createElement('button');
    btnMinus.classList.add('item-btn-minus');
    btnMinus.textContent = '-';

    btnPlus.addEventListener('click', (event) => {
        count += 1;
        countItem.textContent = `${count} шт.`
        totalSumItem.textContent = `${(count * current).toFixed(2)} ${mony}`
    })
    btnMinus.addEventListener('click', (event) => {
        if (count > 0) {
            count -= 1;
            countItem.textContent = `${count} шт.`
            totalSumItem.textContent = `${(count * current).toFixed(2)} ${mony}`
        }
    })

    item.append(nameItem, totalSumItem, btnMinus, countItem, btnPlus);
    // document.querySelectorAll('.item-btn-plus').
    return item;
}