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

function renderDefaultBackgroundImage() {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1535961652354-923cb08225a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODYzNTU3NDh8&ixlib=rb-4.0.3&q=80&w=1080)`
    document.getElementById("artist-name").textContent = `By: Simon Berger`
}

renderBackgroundImage().catch(renderDefaultBackgroundImage)