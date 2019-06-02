/**
 * Обработчик событий на клики по кнопкам
 * @param {*} event - событие
 */
function ButtonAction(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;

    if (target.classList.contains("button_showHide")) {
        ShowHideContent(target);
    }

    if (target.classList.contains("button_delete")) {
        DeleteElement(target);
    }

    if (target.classList.contains("button_add")) {
        AddNewElement(target);
    }

    if (target.classList.contains("button_save")) {
        SaveElementsValues(target);
    }
}

/**
 * Скрывает показывает контент выбранного блока
 * @param {*} btn - нажатая кнопка "показать/скрыть"
 */
function ShowHideContent(btn) {
    var view = "viewSVG";
    var hide = "hideSVG";
    var unit = GetUnitContainer(btn, "unitTemplateEditor");
    var btnsShowHide = unit.getElementsByClassName("js_mainBtnSH")[0];
    if (btnsShowHide.classList.contains(view)) {
        btnsShowHide.classList.remove(view);
        btnsShowHide.classList.add(hide);
    } else {
        if (btnsShowHide.classList.contains(hide)) {
            btnsShowHide.classList.remove(hide);
            btnsShowHide.classList.add(view);
        }
    }
    var content = unit.getElementsByClassName("js_contentContainer")[0];
    if (content.classList.contains("displayNone")) {
        content.classList.remove("displayNone");
    } else {
        content.classList.add("displayNone");
    }
}

/**
 * Удаляет выбранную секцию
 * @param {*} btnDel -нажатая кнопка "удалить"
 */
function DeleteElement(btnDel) {
    var del = confirm("Вы действительно хотите удалить выбранный элемент?");
    if (del) {
        var section = GetUnitContainer(btnDel, "section");
        section.remove();
    }
}

/**
 * Добавляет новую секцию в текущий блок
 * @param {*} btnAdd -нажатая кнопка "добавить элемент"
 */
function AddNewElement(btnAdd) {
    var unit = GetUnitContainer(btnAdd, "unitTemplateEditor");
    var currentSectuon = GetUnitContainer(btnAdd, "section");
    var content = unit.getElementsByClassName("js_contentContainer")[0];
    var valueArray = false;
    for (var firstKey in GLOBAL_BD[unit.id]["value"]) {
        if (Array.isArray(GLOBAL_BD[unit.id]["value"][firstKey])) {
            valueArray = true;
        }
        break;
    }

    var div_section = document.createElement('DIV');
    div_section.className = "section"

    var div_key = document.createElement('DIV');
    div_key.className = "key";

    var div_value = document.createElement('DIV');
    div_value.className = "value";

    var div_button = document.createElement('DIV');
    div_button.className = "buttonContainer";

    var div_buttonDelete = document.createElement('DIV');
    div_buttonDelete.className = "smallRoundButton button_delete deleteSVG";
    div_buttonDelete.title = "Удалить элемент";

    var div_buttonShowHide = document.createElement('DIV');
    div_buttonShowHide.className = "smallRoundButton button_showHide hideSVG";
    div_buttonShowHide.title = "Скрыть подробную информацию текущего блока";

    var div_buttonAdd = document.createElement('DIV');
    div_buttonAdd.className = "smallRoundButton button_add addSVG"
    div_buttonAdd.title = "Добавить элемент перед текущим";

    div_buttonSave = document.createElement('DIV');
    div_buttonSave.className = "smallRoundButton button_save saveSVG";
    div_buttonSave.title = "Сохранить блок";

    var textarea_key = document.createElement('TEXTAREA');
    textarea_key.className = "js_key textareaInput";

    var textarea_value = document.createElement('TEXTAREA');

    if (valueArray) {
        textarea_value.className = "js_value textareaInput js_valueArray";
    } else {
        textarea_value.className = "js_value textareaInput";
    }

    var div_captionKey = document.createElement('DIV');
    div_captionKey.className = "caption";
    div_captionKey.innerText = GLOBAL_BD[unit.id]["label"]["textKey"];

    var div_captionValue = document.createElement('DIV');
    div_captionValue.classList = "caption";
    div_captionValue.innerText = GLOBAL_BD[unit.id]["label"]["textValue"];

    var div_multiply = document.createElement('DIV');
    div_multiply.className = "multiply multiplySVG";
    div_multiply.title = "Есть поддержка множественного значения. Между новыми значениями пропуск пустая строка.";

    if (valueArray) {
        div_captionValue.appendChild(div_multiply);
    }

    div_key.appendChild(div_captionKey);
    div_key.appendChild(textarea_key);
    div_value.appendChild(div_captionValue);
    div_value.appendChild(textarea_value);
    div_button.appendChild(div_buttonDelete);
    div_button.appendChild(div_buttonShowHide);
    div_button.appendChild(div_buttonAdd);
    div_button.appendChild(div_buttonSave);
    div_section.appendChild(div_key);
    div_section.appendChild(div_value);
    div_section.appendChild(div_button);

    content.insertBefore(div_section, currentSectuon);
}

/**
 * Возвращает необходимый родительский элемент переданного
 * @param {*} elem-Элемент родительский элемент, которого нужно найти 
 * @param {*} stopClass -Класс родительского элемента, при его обнаружении поиск заканчивается
 */
function GetUnitContainer(elem, stopClass) {
    var unit = elem.parentNode;
    while (true) {
        if (unit.classList.contains(stopClass)) {
            break;
        }
        unit = unit.parentNode;
    }
    return unit;
}

/**
 * Сохраняет элементы блока в котором нажата кнопка
 * @param {*} btnSave -кнопка сохранить
 */
function SaveElementsValues(btnSave) {
    var valid = ValidationLabelName();
    if (valid === false) {
        alert("Имена меток должны быть уникальны! Проверьте выделенные элементы");
        return false;
    }
    var unit = GetUnitContainer(btnSave, "unitTemplateEditor");
    var labelName = unit.getElementsByClassName("js_labelName");
    labelName = labelName[0]
    if (unit.id.indexOf("Other") >= 0) {
        var currentId = unit.id;
        currentId = Number(currentId.replace("Other_", ""));
        var otherLabel = unit.getElementsByClassName("js_otherLabel");
        var otherType = unit.getElementsByClassName("js_otherType");

        var save = confirm("Выполнить сохранение раздела ?");
        if (save === true) {
            GLOBAL_BD["Other"][currentId]["label"] = otherLabel[0].value;
            GLOBAL_BD["Other"][currentId]["type"] = otherType[0].selectedIndex;
            GLOBAL_BD["Other"][currentId]["labelName"] = labelName.value;
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
        }
        return true;
    }
    if (Array.isArray(GLOBAL_BD[unit.id]["value"])) {
        var valueElement = unit.getElementsByClassName("textareaArray");
        valueElement = valueElement[0];
        var value = GetTextAreaArrayValue(valueElement.value);
        var save = confirm("Выполнить сохранение раздела \"" + GLOBAL_BD[unit.id]["label"]["title"] + "\" ?");
        if (save === true) {
            GLOBAL_BD[unit.id]["label"]["labelName"] = labelName.value;
            GLOBAL_BD[unit.id]["value"] = value;
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
        }
    } else {
        var ok = true;
        var sectionList = unit.getElementsByClassName("section");
        var Result = {};
        for (var i = 0; i < sectionList.length; i++) {
            var keyElem = sectionList[i].getElementsByClassName("js_key")[0];
            var valueElem = sectionList[i].getElementsByClassName("js_value")[0];
            if (typeof Result[keyElem.value] === "undefined") {
                if (valueElem.classList.contains("js_valueArray")) {
                    Result[keyElem.value] = GetTextAreaArrayValue(valueElem.value);
                } else {
                    Result[keyElem.value] = valueElem.value;
                }
            } else {
                ok = false;
                alert("Запись \"" + keyElem.value + "\" уже существует!")
            }
        }
        var save = confirm("Выполнить сохранение раздела \"" + GLOBAL_BD[unit.id]["label"]["title"] + "\" ?");
        if (ok === true && save === true) {
            GLOBAL_BD[unit.id]["label"]["labelName"] = labelName.value;
            GLOBAL_BD[unit.id]["value"] = Result;
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
        }
    }
}

/**
 * Преобразовывает многострочный текст разделенный пустыми строками в массив, резделитель пустая строка
 * @param {*} valueString - многострочный текст
 */
function GetTextAreaArrayValue(valueString) {
    var tmp = valueString.trim();//Убираем пустые строки и пробелы в начале и конце
    var result = tmp.split(/\n{2,}/g);
    return result;
}
/*Переключение между панелями данных и импортом файлов*/ 
function ShowImportFile() {
    var buttonImportFile = document.getElementById("ImportFile");
    var PanelFileSelection = document.getElementById("StartPanelFileSelection");
    var PageContent = document.getElementById("PageContent");
    var ok = true;
    if (localStorage.getItem("CurriculumTemplat") === null) {
        alert("В базе данных отсутствуют значения! Экспортируйте данные из файла.");
        ok = false;
    }
    if (buttonImportFile.innerText === "Импорт файла") {
        buttonImportFile.innerText = "Перейти к данным";
    }
    if (PanelFileSelection.classList.contains("displayNone")) {
        PanelFileSelection.classList.remove("displayNone");
        ok = false;
    }
    if (PageContent.classList.contains("displayNone") === false) {
        PageContent.classList.add("displayNone");
        ok = false;
    }
    if (ok === true) {
        buttonImportFile.innerText = "Импорт файла";
        AddElements();
        if (PanelFileSelection.classList.contains("displayNone") === false) {
            PanelFileSelection.classList.add("displayNone")
        }
        if (PageContent.classList.contains("displayNone")) {
            PageContent.classList.remove("displayNone");
        }
    }
}

/*Скачивает файл базы в формате json*/
function ExportFile() {
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], { type: 'text/plain' });
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }
            textFile = window.URL.createObjectURL(data);
            return textFile;
        };
    var d = new Date();
    var fileName = "Экспорт от " + d.getDate() + "." + Number(d.getMonth() + 1) + "." + d.getFullYear() + "_" + d.getHours() + "-" + d.getMinutes();
    var text = JSON.stringify(GLOBAL_BD);
    var link = document.createElement('A');;
    link.href = makeTextFile(text);
    link.download = fileName + ".json";
    link.click();
}

/*Проверяет корректность имени введённой метки*/
function ValidationLabelName() {
    var ok = true;
    var labelNameList = document.getElementsByClassName("js_labelName");
    if (labelNameList.length === 0) {
        return null;
    }
    values = [];
    var repeatedElements = [];
    /*Находим все повторяющиеся элементы*/
    for (var i = 0; i < labelNameList.length; i++) {
        var currentValue = labelNameList[i].value;
        if (values.indexOf(currentValue) === -1) {
            values.push(currentValue);
        } else {
            repeatedElements.push(currentValue)
        }
    }
    /*В повторных значениях оставляем только уникальные*/
    var obj = {};
    for (var i = 0; i < repeatedElements.length; i++) {
        var str = repeatedElements[i];
        obj[str] = true;
    }
    repeatedElements = Object.keys(obj);
/*Если значение элемента есть в массиве повторных элементов выделяем его */
    for (var i = 0; i < labelNameList.length; i++) {
        var currentValue = labelNameList[i].value;
        if (repeatedElements.indexOf(currentValue) >= 0) {
            ok = false;
            if (labelNameList[i].classList.contains("alert") === false) {
                labelNameList[i].classList.add("alert");
            }
        } else {
            if (labelNameList[i].classList.contains("alert")) {
                labelNameList[i].classList.remove("alert");
            }
        }
    }
    return ok;
}