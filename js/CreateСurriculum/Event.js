/**
 * Срабатывает при выборе дисциплины.
 * @constructor
 */
function SelectSubject() {
        var SelectCurrentSubject = new Subject();
    SelectCurrentSubject.SetSubjectLabel_GetCompetences();
}

/**
 * Выводит информацию по компетенции. Срабатывает по клику на соответствующую кнопку
 * @param event
 * @constructor
 */
function CompetencesInfo(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.classList.contains("competence")) {
        var Competences = new Subject();
        Competences.ShowHideCompetencesInfo(target);
    }
}
