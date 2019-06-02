/**
 * Формирует выходной файл
 * @constructor
 */
function CreateReport() {
    /*Результирующий массив. Содержащий метку шаблона документа и ее значение.
    * Первоначально заносим в массив данные не требующие обработки и константы*/
    var ReportLabel={
        "Year":document.getElementById("Input_CurrentYear").value,
        "SubjectName":document.getElementById("SubjectsList").value,
        "DevelopedBy":document.getElementById("Input_DevelopedBy").value,
        "DepartmentName":"ВТ",
        "InstituteName":"ИПМКН",
        "ProtocolNumber":document.getElementById("Input_ProtocolNumber").value,
        "PurposeStudy":document.getElementById("Input_PurposeStudy").value
    };

    /*Далее будут методы обработки данных, которые первоначально необходимо обработать, прежде чем заносить в результирующий массив*/

    /**
     * Заносит в массив ReportLabel дату заседания кафедры
     * @constructor
     */
    function GetDateMeetingDepartment () {
        /*Получаем дату заседания кафедры*/
        var DateMeetingDepartment=document.getElementById("Input_DateMeetingDepartment").value;
        DateMeetingDepartment=DateMeetingDepartment.split("-");
        ReportLabel["DateMeetingDepartment_Year"]=DateMeetingDepartment[0];
        ReportLabel["DateMeetingDepartment_Month"]=DateMeetingDepartment[1];
        ReportLabel["DateMeetingDepartment_Day"]= DateMeetingDepartment[2];
    }

    /**
     * Получить задачи изучаемой дисциплины
     * @constructor
     */
    function GetObjectivesSubject() {
        var ObjectivesSubject= document.getElementById("ObjectivesSubject").value;
        var ObjectivesSubjectResult=ObjectivesSubject.trim();//Убираем пустые строки и пробелы в начале и конце
        var Objective= ObjectivesSubjectResult.split(/\n{2,}/g);

        /*Для формирования маркированного списка нужен массив массивов с соответствующими ключами, формируем его*/
        var ObjectivesSubjectArBuf=[];
        for(var i=0; i<Objective.length;i++){
            var arBuf={};
            arBuf["Objective"]=Objective[i];
            ObjectivesSubjectArBuf.push(arBuf);
        }
        ReportLabel["ObjectivesSubject"]=ObjectivesSubjectArBuf;
    }

    /*Вызываем методы обработки данных */
    GetObjectivesSubject();
    GetDateMeetingDepartment();

      var r = new FileReader();

    /**
     * Обработчик событий. Срабатывает после успешного чтения файла.
     * Заносит данные массива с метками в документ. Загружает файл на устройство.
     * @param e
     */
        r.onload = function (e) {
            var contents = e.target.result;
            doc = new window.Docxgen(contents);
            var buf = JSON.stringify(ReportLabel);
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

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(ReportLabel);//Для отладки, потом убрать =) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}