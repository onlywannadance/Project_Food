import {getResource} from '../services/services';

function cards () {
// Использование классов для карточек
        // Создание класса карточек
        class MenuCard {
            constructor(src, alt, title, description, price, parentSelector, ...classes) {             // Передаем цену в долларах, parentSelector // classes - название rest оператора, массива с классами
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.description = description;
                this.price = price; 
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);                      // В свойстве this.parent лежит DOM элемент
                this.transfer = 58;                                        // курс рубля
                this.changeToRUB();
            }
    
            changeToRUB() {
                this.price = +this.price * this.transfer;
            }
    
            render () {
                const element = document.createElement('div');
                if(this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                    this.classes.forEach(className => element.classList.add(className));            // для каждого элемента массива classes, обращаемся к element ('div'), в класслист добавляем каждый класс, что находится в массиве
                }
    
                element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.description}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб./день</div>
                    </div> 
                `;  
                this.parent.append(element);                    // добавляем блок item с конец родительского блока
            }
        }
    
        getResource('http://localhost:3000')
            .then(data => {                                                                // Получаем массив с объектами
            data.forEach(({img, altimg, title, description, price}) => {                     // Перебираем объекты и деструктуризируем по частям
                new MenuCard(img, altimg, title, description, price, '.menu .container').render();                            // На основе перебранных свойств 
            });
        });
    
    
            // getResource('http://localhost:3000/menu')
            //     .then(data => createCard(data));
    
            // function createCard(data) {
            //     data.forEach(({img, altimg, title, descr, price}) => {
            //         const element = document.createElement('div');
    
            //         element.classList.add('menu__item');
            //         element.innerHTML = `
            //             <img src=${img} alt=${altimg}>
            //             <h3 class="menu__item-subtitle">${title}</h3>
            //             <div class="menu__item-descr">${descr}</div>
            //             <div class="menu__item-divider"></div>
            //             <div class="menu__item-price">
            //                 <div class="menu__item-cost">Цена:</div>
            //                 <div class="menu__item-total"><span>${price}</span> руб./день</div>
            //             </div> 
            //         `;
    
            //         document.querySelector('.menu .container').append(element);
            //     });
            // }
    
            // Подключение библиотеки axios
    
            // axios.get('http://localhost:3000/menu')
            //     .then(data => {
            //         data.data.forEach(({img, altimg, title, descr, price}) => {                     // Перебираем объекты и деструктуризируем по частям
            //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();                            // На основе перебранных свойств 
            //         });
            //     });
}

export default cards;