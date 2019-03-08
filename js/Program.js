/**
 * Класс для работы с дисциплинами и их компетенциями
 * @constructor
 */
function Subject() {
    var SelectSubject = document.getElementById("SelectSubject");//Выбранный предмет
    var CurrentSelectSubject = document.getElementById("CurrentSelectSubject");
    var CompetencesCurrentSubject = document.getElementById("CompetencesCurrentSubject");
    var SubjectsList = document.getElementById("SubjectsList");


    /**
     * Осуществляет выбор текущего предмета в меню
     * @param Element - Элемент, на который осуществлен клик
     * @constructor
     */
    this.SelectCurrentSubject = function (Element) {
        SelectSubject.removeAttribute("id");
        Element.id = "SelectSubject";
        CurrentSelectSubject.innerHTML = Element.innerHTML;
    };
    /**
     * Получить компетенции выбранного предмета
     * @constructor
     */
    this.GetCompetences = function () {
        var Competences = Subjects[SelectSubject.innerHTML]["Компетенции"];//Массив компетенций выбранного предмета
        Competences = Competences.split(" ");
        CompetencesCurrentSubject.innerHTML = "";
        for (var i = 0; i < Competences.length; i++) {
            CompetencesCurrentSubject.innerHTML += "<div class='competencesList'><span class='CompetencesSubject-JS'>" + Competences[i] + "</span><div class='questionSVG smallButton'></div><span></span></div>";
        }
    };

    /**
     * Показать/скрыть информацию о компетенции
     * @param Element - Клик по кнопке
     * @constructor
     */
    this.ShowHideCompetencesInfo = function (Element) {
        var next = Element.nextElementSibling;
        if (next.innerHTML.length > 0) {
            next.innerHTML = "";
            Element.classList.remove("okSVG");
            Element.classList.add("questionSVG");
        } else {
            var Competence = Element.previousElementSibling.innerHTML;
            next.innerHTML = Competencies[Competence];
            Element.classList.remove("questionSVG");
            Element.classList.add("okSVG");

        }
    };

    /**
     * Загружаем список дисциплин
     * @constructor
     */
    this.LoadListDisciplines = function () {
        var SubjectsName = Object.keys(Subjects);
        if (SubjectsName.length > 0) {
            SubjectsList.innerHTML = "";
            for (var i = 0; i < SubjectsName.length; i++) {
                SubjectsList.innerHTML += "<span>" + SubjectsName[i] + "</span>";
            }
            SubjectsList.firstElementChild.id = "SelectSubject";//Делаем активной первую запись списка
            CurrentSelectSubject.innerHTML = document.getElementById("SelectSubject").innerHTML;//Добавляем название текущий дисциплины к заголовку раздела компетенций
            /*Получаем и выводим компетенции выбранного предмета*/
            this.GetCompetences();
        }
    };
}



