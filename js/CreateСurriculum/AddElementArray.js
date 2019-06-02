var GLOBAL_BD  = JSON.parse(localStorage.getItem("CurriculumTemplat"));


function AddElementArray() {
    var CompleteDocument = document.getElementById("CompleteDocument");
    for (var key in GLOBAL_BD ) {
        if (key === "Other") {
            for (var i = 0; i < GLOBAL_BD[key].length; i++) {
                var result = CreateElementOther(GLOBAL_BD[key][i], i)
                CompleteDocument.appendChild(result);
            }
            continue;
        }
        if (Array.isArray(GLOBAL_BD[key]["value"])) {
            var valueArray = GLOBAL_BD[key]["value"];
            var label = GLOBAL_BD[key]["label"];
            var result = CreateElementArray(label, valueArray, key);
            CompleteDocument.appendChild(result);
        }else if(typeof(GLOBAL_BD[key]["value"])==="object"){
            var result=CreateElementObject(key);
            if (result!==false){
            CompleteDocument.appendChild(result);
            }
        }
    }
}


function CreateElementObject(key) {
    if (key === "Subjects") {
        function GetCompetenciesHTML(valStr) {
            var resultCompetenciesHTML = "";
            for (var i = 0; i < valStr.length; i++) {
                resultCompetenciesHTML += "<div class='competence' title='Что это?'>" + valStr[i] + "</div>";
            }
            return resultCompetenciesHTML;
        }

        var valueArray = Object.keys(GLOBAL_BD[key]["value"]);
        var label = GLOBAL_BD[key]["label"];
        var result = CreateElementArray(label, valueArray, key);
        var div_competencies = document.createElement('DIV');
        div_competencies.id = "Competencies";
        var competenciesStr = GLOBAL_BD[key]["value"][valueArray[0]]
        div_competencies.innerHTML = GetCompetenciesHTML(competenciesStr);
        var div_competenciesInfo = document.createElement('DIV');
        div_competenciesInfo.id = "CompetenciesInfo";


        var select_Subjects=result.getElementsByTagName("SELECT");
        select_Subjects[0].addEventListener("change", function(event){
            event = event || window.event;
            var target = event.target || event.srcElement;
            var competenciesStr = GLOBAL_BD[key]["value"][target.value]
            div_competencies.innerHTML = GetCompetenciesHTML(competenciesStr);
            div_competenciesInfo.innerHTML="";
        });


        div_competencies.addEventListener("click", function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if (target.classList.contains("competence")) {
                var competenceName = target.innerText;
                var competenceText = GLOBAL_BD["Competencies"]["value"][competenceName];
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
        return result;
    }

    return false;

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