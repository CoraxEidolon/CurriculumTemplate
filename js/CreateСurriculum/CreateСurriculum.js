function CreateСurriculum() {
    var reportElementList = document.getElementsByClassName("js_reportElement");
    var reportObj = {};

    for (var i = 0; i < reportElementList.length; i++) {
        var key = reportElementList[i].getAttribute("data-label");

        if (reportElementList[i].classList.contains("js_list")) {     
            reportObj[key] = CreateList(reportElementList[i].value);
        } else {
               reportObj[key] = reportElementList[i].value;
        }

    } 
    

    console.log(reportObj);

    var r = new FileReader();

    /**
     * Обработчик событий. Срабатывает после успешного чтения файла.
     * Заносит данные массива с метками в документ. Загружает файл на устройство.
     * @param e
     */
        r.onload = function (e) {
            var contents = e.target.result;
            doc = new window.Docxgen(contents);
            var buf = JSON.stringify(reportObj);
            var data = JSON.parse(buf);
            doc.setData(data);
            doc.render();
            out = doc.getZip().generate({
                type: "blob"
            });
            var d = new Date();
            var name = d.getDate()+"."+Number(d.getMonth() + 1)+"."+d.getFullYear()+"_"+d.getHours()+";"+d.getMinutes();
            saveAs(out, "Рабочая программа_"+name+".docx");

        };
            r.readAsBinaryString(GLOBAL_file);//Загружаем файл FileReader'у. После чего срабатывает событие onload и обработчик событий











}


function CreateList(text){
    var tmpAr = GetTextAreaArrayValue(text);
    /*Для формирования маркированного списка нужен массив массивов с соответствующими ключами, формируем его*/
    var objTmp = [];
    for (var i = 0; i < tmpAr.length; i++) {
        var arBuf = {};
        arBuf["ListElem"] = tmpAr[i];
        objTmp.push(arBuf);
    }
return objTmp;
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