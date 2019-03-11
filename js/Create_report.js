var ReportLabel={}

function CreateReport() {


        var r = new FileReader();
        r.onload = function (e) {
            var contents = e.target.result;
            doc = new window.Docxgen(contents);

            var arResult = {};
            arResult["Year"] = document.getElementById("Input_CurrentYear").value;
            var buf = JSON.stringify(arResult);
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
            r.readAsBinaryString(GLOBAL_file);


}