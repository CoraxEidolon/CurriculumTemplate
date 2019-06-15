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

    if (target.classList.contains("button_deleteBlock")) {
        DeleteBlock(target);
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
var unit = GetUnitContainer(btnDel, "unitTemplateEditor");
var sectionCount=unit.getElementsByClassName("section").length;

    if (sectionCount < 2) {
        alert("Невозможно удалить все элементы объекта! Объект должен содержать хотя бы один элемент.");
        return false;
    }
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
    var id=Number(unit.id.replace(/[^\d]/g,""));
    for (var firstKey in GLOBAL_BD["Value"][id]["value"]) {
        if (Array.isArray(GLOBAL_BD["Value"][id]["value"][firstKey])) {
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
    div_captionKey.innerText = GLOBAL_BD["Value"][id]["label"]["textKey"];

    var div_captionValue = document.createElement('DIV');
    div_captionValue.classList = "caption";
    div_captionValue.innerText = GLOBAL_BD["Value"][id]["label"]["textValue"];

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
    var validAllLabel = ValidationAllLabels(unit);
    if (validAllLabel === false) {
        return false;
    }
    var labelName = unit.getElementsByClassName("js_labelName");
    labelName = labelName[0];
    var currentId = Number(unit.id.replace(/[^\d]/g, ""));
    if (unit.id.indexOf("Other") >= 0) {
        /* Сохранить "Прочее  */
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

    if (Array.isArray(GLOBAL_BD["Value"][currentId]["value"])) {
        /* Сохраняем массив */
        var labelTitle = unit.getElementsByClassName("js_labelTitle");
        labelTitle = labelTitle[0];
        var valueElement = unit.getElementsByClassName("textareaArray");
        valueElement = valueElement[0];
        var value = GetTextAreaArrayValue(valueElement.value);
        var save = confirm("Выполнить сохранение раздела \"" + GLOBAL_BD["Value"][currentId]["label"]["title"] + "\" ?");
        if (save === true) {
            GLOBAL_BD["Value"][currentId]["label"]["labelName"] = labelName.value;
            GLOBAL_BD["Value"][currentId]["label"]["title"]=labelTitle.value;           
            GLOBAL_BD["Value"][currentId]["value"] = value;
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
        }
    } else {
        /* сохраняем объект */
        var labelTitle = unit.getElementsByClassName("js_labelTitle");
        labelTitle=labelTitle[0];
        var labelTextKey = unit.getElementsByClassName("js_labelTextKey");
        labelTextKey=labelTextKey[0];
        var labelTextValue = unit.getElementsByClassName("js_labelTextValue");
        labelTextValue=labelTextValue[0];
        var processingFunction = unit.getElementsByClassName("js_processingFunction");
        processingFunction = processingFunction[0];

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
                alert("Запись \"" + keyElem.value + "\" уже существует!");
                return false;
            }
        }

        var save = confirm("Выполнить сохранение раздела \"" + GLOBAL_BD["Value"][currentId]["label"]["title"] + "\" ?");
        if (ok === true && save === true) {
            GLOBAL_BD["Value"][currentId]["label"]["labelName"] = labelName.value;
           
            GLOBAL_BD["Value"][currentId]["label"]["title"] = labelTitle.value;
            GLOBAL_BD["Value"][currentId]["label"]["textKey"] = labelTextKey.value;
            GLOBAL_BD["Value"][currentId]["label"]["textValue"] = labelTextValue.value;
            GLOBAL_BD["Value"][currentId]["label"]["processingFunction"] = processingFunction.value;
            GLOBAL_BD["Value"][currentId]["value"] = Result;
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
    if (buttonImportFile.classList.contains("inboxSVG")   ) {
        buttonImportFile.classList.remove("inboxSVG");
        buttonImportFile.classList.add("backToDataSVG");
        buttonImportFile.title="Вернуться к редактированию данных";
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
        if (buttonImportFile.classList.contains("backToDataSVG")) {
            buttonImportFile.classList.remove("backToDataSVG");
            buttonImportFile.classList.add("inboxSVG");
            buttonImportFile.title="Импорт файла";
        }
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

function AddNewBlock(){
    var buf = "<div class='closeContainer'>";
    buf += "<div id='ClosePopupCreateNewElement' class='closePopup closeSVG'></div>";
    buf += "</div>";
    buf += "<div class='newElementTitle'>Добавление нового блока</div>";
    buf += "<div class='textInputLabel'>Имя метки:</div><input id='NewElementLabel' class='js_labelName'><br>";
    buf += "<div class='textInputLabel'>Заголовок:</div><input id='NewElementTitle'><br>";
    buf += "<div class='newElementSubTitle'>Тип элемента:</div>";
    buf += "<div id='NewElementTypeContainer'>";
    buf += "<div id='ElementTypeStandard' class='newElementType newElementTypeSelected'>&#8226; Присутствует список допустимых значений</div><br>";
    buf += "<div id='SubCategoryElemTypeStand' class='subCategoryElemTypeStand'>";
    buf += "<div class='newElementSubTitle'>Тип списка значений:</div>"
    buf += "<div id='SubCategoryArray' class='newElementType subNewElementTypeSelected'>&#9675; Массив (список значений)</div><br>"
    buf += "<div id='SubCategoryObject' class='newElementType'>&#9675; Объект (ключ-значение)</div>"
    buf += "</div>";
    buf += "<div id='ElementTypeOther' class='newElementType'>&#8226; Пользователь должен сам ввести значение</div><br>";
    buf += "</div>";
    buf += "<div class='btnCreateNewElemContainer'>";
    buf += "<div id='CreateNewElement' class='button_createNewElement'>Создать элемент</div>";
    buf += "</div>";
    document.getElementById("PopupAddNewBlockContent").innerHTML=buf;
    document.getElementById("PopupAddNewBlock").style.display="flex";
    document.getElementById("NewElementTypeContainer").addEventListener("click",SelectedNewElementType);
    document.getElementById("ClosePopupCreateNewElement").addEventListener("click",ClosePopupCreateNewElement);
    document.getElementById("CreateNewElement").addEventListener("click", CreateNewElement);
    
}

function ClosePopupCreateNewElement(){
    document.getElementById("NewElementTypeContainer").removeEventListener("click",SelectedNewElementType);
    document.getElementById("CreateNewElement").removeEventListener("click", CreateNewElement);
    document.getElementById("ClosePopupCreateNewElement").removeEventListener("click",ClosePopupCreateNewElement);
    document.getElementById("PopupAddNewBlock").style.display="none"; 
    document.getElementById("PopupAddNewBlockContent").innerHTML="";
    ValidationLabelName();
}

function SelectedNewElementType(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if (target.id==="ElementTypeStandard" || target.id==="ElementTypeOther") {
        var selected = document.getElementById("NewElementTypeContainer").getElementsByClassName("newElementTypeSelected");
        while (true) {
            if (selected.length <= 0) {
                break;
            }
            selected[0].classList.remove("newElementTypeSelected");
        }
        target.classList.add("newElementTypeSelected");
        if(target.id==="ElementTypeStandard"){
            document.getElementById("SubCategoryElemTypeStand").style.display="block";
        }else{
            document.getElementById("SubCategoryElemTypeStand").style.display="none";
        }
    }

    if (target.id==="SubCategoryArray" || target.id==="SubCategoryObject") {
        var selected = document.getElementById("NewElementTypeContainer").getElementsByClassName("subNewElementTypeSelected");
        while (true) {
            if (selected.length <= 0) {
                break;
            }
            selected[0].classList.remove("subNewElementTypeSelected");
        }
        target.classList.add("subNewElementTypeSelected");
    }
}

function CreateNewElement() {
    var valid = ValidationLabelName();
    if (valid === false) {
        alert("Имена меток должны быть уникальны! Проверьте выделенные элементы");
        return false;
    }
    var newElementLabel = document.getElementById("NewElementLabel");
    var newElementTitle = document.getElementById("NewElementTitle");
    if (/^[\w]{3,25}$/g.test(newElementLabel.value) === false) {
        alert("В поле  \"Имя метки\"  разрешены только латинские символы любого регистра, цифры и нижнее подчеркивание. Пробелы не допустимы. Допустимая длинна поля от 3 до 25 символов включительно.");
        return false;
    }

    if (newElementTitle.value.length < 3 || newElementTitle.value.length > 150) {
        alert("Длинна поля \"Заголовок\" должно быть больше 3 символов и не превышать 150 символов!");
        return false;
    }

    var standard = document.getElementById("ElementTypeStandard");
    var other = document.getElementById("ElementTypeOther");
    if (standard.classList.contains("newElementTypeSelected")) {
        var subArray = document.getElementById("SubCategoryArray");
        var subObject = document.getElementById("SubCategoryObject");
        if (subArray.classList.contains("subNewElementTypeSelected")) {
            var bufObj_Array = {
                "value": [],
                "label": {
                    "labelName": newElementLabel.value,
                    "title": newElementTitle.value
                }
            };
            GLOBAL_BD["Value"].push(bufObj_Array);
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
            AddElements();
            ClosePopupCreateNewElement();

        } else {
            if (subObject.classList.contains("subNewElementTypeSelected")) {
                var bufObj_Object = {
                    "value": { "Ключ": "Значение" },
                    "label": {
                        "labelName": newElementLabel.value,
                        "title": newElementTitle.value,
                        "textKey": "Заголовок ключа",
                        "textValue": "Заголовок значения",
                        "processingFunction":"null"
                    }
                };
                GLOBAL_BD["Value"].push(bufObj_Object);
                localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
                AddElements();
                ClosePopupCreateNewElement();
            }
        }
    } else {
        if (other.classList.contains("newElementTypeSelected")) {
            var bufObj_Other = {
                "label": newElementTitle.value,
                "type": 0,
                "labelName": newElementLabel.value
            }
            GLOBAL_BD["Other"].push(bufObj_Other);
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
            AddElements();
            ClosePopupCreateNewElement();

        }
    }

/*Показываем кнопку "экспорт файла" если в localStorage что то есть*/
    if (localStorage.getItem("CurriculumTemplat") !== null) {
        var buttonExportFile = document.getElementById("ExportFile");
        if (buttonExportFile.classList.contains("displayNone")) {
            buttonExportFile.classList.remove("displayNone");
        }
    }
}

function DeleteBlock(btnDeleteBlock) {
    var unit = GetUnitContainer(btnDeleteBlock, "unitTemplateEditor");
    var currentId = Number(unit.id.replace(/[^\d]/g, ""));
    if (unit.id.indexOf("Other") >= 0) {
        /* Удалить "Прочее  */
        var deleteBlockOther = confirm("Выполнить удаление раздела ?");
        if (deleteBlockOther) {
            GLOBAL_BD["Other"].splice(currentId, 1);
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
            AddElements();
        }
        return true;
    } else {
        var deleteBlock = confirm("Выполнить удаление раздела \"" + GLOBAL_BD["Value"][currentId]["label"]["title"] + "\" ?");  
        if (deleteBlock) {
            GLOBAL_BD["Value"].splice(currentId, 1);
            localStorage.setItem("CurriculumTemplat", JSON.stringify(GLOBAL_BD));
            AddElements();
        }  
    }
}

function ValidationAllLabels(unit) {
    var labelName = unit.getElementsByClassName("js_labelName");
    if (labelName.length > 0) {
        labelName = labelName[0];
        if (/^[\w]{3,25}$/g.test(labelName.value) === false) {
            alert("В поле  \"Имя метки\"  разрешены только латинские символы любого регистра, цифры и нижнее подчеркивание. Пробелы не допустимы. Допустимая длинна поля от 3 до 25 символов включительно.");
            return false;
        }
    }

    if (unit.id.indexOf("Other") >= 0) {
        var labelTitleOther = unit.getElementsByClassName("js_otherLabel");
        if (labelTitleOther.length > 0) {
            labelTitleOther = labelTitleOther[0];
            if (labelTitleOther.value.length < 3 || labelTitleOther.value.length > 150) {
                alert("Длинна поля \"Текст перед полем ввода\" должно быть больше 3 символов и не превышать 150 символов!");
                return false;
            }
        }
        return true;
    }

    var labelTitle = unit.getElementsByClassName("js_labelTitle");
    if (labelTitle.length > 0) {
        labelTitle = labelTitle[0];
        if (labelTitle.value.length < 3 || labelTitle.value.length > 150) {
            alert("Длинна поля \"Текст перед полем ввода\" должно быть больше 3 символов и не превышать 150 символов!");
            return false;
        }
    }

    var labelTextKey = unit.getElementsByClassName("js_labelTextKey");
    if (labelTextKey.length > 0) {
        labelTextKey = labelTextKey[0];
        if (labelTextKey.value.length < 3 || labelTextKey.value.length > 50) {
            alert("Длинна поля \"Заголовок ключа\" должно быть больше 3 символов и не превышать 50 символов!");
            return false;
        }
    }

    var labelTextValue = unit.getElementsByClassName("js_labelTextValue");
    if (labelTextValue.length > 0) {
        labelTextValue = labelTextValue[0];
        if (labelTextValue.value.length < 3 || labelTextValue.value.length > 50) {
            alert("Длинна поля \"Заголовок значения\" должно быть больше 3 символов и не превышать 50 символов!");
            return false;
        }
    }

    var processingFunction = unit.getElementsByClassName("js_processingFunction");
    if (processingFunction.length > 0) {
        processingFunction = processingFunction[0];
        if (/^(>>)?[\w]{3,25}$/g.test(processingFunction.value) === false) {
            alert("В поле  \"Имя функции\"  разрешены только латинские символы любого регистра, цифры и нижнее подчеркивание. Пробелы не допустимы. Допустимая длинна поля от 3 до 25 символов включительно.");
            return false;
        }
    }

    return true;
}


   