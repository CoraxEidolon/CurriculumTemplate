function onLoad() {
    /*document.getElementById("Matrix").addEventListener("click", OnOffLed);
    document.getElementById("MatrixSize").addEventListener("change", MatrixSize); */
    var DropZone=document.getElementById("DropZone");
    DropZone.addEventListener("drop", dropHandler);
    DropZone.addEventListener("dragover", dragOverHandler);
    DropZone.addEventListener("dragleave", onMouseOutDropZone);
    DropZone.addEventListener("drop",onMouseOutDropZone);
    DropZone.addEventListener("click",selectFile);
    document.getElementById("Input_SelectFile").addEventListener("change", getSelectFile);



    document.getElementById("SubjectsList").addEventListener("click", SelectSubject);

    document.getElementById("CompetencesCurrentSubject").addEventListener("click", CompetencesInfo);
}