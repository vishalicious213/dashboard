const cryptos = ["bitcoin", "dogecoin", "ethereum", "litecoin"]
let cryptoData = []

// ⬇️ EVENT HANDLERS ⬇️

async function getCryptoData(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)

    if (!response.ok) {
        console.log(response.status, response.statusText)
    } else {
        const jsonData = await response.json()
        // renderCrypto(jsonData)
        cryptoData.push(jsonData)
        console.log(cryptoData)
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
    let cryptoString = ""
    console.log("CRYPTO", data)

    cryptoString += `
    <div class="currency">    
        <img src="${data.image.small}">
        <div class="crypto-name">${data.name}</div>
        <div class="crypto-price">$${data.market_data.current_price.usd}</div>
        <div class="crypto-high">▲$${data.market_data.high_24h.usd}</div>
        <div class="crypto-low">▼$${data.market_data.low_24h.usd}</div>
    </div>
`
    document.getElementById("crypto-container").innerHTML = cryptoString
}

renderBackgroundImage()
cryptos.forEach(getCryptoData)