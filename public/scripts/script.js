const boldBtn = document.querySelector("#bold-btn")
const underlineBtn = document.querySelector("#underline-btn")
const italicBtn = document.querySelector("#italic-btn")
const colorBtn = document.querySelector("#color-btn")



const content = document.querySelector("#content")

boldBtn.addEventListener("click", () => {
    document.execCommand("bold")
})

underlineBtn.addEventListener("click", () => {
    document.execCommand("underline")
})

italicBtn.addEventListener("click", () => {
    document.execCommand("italic")
})

colorBtn.addEventListener("input", () => {
    document.execCommand("forecolor", false, colorBtn.value)
})

function newFile(){
    content.innerHTML = ""
}

let fileName;
function saveAsText(){
    fileName = document.getElementById("document_name").innerText;
    const a = document.createElement("a")
    const blob = new Blob([content.innerText])
    const dataUrl = URL.createObjectURL(blob)
    a.href = dataUrl
    a.download = fileName + ".txt"
    a.click()
}

function saveAsPdf(){
    fileName = prompt("Ener your file name");
    html2pdf().from(content).save(fileName);
}

function changeFont(val){
    document.body.style.fontFamily = val;
}

function changeFontSize(val){
    content.style.fontSize = val +"px";
}


document.getElementById("openFile").onchange = async (e)=>{
    let file = e.target.files;
    if(file.length === 1){
        if(file[0].type === "text/plain"){
            await handleUpload(file[0]);                      
        }else{
            alert("Select only text file.")
        }
    }else{
        alert("Select one file only");
    }
};

function handleUpload(file){
    var data = new FormData();
    data.append("myfile", file);
        
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            let result = JSON.parse(this.responseText);
            content.innerText = result.data;
            let name = result.name;
            let newName = '';
            for(let i=0; i<(name.length - 4); i++){
                newName += name[i];
            }
            document.getElementById("document_name").innerText = newName;

        }

    });

    xhr.open("POST", "/openfile");
    xhr.send(data);
}
