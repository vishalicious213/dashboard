const artistName = document.getElementById("artist-name")

// ⬇️ RENDER APP ⬇️

async function renderBackgroundImage() {
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const jsonData = await response.json()
    document.body.style.backgroundImage = `url(${jsonData.urls.regular})`

    renderArtistName(jsonData.user.name)
}

async function renderArtistName(name) {
    document.getElementById("artist-name").textContent = `By: ${name}`
}

renderBackgroundImage()