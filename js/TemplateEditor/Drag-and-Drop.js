var GLOBAL_file=null;//Глобальная переменная, хранит выбранный файл
/**
 * drop Событие вызывается, когда пользователь отпускает файл. Если браузер поддерживает DataTransferItemList
 * интерфейс, getAsFile() метод используется для доступа к  файлу; в противном случае свойство DataTransfer
 * интерфейса files используется для доступа к файлу.
 * Любой элемент перетаскивания, который не является файлом, игнорируется.
 * @param ev
 */
function dropHandler(ev) {
    //Запретить поведение по умолчанию (Запретить открытие файла)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        // *Используем интерфейс DataTransferItemList для доступа к файлу*
        // Если перетянутые элементы не являются файлами, отклоните их
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();// Получить первый (и только!) Файл из объекта FileList      
            FileValid(file);
        }
    } else {
        // *Используем интерфейс DataTransferItemList для доступа к файлу*
        var file = ev.dataTransfer.files[0];
        FileValid(file);

    }
}
/**
 * Обработчик отключает стандартное поведение браузера- открытие файла при перетаскивание
 * @param ev
 */
function dragOverHandler(ev) {
    var DropZone = document.getElementById("DropZone");
    DropZone.classList.add("dropFile");//Добавить класс показывающий пользователю, что файл в зоне перетаскивания
    DropZone.classList.remove("dropZoneJSON");//Убрать стандартный внешний вид зоны перетаскивания
    // Запретить поведение по умолчанию (Запретить открытие файла)
    ev.preventDefault();
}

function onMouseOutDropZone() {
    var DropZone = document.getElementById("DropZone");
    DropZone.classList.add("dropZoneJSON");
    DropZone.classList.remove("dropFile");
}

/**
 * Срабатывает на клике по зоне перетаскивания. Открывает окно выбора файла.
 * Служит заменой перетаскивания (стандартный input type='file')
 */
function selectFile() {
    document.getElementById("Input_SelectFile").click();
}

/**
 * Получить файл в глобальную переменную  GLOBAL_file из input type='file'
 */
function getSelectFile() {
    var files = this.files;
    FileValid(files[0]);
  
}


function FileValid(file){
    if(file.name.split('.').pop()==="json"){
        GLOBAL_file = file;
        GetFileContents(GLOBAL_file);
       }else{
        alert("Выбран файл отличный от формата .json")
       }
}

function GetFileContents(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function (e) {
        try {
            var text = reader.result;
            var result = JSON.parse(text);//Перевод из формата JSON в объект js
            localStorage.setItem("CurriculumTemplat", JSON.stringify(result));
            alert("Данные успешно загружены");
            var buttonExportFile = document.getElementById("ExportFile");
            if (buttonExportFile.classList.contains("displayNone")) {
                buttonExportFile.classList.remove("displayNone");
            } 
        } catch {
            GLOBAL_file=null;
            alert("Во время чтения файла произошла ошибка, проверьте корректность содержимого файла");
        }
    }
}