function onLoad() {
    /*События экрана загрузки файла*/
    var DropZone = document.getElementById("DropZone");
    DropZone.addEventListener("drop", dropHandler);
    DropZone.addEventListener("dragover", dragOverHandler);
    DropZone.addEventListener("dragleave", onMouseOutDropZone);
    DropZone.addEventListener("drop", onMouseOutDropZone);
    DropZone.addEventListener("click", selectFile);
    document.getElementById("Input_SelectFile").addEventListener("change", getSelectFile);
    /////////////////////////////////////////////////////////////////////////////////////////
 document.getElementById("CreateСurriculum").addEventListener("click",CreateСurriculum);

    AddElementArray();
}