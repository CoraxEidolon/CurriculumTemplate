var GLOBAL_file;//Глобальная переменная, хранит выбранный файл
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
        // Используем интерфейс DataTransferItemList для доступа к файлу
        // Если перетянутые элементы не являются файлами, отклоните их
        if (ev.dataTransfer.items[0].kind === 'file') {
            var file = ev.dataTransfer.items[0].getAsFile();
            GLOBAL_file = file;
            componentInitialization()
        }
    } else {
        // Используем интерфейс DataTransferItemList для доступа к файлу
        GLOBAL_file = ev.dataTransfer.files[0];
        componentInitialization();
    }
}
/**
 * Обработчик отключает стандартное поведение браузера- открытие файла при перетаскивание
 * @param ev
 */
function dragOverHandler(ev) {
    var DropZone = document.getElementById("DropZone");
    DropZone.classList.add("dropFile");//Добавить класс показывающий пользователю, что файл в зоне перетаскивания
    DropZone.classList.remove("dropZone");//Убрать стандартный внешний вид зоны перетаскивания
    // Запретить поведение по умолчанию (Запретить открытие файла)
    ev.preventDefault();
}

function onMouseOutDropZone() {
    var DropZone = document.getElementById("DropZone");
    DropZone.classList.add("dropZone");
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
    GLOBAL_file = files[0];
    componentInitialization();
}












