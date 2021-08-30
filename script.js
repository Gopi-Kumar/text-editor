const boldBtn = document.querySelector("#bold-btn")
const underlineBtn = document.querySelector("#underline-btn")
const italicBtn = document.querySelector("#italic-btn")
const colorBtn = document.querySelector("#color-btn")

// const newBtn = document.querySelector("#new-btn")
// const txtBtn = document.querySelector("#txt-btn")
// const pdfBtn = document.querySelector("#pdf-btn")


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
    fileName = prompt("Ener your file name");
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