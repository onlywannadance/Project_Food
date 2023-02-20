import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

function forms (formsSelector, modalTimerId) {

    const forms = document.querySelectorAll(formsSelector);

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Спасибо! Скоро мы с вами свяжемся', 
            failure: 'Что-то пошло не так...'
        };

        forms.forEach(item => {
            bindPostData(item);
        }); 

        function bindPostData(form) {        //  привязка постинга данных
            form.addEventListener('submit', (e) => {         // добавляем переменную события чтобы отменить действие по перезагрузке страницы при submit
                e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;                   //меняем атрибут src на message.loading (spinner.svg)
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                margin-top: 15px;
            `;
            //form.append(statusMessage); 
            form.insertAdjacentElement('afterend', statusMessage); // замена вышестоящей строчки для корректного отображения значка загрузки во второй форме

            // const request = new XMLHttpRequest();      // Объект XMLHttpRequest (или, как его кратко называют, «XHR») даёт возможность из JavaScript делать HTTP-запросы к серверу без перезагрузки страницы.
            // request.open('POST', 'server.php');   
            
            const formData = new FormData(form);         // в index.html у input блоков должен быть атрибут name ОБЯЗАТЕЛЬНО

            const json = JSON.stringify(Object.fromEntries(formData.entries()));    //берем formData превращаем его в массив массивов -> превращаем в объект -> превращаем в json -> отправляем на сервер!

           
            postData('http://localhost:3000/requests', json)
            .then(data => { 
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();  // удаляет спиннер прогрузки             
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();          // сброс формы после отправки данных 
            });

            // request.setRequestHeader('Content-type', 'multipart/form-data');         // что именно приходит типы контента заголовков и тп

            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();          // сброс формы после отправки данных 
            //         statusMessage.remove();              
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
            });
        }

        function showThanksModal(message) {
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            openModal('.modal', modalTimerId);

            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                closeModal('.modal');
            }, 8000);
        }
}

export default forms;