const body = document.getElementById("body")

// ⬇️ RENDER APP ⬇️

async function renderBackgroundImage() {
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const jsonData = await response.json()
    body.style.backgroundImage = `url(${jsonData.urls.regular})`
}

renderBackgroundImage()