/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

//Ждем загрузки структуры страницы 'DOMContentLoaded', чтобы не было ошибок

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    //-------------------------------------------------------------------
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('form.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]');


    // Реализуем работу формы по добавлению фильмов

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;           // .value полуаем значение введенного текста
        const favorite = checkbox.checked;      // .checked получаем значение чекбокса

        if (newFilm) {                          // проверяем на пустую строку условием

            if(newFilm.length > 21) {           // обрезаем длинные названия фильмов
                newFilm = `${newFilm.substring(0, 22)}...`
            }

            if (favorite) {                     // выводим сообщение favorite movie
                console.log("You've added a favorite movie");
            }

            movieDB.movies.push(newFilm);       // добавляем новый фильм в датабазу
            sortArray(movieDB.movies);          // сортируем по алфавиту

            createMovieList(movieDB.movies, movieList); // перестраиваем список фильмов по новой
        }

        event.target.reset();                    // сбрасываем саму форму
    })
    
    
        // 1) Удаляем рекламу на странице
    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        })
    }  
    
   
    const makeChanges = () => {
        // 2) Меняем жанра фильма
        genre.textContent = "драма";
            
        // 3) Меняем задний фон
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    }


    const sortArray = (arr) => {
        arr.sort(); // сортируем по алфавиту
    }
    
    
    // 4) Меняем фильмы на фильмы из базы данных
    function createMovieList(films, parent) {
        sortArray(films);           // вызываем сортировку прямо во время создания фильмов
    
        parent.innerHTML = "";  // сначала удалим статичную верстку, чтобы поставить туда свои
    
    // помещаем новые элементы в список фильмов
        films.forEach((film, i) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">${i+1} ${film}
                <div class="delete"></div>
            </li>
            `;
        });  
        // += дополнительное присваивание 
        // здесь использован чтобы ДОБАВИТЬ новый элемент к существующему, а не заменить его
        // пример 
        // a = a +1;
        // a += 1;



        // Удаляем фильмы по нажатию на корзинку

        // После построения всего списка собираем все корзины и вешаем на них EventListener
        document.querySelectorAll('.delete').forEach((btn, i) => {
           btn.addEventListener('click', () => {
            btn.parentElement.remove();             // Удаляем родительский элемент со страницы
            movieDB.movies.splice(i, 1);            //Splice (откуда начать удалять, сколько элементов удалить)
            
            
            // Используем рекурсию (когда функция вызывает сама себя) и перестраиваем фильмы после удаления, 
            // чтобы не нарушался порядок фильмов и цифра соответствовала
            createMovieList(films, parent);
           }); 
        });
    }

    
  
    
    deleteAdv(adv);
    makeChanges();
    createMovieList(movieDB.movies, movieList);

})

