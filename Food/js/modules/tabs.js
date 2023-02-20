function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    const tabs = document.querySelectorAll(tabsSelector),                        // подключаем блоки кнопок переключения табов
          tabsContent = document.querySelectorAll(tabsContentSelector),                      // подключаем элемент табов картинка + описание
          tabsParent = document.querySelector(tabsParentSelector);                    // подключаем блок родителя кнопки переключения табов

    function hideTabContent() {                                                       //функция скрытия контента табов
        tabsContent.forEach(item => {                                                 // перебираем контент табов
            item.classList.add('hide');                                               // добавляем класс скрытия контента
            item.classList.remove('show', 'fade');                                    // удаляем класс добавления контента и эффекта fade
        });

        tabs.forEach(item=> {                                                         //перебираем кнопки          
            item.classList.remove(activeClass);                          // удаляем класс активности
        });      
    } 
            
    function showTabContent(i = 0) {               // В ES6 появилась возможность ставить значение по умолчанию, чтобы не передавать его в функцию 
        tabsContent[i].classList.add('show', 'fade');                 // добавляем класс показа контента с эффектом fade                        
        tabsContent[i].classList.remove('hide');                      // удаляем класс скрытия контента
        tabs[i].classList.add(activeClass);              // для i-ого элемента добавляем класс активности
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {    // событие по клику 
        const target = event.target;                    // чтобы каждый раз не писать event.target 

        if(target && target.classList.contains(tabsSelector.slice(1))) {        // сравнение если target существует и его класс содержит tabheader__item + удаление певрого символа "."
             tabs.forEach((item, i) => {                              // перебор кнопок 
                if(target == item) {                                 // если target совпадает с перебираемым элементом 
                    hideTabContent();                                // активируем функцию hide
                    showTabContent(i);                               // активируем функцию showTabContent для i-ого элемента
                }
             });
        }
    });
}

export default tabs;