const cryptoContainer = document.getElementById("crypto-container")

// ⬇️ EVENT HANDLERS ⬇️

async function getCryptoData() {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")

    if (!response.ok) {
        console.log(response.status, response.statusText)
    } else {
        const jsonData = await response.json()
        renderCrypto(jsonData)
    }
}

// ⬇️ RENDER APP ⬇️

async function renderBackgroundImage() {
    const response = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const jsonData = await response.json()

    if (jsonData.errors) {
        renderDefaultBackgroundImage()
    } else {
        document.body.style.backgroundImage = `url(${jsonData.urls.regular})`
        renderArtistName(jsonData.user.name)
    }
}

async function renderArtistName(name) {
    document.getElementById("artist-name").textContent = `By: ${name}`
}

function renderDefaultBackgroundImage() {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1535961652354-923cb08225a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODYzNTU3NDh8&ixlib=rb-4.0.3&q=80&w=1080)`
    document.getElementById("artist-name").textContent = `By: Simon Berger`
}

function renderCrypto(data) {
    console.log("CRYPTO", data)
    cryptoContainer.innerHTML = `
        <div class="currency">    
            <img src="${data.image.small}">
            <div>${data.name}</div>
        </div>
    `
}

renderBackgroundImage()
getCryptoData()