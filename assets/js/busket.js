import { createModal } from './modal.js'
const basketCount = document.querySelector('.basket-count')
let count = 0;
let basketTovar = [];
let totalSumBusket = 0;
let totalItemBusket = 0;
let sendForm = {
    items: [],
    customer: {
        phone: '777777777'
    }
}

export function setBusketVariableToDefault() {
    count = 0;
    basketTovar = [];
    totalSumBusket = 0;
    totalItemBusket = 0;
    sendForm = {
        items: [],
        customer: {
            phone: '777777777'
        }
    }
}

export function setCountOnclick() {
    count = ++count;
    return count
}

export function getCountBasket() {
    return count;
}

export function getCardToBascet(id, name, current) {
    if (!ifArrInclude(id)) {
        basketTovar.push([id, name, current])
    } else {
        for (let i = 0; i < basketTovar.length; i++) {
            if (basketTovar[i][0] === id) {
                if (!basketTovar[i][3]) {
                    basketTovar[i][3] = 2;
                } else {
                    basketTovar[i][3] = basketTovar[i][3] + 1;
                }
            }
        }
    }
    console.log(basketTovar);
    return basketTovar;
}

function ifArrInclude(id) {
    let isInclud = false;
    for (let i = 0; i < basketTovar.length; i++) {
        if (basketTovar[i].includes(id)) {
            isInclud = true;
            return isInclud;
        }
    }

    return isInclud;
}


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

    buscetContainer.append(buscetTitle, buscetContant, createTotalSum(), createBtnSend())
    return buscetContainer;
}

export function getCard(name, count, currentStr) {
    const currentArr = setMonyAndCurrent(currentStr);
    const mony = currentArr[1];
    const current = currentArr[0];
    totalItemBusket += count;
    totalSumBusket += +(count * +current);
    sendForm.items.push({
        product: name,
        price: currentStr,
        quantity: count,
    })
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
        console.log(btnPlus.parentNode.childNodes[0].textContent)
        totalItemBusket += 1;
        console.log(sendForm)
        console.log('totalItemBusket' + ' ' + totalItemBusket)
        console.log(sendForm.items[0].product === 'Product 1')
        totalSumBusket += +(current);
        countItem.textContent = `${count} шт.`
        totalSumItem.textContent = `${(count * current).toFixed(2)} ${mony}`
        const totalSum = document.querySelector('.busket-total-sum');
        totalSum.textContent = `Итого ${totalSumBusket.toFixed(2)} USD`
        const totalItem = document.querySelector('.busket-total-item');
        totalItem.textContent = `Всего ${totalItemBusket} товаров`;
        console.log(totalItemBusket)
        changeQuantitySendForm(btnPlus.parentNode.childNodes[0].textContent, count)
    })
    btnMinus.addEventListener('click', (event) => {
        if (count > 0) {
            count -= 1;
            totalItemBusket -= 1;
            totalSumBusket -= +(current);
            countItem.textContent = `${count} шт.`
            totalSumItem.textContent = `${(count * current).toFixed(2)} ${mony}`
            const totalSum = document.querySelector('.busket-total-sum');
            totalSum.textContent = `Итого ${totalSumBusket.toFixed(2)} USD`
            const totalItem = document.querySelector('.busket-total-item');
            totalItem.textContent = `Всего ${totalItemBusket} товаров`;
        }
    })

    item.append(nameItem, totalSumItem, btnMinus, countItem, btnPlus);
    // document.querySelectorAll('.item-btn-plus').
    return item;
}

function setMonyAndCurrent(arr) {
    let mony = '';
    let current = '';

    for (let i of arr) {
        if (Number.isInteger(+i) || i === '.') {
            mony += i;
        } else if (i !== ' ') {
            current = current + '' + i;
        }
    }
    return [mony, current];
}

function createTotalSum() {
    const totalSumContainer = document.createElement('div');
    totalSumContainer.classList.add('busket-total-sum-container');

    const totalSum = document.createElement('div');
    totalSum.classList.add('busket-total-sum');
    totalSum.textContent = `Итого ${totalSumBusket.toFixed(2)} USD`;
    const totalItem = document.createElement('div');
    totalItem.classList.add('busket-total-item');
    totalItem.textContent = `Всего ${totalItemBusket} товаров`;

    totalSumContainer.append(totalItem, totalSum);
    return totalSumContainer;
}

function createBtnSend() {
    const btnSend = document.createElement('button');
    btnSend.classList.add('btn-send');
    btnSend.textContent = 'Оформить заказ';

    btnSend.addEventListener('click', (event) => {
        const formData = new FormData();
        formData.append('order', JSON.stringify(sendForm));

        fetch('https://app.aaccent.su/js/confirm.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then((data) => {
                document.querySelector('body').append(createModal())
                console.log(sendForm)
            })
            .catch(error => console.error(error));
    })
    return btnSend;
}

function changeQuantitySendForm(name, count) {
    for (let i = 0; i < sendForm.items.length; i++)
        if (sendForm.items[i].product === name) {
            console.log(count, ' ' + 'count')
            sendForm.items[i].quantity = count;
        }

}