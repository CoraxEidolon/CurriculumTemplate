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
    document.getElementById("Select_SubjectsList").addEventListener("change", SelectSubject);
    document.getElementById("CompetencesCurrentSubject").addEventListener("click", CompetencesInfo);
    document.getElementById("Download").addEventListener("click", CreateReport);

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    componentInitialization();//Для отладки, потом убрать =) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
}