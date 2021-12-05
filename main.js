const TYPE = "data:image/jpeg;base64,"
const SET_NUMBER = 100
let HOST = "http://152.69.165.54"
let images = []
let mainIndex = 0
let previousImage = document.getElementById("previousImage")
let mainImage = document.getElementById("mainImage")
let nextImage = document.getElementById("nextImage")
let previousArrow = document.getElementById("previousArrow")
let nextArrow = document.getElementById("nextArrow")


function getImageSet() {
    const xhr = new XMLHttpRequest()
    let random = Math.floor(Math.random() * 1000 % SET_NUMBER)
    xhr.open("GET", `${HOST}/image-sets/image-set-${random}.json`)
    xhr.responseType = "json"
    return xhr

}

function setImageSources(data) {
    images = data
    updateImages()
    setArrowListeners()
}

async function setImages() {
    new Promise((resolve, reject) => {
        let xhr = getImageSet();
        xhr.onprogress = () => { console.log(xhr.statusText) }
        xhr.onloadend = () => { xhr.status === 200 ? resolve(xhr) : reject(xhr) }
        xhr.send();
    })
    .then(xhr => { setImageSources(xhr.response) })
    .catch(xhr => { console.log("Errors: " + xhr.statusText) })
}

function updateImages() {
    previousImage.setAttribute("src", TYPE + images[getImageIndex(mainIndex - 1)])
    mainImage.setAttribute("src", TYPE + images[mainIndex])
    nextImage.setAttribute("src", TYPE + images[getImageIndex(mainIndex + 1)])
}

function setArrowListeners() {
    previousArrow.addEventListener("click", onPreviousArrow)
    nextArrow.addEventListener("click", onNextArrow)
}

function getImageIndex(index) {
    if (index === -1) {
        return images.length - 1
    } else if (index === images.length) {
        return 0
    } else {
        return index
    }
}

function onPreviousArrow() {
    mainIndex = getImageIndex(--mainIndex)
    updateImages()
}

function onNextArrow() {
    mainIndex = getImageIndex(++mainIndex)
    updateImages()
}

setImages()
