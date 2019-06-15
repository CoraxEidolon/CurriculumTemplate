var GLOBAL_BD  = JSON.parse(localStorage.getItem("CurriculumTemplat"));
var GLOBAL_objectsList=[];
function AddElementArray() {
    var CompleteDocument = document.getElementById("CompleteDocument");
    var values = GLOBAL_BD["Value"];
   
    for (var i=0; i<values.length; i++ ) {
        if (Array.isArray(values[i]["value"])) {
            var valueArray = values[i]["value"];
            var label = values[i]["label"];
            var result = CreateElementArray(label, valueArray, "Element_"+i);
            CompleteDocument.appendChild(result);
        }
        else if(typeof(values[i]["value"])==="object"){
            GLOBAL_objectsList.push(values[i]);
        }
    }

    for (var i = 0; i < GLOBAL_objectsList.length; i++) {
        var resultObj = CreateElementObject(GLOBAL_objectsList[i]);
        if (resultObj !== false) {
            CompleteDocument.appendChild(resultObj);
        }
    }

    var valuesOther = GLOBAL_BD["Other"];
    if (valuesOther.length>0) {
        for (var i = 0; i < valuesOther.length; i++) {
            var result = CreateElementOther(valuesOther[i], i)
            CompleteDocument.appendChild(result);
        }
    }
}


function CreateElementObject(obj) {
    var funName = obj["label"]["processingFunction"];
    var title = obj["label"]["title"];
    if (/^(>>)[\w]{3,25}$/g.test(funName)) {
        return false;
    }
    if (funName === "null") {
        return false;
    }
    if (funName === "SubjectsHandler") {
        var result = SubjectsHandler(obj);
        return result;
    } else {
        alert("Указанная Вами функция \"" + funName + "\" не найдена. К сожалению объект \"" + title + "\" не может быть использован.");
        return false;
    }
}

function SubjectsHandler(obj){
    var title = obj["label"]["title"];
    function GetCompetenciesHTML(valStr) {
        var resultCompetenciesHTML = "";
        for (var i = 0; i < valStr.length; i++) {
            resultCompetenciesHTML += "<div class='competence' title='Что это?'>" + valStr[i] + "</div>";
        }
        return resultCompetenciesHTML;
    }

var subObj={};
    for (var i = 0; i < GLOBAL_objectsList.length; i++) {
        if (/^(>>SubjectsHandler)$/g.test(GLOBAL_objectsList[i]["label"]["processingFunction"])) {
            subObj=GLOBAL_objectsList[i];
        }
    }

    if(Object.keys(subObj).length === 0){
        alert("Отсутствует объект расширения с компетенциями. К сожалению объект \"" + title + "\" не может быть использован.")
        return false;
    }


    var valueArray = Object.keys(obj["value"]);
    var label = obj["label"];
    var result = CreateElementArray(label, valueArray, "Element_"+ GLOBAL_BD["Value"].indexOf(obj));
    var div_competencies = document.createElement('DIV');
    div_competencies.id = "Competencies";
    var competenciesStr = obj["value"][valueArray[0]];
    div_competencies.innerHTML = GetCompetenciesHTML(competenciesStr);
    var div_competenciesInfo = document.createElement('DIV');
    div_competenciesInfo.id = "CompetenciesInfo";

    var input_CompetencesLabel = document.createElement("INPUT");//Тип компетенции
    input_CompetencesLabel.type ="text";
    input_CompetencesLabel.dataset.label="LabelCompList";
    input_CompetencesLabel.classList=("js_reportElement");
    var textarea_CompetencesList=document.createElement("TEXTAREA");//Значение компетенции
    textarea_CompetencesList.classList=("js_list js_reportElement");
    textarea_CompetencesList.dataset.label="ProfComp";

    var CompetencesLabel=competenciesStr[0].replace(/[^a-яА-Я]/g,"");
    if (CompetencesLabel==="ОК") {
        input_CompetencesLabel.value="- общекультурных компетенций (ОПК):";
    } else
        if (CompetencesLabel==="ОПК") {
            input_CompetencesLabel.value="- общепрофессиональных компетенций (ОПК):";
        } else
            if (CompetencesLabel==="ПК") {
                input_CompetencesLabel.value="- профессиональных компетенций (ПК):";
            }

    for (var j = 0; j < competenciesStr.length; j++) {
        textarea_CompetencesList.value += subObj["value"][competenciesStr[j]] + " (" + competenciesStr[j] + ")" + "\n\r";

    }
    var select_Subjects=result.getElementsByTagName("SELECT");
    /*Обработчик событий на изменение значений в  SELECT*/
    select_Subjects[0].addEventListener("change", function(event){
        event = event || window.event;
        var target = event.target || event.srcElement;
        var competenciesStr = obj["value"][target.value]
        div_competencies.innerHTML = GetCompetenciesHTML(competenciesStr);
        div_competenciesInfo.innerHTML="";
    /* Обновляем поле тип компетенции и значение компетенции */
        var CompetencesLabel = competenciesStr[0].replace(/[^a-яА-Я]/g, "");
        if (CompetencesLabel === "ОК") {
            input_CompetencesLabel.value = "- общекультурных компетенций (ОПК):";
        } else
            if (CompetencesLabel === "ОПК") {
                input_CompetencesLabel.value = "- общепрофессиональных компетенций (ОПК):";
            } else
                if (CompetencesLabel === "ПК") {
                    input_CompetencesLabel.value = "- профессиональных компетенций (ПК):";
                }

        textarea_CompetencesList.value = "";
        for (var j = 0; j < competenciesStr.length; j++) {
            textarea_CompetencesList.value += subObj["value"][competenciesStr[j]] + " (" + competenciesStr[j] + ")." + "\n\r";

        }
    });

    div_competencies.addEventListener("click", function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.classList.contains("competence")) {
            var competenceName = target.innerText;
            var competenceText = subObj["value"][competenceName];
            if (competenceText === "" ||competenceText===undefined ) {             
                  div_competenciesInfo.innerHTML = "<span class='selectElem'>" + competenceName + "</span> - К сожалению, информация по выбранной компетенции отсутствует <div class='sadSmileySVG'></div>";       
            } else {
                div_competenciesInfo.innerHTML = "<span class='selectElem'>" + competenceName + "</span> - " + competenceText;
            }
            div_competenciesInfo.innerHTML += "<div id='CloseCompetencesInfo' class='closeCompetencesInfo closeSVG' title='Скрыть подробную информацию о компетенции'></div>";
            /* Добавляем обработчик событий на  "крестик"*/
            document.getElementById("CloseCompetencesInfo").addEventListener("click", CloseCompetencesInfo);
            function CloseCompetencesInfo() {
                document.getElementById("CloseCompetencesInfo").removeEventListener("click", CloseCompetencesInfo);
                div_competenciesInfo.innerHTML = "";
            }
        }
    });
    
    result.appendChild(div_competencies);
    result.appendChild(div_competenciesInfo); 
    var div_multiply = document.createElement("DIV");
    div_multiply.classList = "multiply multiplySVG";
    div_multiply.title = "Есть поддержка множественного значения. Между новыми значениями пропуск пустая строка.";
    var div_Competences = document.createElement("DIV");
    div_Competences.appendChild(input_CompetencesLabel);  
    div_Competences.appendChild(div_multiply); 
    div_Competences.appendChild(textarea_CompetencesList);
    result.appendChild(div_Competences); 
    return result;
}

function CreateElementArray(label, arrayData, id) {
    var div_section = document.createElement('DIV');
    div_section.classList = "section";
    var div_label = document.createElement('DIV');
    div_label.classList = "label";
    div_label.innerText = label["title"] + ": ";
    var select = document.createElement('SELECT');
    select.id = id;
    select.dataset.label = label["labelName"];
    select.classList = "js_reportElement";
    for (var i = 0; i < arrayData.length; i++) {
        var option = document.createElement('OPTION');
        option.innerText = arrayData[i];
        select.appendChild(option);
    }
    div_section.appendChild(div_label);
    div_section.appendChild(select);
    return (div_section);
}


function CreateElementOther(data, num) {
    var div_section = document.createElement('DIV');
    div_section.classList = "section";
    var div_label = document.createElement('DIV');
    div_label.classList = "label";
    div_label.innerText = data["label"] + ": ";

    /*0-текст в строку 1- текст много строк 2- цифры 3-дата 4-список*/
    if (data["type"] === 1 || data["type"] === 4) {
        var inputElement = document.createElement("TEXTAREA");
        div_label.style = "vertical-align: top;";
        /*Если список*/
        if (data["type"] === 4) {
            var div_multiply = document.createElement("DIV");
            div_multiply.classList = "multiply multiplySVG";
            div_multiply.title = "Есть поддержка множественного значения. Между новыми значениями пропуск пустая строка.";
            inputElement.classList.add("js_list");
            div_label.appendChild(div_multiply);
        }
    } else if (data["type"] === 0 || data["type"] === 2 || data["type"] === 3) {
        var inputElement = document.createElement("INPUT");
        var typeInput = { 0: "text", 2: "number", 3: "date" };
        inputElement.type = typeInput[data["type"]];
    }

    inputElement.id = "Other_" + num;
    inputElement.dataset.label = data["labelName"];
    inputElement.classList.add("js_reportElement");

    div_section.appendChild(div_label);

    if (data["type"] === 1 || data["type"] === 4) {    
var br=document.createElement("BR");
div_section.appendChild(br);
    }
    div_section.appendChild(inputElement);
    return (div_section);
}

function ShowDataSelectionOrFileSelection(select) {
    if (select === "data") {
        /*Скрываем форму загрузки файла и показываем форму заполнения файла*/
        document.getElementById("CompleteDocumentContainer").classList.remove("displayNone");
        document.getElementById("StartPanelFileSelection").classList.add("displayNone");
        document.getElementById("CreateСurriculum").classList.remove("displayNone");
    } else if (select === "file") {
        /*Скрываем форму заполнения файла и показываем форму загрузки файла*/
        document.getElementById("CompleteDocumentContainer").classList.add("displayNone");
        document.getElementById("StartPanelFileSelection").classList.remove("displayNone");
    }
}

/**
 * Преобразовывает многострочный текст разделенный пустыми строками в массив, резделитель пустая строка
 * @param {*} valueString - многострочный текст
 */
function ConvertTextInArray(valueString) {
    var tmp = valueString.trim();//Убираем пустые строки и пробелы в начале и конце
    var result = tmp.split(/\n{2,}/g);
    return result;
}