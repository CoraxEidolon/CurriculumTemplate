function componentInitialization() {
    /*Скрываем форму загрузки файла и показываем форму заполнения файла*/
    document.getElementById("CompleteDocument").classList.remove("displayNone");
    document.getElementById("StartPanelFileSelection").classList.add("displayNone");

    /*Получить текущую дату*/
    var dateNow = new Date();
    document.getElementById("Input_CurrentYear").value = dateNow.getFullYear();

    /*Загружаем список дисциплин*/
    var LoadListDisciplines = new Subject();
    LoadListDisciplines.LoadListDisciplines();


}