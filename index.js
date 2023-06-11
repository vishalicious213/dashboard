const cryptos = ["bitcoin", "dogecoin", "ethereum", "litecoin"]
let cryptoData = []

// ⬇️ EVENT HANDLERS ⬇️

async function getAllCryptoData() {
    cryptoData = []
    await Promise.all(cryptos.map(crypto => getCryptoData(crypto)))
    renderCrypto(cryptoData)
}

async function getCryptoData(coin) {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)

    if (!response.ok) {
        console.log(response.status, response.statusText)
    } else {
        const jsonData = await response.json()
        cryptoData.push(jsonData)
    }
}

function getCurrentTime() {
    const time = new Date
    renderTime(time.toLocaleTimeString("en-us", {timeStyle: "medium"}))
}

async function getWeather() {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })

        let lat = position.coords.latitude
        let lon = position.coords.longitude

        const response = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial`)

        if (!response.ok) {
            throw new Error("Weather data not available")
        }

        const data = await response.json()
        renderWeather(data)
    } catch (error) {
        console.error(error)
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
    document.getElementById("artist-name").textContent = `Image: ${name}`
}

function renderDefaultBackgroundImage() {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1535961652354-923cb08225a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2ODYzNTU3NDh8&ixlib=rb-4.0.3&q=80&w=1080)`
    document.getElementById("artist-name").textContent = `Image: Simon Berger`
}

function renderCrypto(data) {
    let cryptoString = ""

    data.forEach(item => {
        cryptoString += `
            <div class="currency">    
                <img src="${item.image.small}">
                <div class="crypto-name">${item.name}</div>
                <div class="crypto-price">$${item.market_data.current_price.usd}</div>
                <div class="crypto-high">▲$${item.market_data.high_24h.usd}</div>
                <div class="crypto-low">▼$${item.market_data.low_24h.usd}</div>
            </div>
        `
    })

    document.getElementById("crypto-container").innerHTML = cryptoString
}

function renderTime(time) {
    document.getElementById("time").textContent = time
}

function renderWeather(data) {
    const weatherContainer = document.getElementById("weather-container")
    console.log(data)

    weatherContainer.innerHTML = `
        <div id="weather">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <div id="temp">${Math.round(data.main.temp)}ºF</div>
        </div>
        <div id="city">${data.name}</div>
    `
}

renderBackgroundImage()
getAllCryptoData()
setInterval(getCurrentTime, 1000)
getWeather()