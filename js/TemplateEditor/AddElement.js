/*Преобразовывает json в элементы для редактирования*/
function AddElements() {
    GLOBAL_BD = JSON.parse(localStorage.getItem("CurriculumTemplat"));
    var ColumnRight = document.getElementById("ColumnRight");
    var ColumnLeft = document.getElementById("ColumnLeft");
    ColumnLeft.innerHTML = "";
    ColumnRight.innerHTML = "";
    var currentColumn = ColumnLeft;
    for (var GlobalKey in GLOBAL_BD) {
        if (GlobalKey==="Other"){
            if(GLOBAL_BD["Other"].length!==0){
                var ColumnRightOther = document.getElementById("ColumnRightOther");
                var ColumnLeftOther = document.getElementById("ColumnLeftOther");
                ColumnLeftOther.innerHTML = "";
                ColumnRightOther.innerHTML = "";
                var currentColumn = ColumnLeftOther;         
                for(var i=0; i<GLOBAL_BD["Other"].length; i++){
                    currentColumn.innerHTML += AddOtherSection(GLOBAL_BD["Other"][i], i);
                    if (currentColumn === ColumnLeftOther) {
                        currentColumn = ColumnRightOther;
                    } else {
                        currentColumn = ColumnLeftOther;
                    }
                }
                continue;
            }
        }
        var tmp = "";
        tmp = "<div id='" + GlobalKey + "' class='unitTemplateEditor'>";
        tmp += "<h3>" + GLOBAL_BD[GlobalKey]["label"]["title"] + "</h3>";
        tmp += "Имя метки:<input value='" + GLOBAL_BD[GlobalKey]["label"]["labelName"] + "' type='text' class='js_labelName'>";
        tmp += "<br>";
        tmp += "<div class='roundButton button_showHide viewSVG js_mainBtnSH' title='Показать/скрыть подробную информацию текущего блока'></div>";
        tmp += "<div class='js_contentContainer displayNone'>";
        tmp += AddSection(GLOBAL_BD[GlobalKey]["value"], GLOBAL_BD[GlobalKey]["label"]);
        tmp += "</div>";
        tmp += "<br>";
        tmp += "</div>";
        currentColumn.innerHTML += tmp;
        if (currentColumn === ColumnLeft) {
            currentColumn = ColumnRight;
        } else {
            currentColumn = ColumnLeft;
        }
    }
}
/*Добавляет элементы из секции "прочее"*/
function AddOtherSection(value, id) {
    var result = "";
    result= "<div id='Other_" + id + "' class='unitTemplateEditor'>";
    result += "Имя метки:<input value='"+value["labelName"]+"' class='js_labelName' type='text'><br>";
    result += "Текст перед полем ввода:<br><textarea class='textareaOtherLabel js_otherLabel'>" + value["label"] + "</textarea>";
        /*0-текст в строку 1- текст много строк 2- цифры 3-дата 4-список*/ 
        var type = ["Строчный текст", "Многострочный текст", "Цифры", "Дата", "Список"];
        var selectTmp = "<select class='js_otherType'>";
        for (var j = 0; j < type.length; j++) {
            var selected = "";
            if (value["type"] === j) {
                selected = " selected";
            }
            selectTmp += "<option" + selected + ">" + type[j] + "</option>";
        }
        selectTmp += "</select>"
        result += "Тип: " + selectTmp;
        result+="<br><div class='roundButton button_save saveSVG'></div>";
        result += "</div>";
        return result;
}

/*Добавляет новую секцию*/
function AddSection(value, label) {
    var multiply = "<div class='multiply multiplySVG' title='Есть поддержка множественного значения. Между новыми значениями пропуск пустая строка.'></div>";
    var buttonDelete = "<div class='smallRoundButton button_delete deleteSVG' title='Удалить элемент'></div>";
    var buttonAdd="<div class='smallRoundButton button_add addSVG' title='Добавить элемент перед текущим'></div>";
    var buttonSave="<div class='smallRoundButton button_save saveSVG' title='Сохранить блок'></div>";
  
    var smallButtonShowHide = "<div class='smallRoundButton button_showHide hideSVG' title='Скрыть подробную информацию текущего блока'></div>";
    var Result = "";
    if (Array.isArray(value)) {
        var contentTmp = "";
        for (var i = 0; i < value.length; i++) {
            contentTmp += value[i];
            if (i < value.length - 1) {
                contentTmp += "\n\r";
            }
        }
        Result += multiply + "<br>";
        Result += "<textarea class='textareaArray'>" + contentTmp + "</textarea>";
        Result += "<div class='roundButton button_save saveSVG'></div>";
    } else {
        for (var caption in value) {
            Result += "<div class='section'>";
            Result += "<div class='key'>";
            Result += "<div class='caption'>" + label["textKey"] + "</div>";
            Result += "<textarea class='js_key textareaInput'>" + caption + "</textarea>";
            Result += "</div>";
            Result += "<div class='value'>";
            var valueTmp = "";
            var valueResult = value[caption];
            var valueElementArray = "";
            if (Array.isArray(valueResult)) {
                valueElementArray = "js_valueArray"
                Result += "<div class='caption'>" + label["textValue"] + multiply + "</div>";
                for (var i = 0; i < valueResult.length; i++) {
                    valueTmp += valueResult[i];
                    if (i < valueResult.length - 1) {
                        valueTmp += "\n\r";
                    }
                }
            } else {
                Result += "<div class='caption'>" + label["textValue"] + "</div>";
                valueTmp = valueResult;
            }
            Result += "<textarea class='js_value textareaInput " + valueElementArray + "'>" + valueTmp + "</textarea>";
            Result += "</div>";
            Result += "<div class='buttonContainer'>" + buttonDelete + smallButtonShowHide + buttonAdd+buttonSave+"</div>";
            Result += "</div>";
        }
    }
    return Result;
}