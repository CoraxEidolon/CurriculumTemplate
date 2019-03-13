/**
 * Класс для работы с дисциплинами и их компетенциями
 * @constructor
 */
function Subject() {
    var SubjectsList = document.getElementById("SubjectsList");//Выпадающий список с названиями предметов
    var LabelSelectedSubjects = document.getElementsByClassName("selectedSubject");//Массив содержащий метки, куда будет занесено название выбранной дисциплины
    var CompetencesCurrentSubject = document.getElementById("CompetencesCurrentSubject");//Список компетенций выбранного предмета

    /**
     * Показать/скрыть информацию о компетенции
     * @param Element - Клик по кнопке
     * @constructor
     */
    this.ShowHideCompetencesInfo = function (Element) {
        var Container = document.getElementById("CompetencyInfo");

        /*Проверяем наличие выбранной компетенции*/
        if (Element.innerHTML in GLOBAL_Competencies) {
            Container.innerHTML = Element.innerHTML + " - " + GLOBAL_Competencies[Element.innerHTML];
        } else {
            Container.innerHTML = Element.innerHTML + " - К сожалению, информация по выбранной компетенции отсутствует <div class='sadSmileySVG'></div>. Проверьте наличие компетенции в файле списка компетенций  <u>Competencies</u> или корректность соотношения дисциплина-компетенция в файле <u>Subject</u>";
        }
        /*Добавляем "крестик" для закрытия информации по компетенции*/
        Container.innerHTML += "<div id='CloseCompetencesInfo' class='closeCompetencesInfo closeSVG' title='Скрыть подробную информацию о компетенции'></div>";
        /* Добавляем обработчик событий на  "крестик"*/
        document.getElementById("CloseCompetencesInfo").addEventListener("click", CloseCompetencesInfo);
        function CloseCompetencesInfo() {
            document.getElementById("CloseCompetencesInfo").removeEventListener("click", CloseCompetencesInfo);
            Container.innerHTML = "";
        }
    };

    /**
     * Загружаем список дисциплин
     * @constructor
     */
    this.LoadListDisciplines = function () {
        var SubjectsName = Object.keys(GLOBAL_Subjects);//Получить список названия предметов
        if (SubjectsName.length > 0) {
            /*Создаем список предметов*/
            for (var i = 0; i < SubjectsName.length; i++) {
                SubjectsList.innerHTML += "<option>" + SubjectsName[i] + "</option>";
            }
            this.SetSubjectLabel_GetCompetences();
        }
    };

    /**
     * Добавляет название выбранного предмета к меткам
     * Выводит компетенции выбранного предмета
     * @constructor
     */
    this.SetSubjectLabel_GetCompetences = function () {
        /*Добавляем название текущий дисциплины к соответствующим меткам*/
        var SelectedSubject = SubjectsList.value;
        for (var i = 0; i < LabelSelectedSubjects.length; i++) {
            LabelSelectedSubjects[i].innerHTML = SelectedSubject;
        }
        GetCompetences();
    };

    /**
     * Получить компетенции выбранного предмета
     * @constructor
     */
    function GetCompetences() {
        var Competences = GLOBAL_Subjects[SubjectsList.value];//Массив компетенций выбранного предмета
        Competences=Competences.trim();//Убираем лишние пробелы с начала и конца строки
        Competences = Competences.split(/\s+/g);
        CompetencesCurrentSubject.innerHTML = "";
        for (var i = 0; i < Competences.length; i++) {
            CompetencesCurrentSubject.innerHTML += "<div class='competence' title='Что это?'>" + Competences[i] + "</div>";
        }
        CompetencesCurrentSubject.innerHTML += "<div id='CompetencyInfo'></div>"

    };
}






