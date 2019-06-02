/**
 * Класс для работы с дисциплинами и их компетенциями
 * @constructor
 */
function Subject() {
    var SubjectsList = document.getElementById("Select_SubjectsList");//Выпадающий список с названиями предметов
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
        SubjectsName=SubjectsName.sort();//Сортируем
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


/**
 * Класс для работы с направлениями подготовки
 * @constructor
 */
function LearningDirection() {
var ListLearningDirection=document.getElementById("Select_LearningDirection");//Список направлений подготовки
    
    /**
     * Загружает направления подготовки
     * @constructor
     */
    this.LoadListLearningDirection = function () {
        for (var i = 0; i < GLOBAL_LearningDirection.length; i++) {
            if (ErrorSearch(i) === false) {
                ListLearningDirection.innerHTML += "<option>" + GLOBAL_LearningDirection[i]["code"] + " " + GLOBAL_LearningDirection[i]["name"] + "</option>";
            }
        }
    };

    /**
     * Проверяет корректность ключей глобального массива направлений подготовки
     * @param i - Итерация для глобального массива направления подготовки
     * @returns {boolean}-Если ключи содержат ошибку то true, ошибок нет false
     * @constructor
     */
    function ErrorSearch(i) {
        var Error = false;
        var LearningDirectionKeys = Object.keys(GLOBAL_LearningDirection[i]);//Получаем ключи массива
        /*Осуществляем проверку корректности ключей массива*/
        /*Выводим сообщения ошибки и их причину*/
        if (LearningDirectionKeys[0] !== "code") {
            alert("В файле 'Направления подготовки' (BD/Learning_direction) допущена ошибка при задания ключа в строке " + (i + 1) + ". Должно быть code, а не " + LearningDirectionKeys[0]);
            Error = true;
        }
        if (LearningDirectionKeys[1] !== "name") {
            alert("В файле 'Направления подготовки' (BD/Learning_direction) допущена ошибка при задания ключа в строке " + (i + 1) + ". Должно быть name, а не " + LearningDirectionKeys[1]);
            Error = true;
        }
        return Error;
    }
}

/**
 * Класс для работы с профилями подготовки
 * @constructor
 */
function TrainingProfile() {
    var ListTrainingProfile=document.getElementById("Select_TrainingProfile");
    //var GLOBAL_TrainingProfile=JSON.parse(Training_profile);


















    /**
     * Загружает список профилей обучения на форму
     * @constructor
     */
    this.LoadListTrainingProfile = function () {
        for (var i = 0; i < GLOBAL_TrainingProfile.length; i++) {
            ListTrainingProfile.innerHTML += "<option>" + GLOBAL_TrainingProfile[i] + "</option>";
        }

    }

}
/**
 * Класс для работы с формой обучения
 * @constructor
 */
class FormStudy {
    constructor() {
        var ListFormStudy = document.getElementById("Select_FormStudy");
        /**
         * Загружает список форм обучения на форму
         * @constructor
         */
        this.LoadListFormStudy = function () {
            for (var i = 0; i < GLOBAL_FormStudy.length; i++) {
                ListFormStudy.innerHTML += "<option>" + GLOBAL_FormStudy[i] + "</option>";
            }
        };
    }
}


function GraduateQualifications() {
var ListGraduateQualifications=document.getElementById("Select_GraduateQualifications");

    this.LoadList=function () {
        for (var i = 0; i < GLOBAL_GraduateQualifications.length; i++) {
            ListGraduateQualifications.innerHTML += "<option>" + GLOBAL_GraduateQualifications[i] + "</option>";
        }
    }

}
