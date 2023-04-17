import { pageCardRender, setCardVariableToDefault } from './pageCard.js'
import { setBusketVariableToDefault } from './busket.js'
export function createModal() {
    const modalContainer = document.createElement('div')
    modalContainer.classList.add('modal-container');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal-title');

    modalTitle.textContent = 'Ваш заказ оформен! Спасибо!'
    const modalBtn = document.createElement('button');
    modalBtn.classList.add('modal-btn')

    modalBtn.classList.add('modal-btn');
    modalBtn.textContent = 'Закрыть окно'

    modalContent.append(modalTitle, modalBtn);

    modalContainer.append(modalContent);

    modalBtn.addEventListener('click', () => {
        deleteBlockAndAdd()
    })

    modalContainer.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            deleteBlockAndAdd()
            body.style.overflow = ''
        }
    })

    return modalContainer;
}

function deleteBlockAndAdd() {
    const modalContainer = document.querySelector('.modal-container');
    const buscetContainer = document.querySelector('.buscet-container');
    const basketCount = document.querySelector('.basket-count');
    const container = document.querySelector('.container');
    const pagination = document.querySelector('.container-pagination');
    const body = document.querySelector('body');
    setCardVariableToDefault();
    setBusketVariableToDefault();
    modalContainer.remove();
    buscetContainer.remove();
    basketCount.textContent = '0';
    container.style.display = 'flex';
    pagination.style.display = 'flex';
}