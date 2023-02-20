function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; 

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';  
}

function modal (triggerSelector, modalSelector, modalTimerId) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector); 
                         
    modalTrigger.forEach(button => {
        button.addEventListener('click', () => {
            openModal(modalSelector, modalTimerId); 
        });  
    });                         

    modal.addEventListener('click', (event) => {
        const target = event.target;

        if(target === modal || target.getAttribute('data-close') == '') {                   // условия закрытия модального окна 1)если таргет = модальное окно 2) если атрибут таргета имеет класс data-close
            closeModal(modalSelector);    
        }
    });

    document.addEventListener('keydown', (event) => {                                       // кнопка нажатия

        if(event.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });                                    // таймер открывания модального окна

    function showModalbyScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {             // сравниваем: количество пикселей пролистаных вниз + высоту окна до куда долистали >= проскроленному вниз количеству писелей (-1 потому что без него не работает скрипт =( ))
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalbyScroll);
         }
    }

    window.addEventListener('scroll', showModalbyScroll);
} 

export default modal;
export {closeModal};
export {openModal};