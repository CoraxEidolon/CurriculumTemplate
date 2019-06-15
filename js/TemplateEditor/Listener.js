var GLOBAL_BD = { "Value": [], "Other": [] };
document.addEventListener("DOMContentLoaded", OnLoad);

function OnLoad() {
    /*События экрана загрузки файла*/
    var DropZone = document.getElementById("DropZone");
    DropZone.addEventListener("drop", dropHandler);
    DropZone.addEventListener("dragover", dragOverHandler);
    DropZone.addEventListener("dragleave", onMouseOutDropZone);
    DropZone.addEventListener("drop", onMouseOutDropZone);
    DropZone.addEventListener("click", selectFile);
    document.getElementById("Input_SelectFile").addEventListener("change", getSelectFile);

    document.getElementById("ImportFile").addEventListener("click", ShowImportFile);
    document.getElementById("ExportFile").addEventListener("click", ExportFile);
    document.getElementById("AddNewElement").addEventListener("click", AddNewBlock);
    document.getElementById("PageContent").addEventListener("click", ButtonAction);
    if (localStorage.getItem("CurriculumTemplat") !== null) {
        AddElements();
        var valid = ValidationLabelName();
        if (valid === false) {
            alert("Имена меток должны быть уникальны! Проверьте выделенные элементы");
        }
        var labelNameList = document.getElementsByClassName("js_labelName");
        for (var i = 0; i < labelNameList.length; i++) {
            labelNameList[i].addEventListener("change", ValidationLabelName);
        }
    } else {
        ShowImportFile();
        var buttonExportFile = document.getElementById("ExportFile");
        if (buttonExportFile.classList.contains("displayNone") === false) {
            buttonExportFile.classList.add("displayNone");
        }
    }
    document.getElementById("PageContent").addEventListener("click", ButtonAction);
}



