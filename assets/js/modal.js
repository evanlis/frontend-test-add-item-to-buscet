import { pageCardRender } from './pageCard.js'
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
        const body = document.querySelector('body');
        body.textContent = ''
        pageCardRender()
    })

    modalContainer.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            modalContainer.setAttribute('hidden', '');
            const body = document.querySelector('body');
            body.style.overflow = ''
            body.textContent = ''
            pageCardRender()
        }
    })

    return modalContainer;
}
