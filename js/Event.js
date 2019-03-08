/**
 * Осуществляет выбор текущей дисциплины. Срабатывает по клику на название дисциплины
 * @param event
 * @constructor
 */
function SelectSubject(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.tagName === "SPAN") {
        var Competences = new Subject();
        Competences.SelectCurrentSubject(target);
        /*Получаем и выводим компетенции выбранного предмета*/
        Competences.GetCompetences();
    }
}

/**
 * Выводит/скрывает информацию по компетенции. Срабатывает по клику на соответствующую кнопку
 * @param event
 * @constructor
 */
function CompetencesInfo(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.classList.contains("smallButton")) {
        var Competences = new Subject();
        Competences.ShowHideCompetencesInfo(target);
    }
}