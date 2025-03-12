window.onload = function () {
    fetchCryptoData();
    document.getElementById("loadData").onclick = fetchCryptoData;
    document.getElementById("searchInput").onkeyup = filterCryptos;
};

async function fetchCryptoData() {
    let symbols = ["BTCUSDT", "ETHUSDT", "XRPUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"];
    let container = document.getElementById("cryptoContainer");
    container.innerHTML = "";

    let logos = {
        "BTCUSDT": "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        "ETHUSDT": "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "XRPUSDT": "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        "BNBUSDT": "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        "SOLUSDT": "https://cryptologos.cc/logos/solana-sol-logo.png",
        "ADAUSDT": "https://cryptologos.cc/logos/cardano-ada-logo.png"
    };

    for (let symbol of symbols) {
        let url = "https://api.binance.com/api/v3/ticker/24hr?symbol=" + symbol;
        let response = await fetch(url);
        let data = await response.json();

        let card = document.createElement("div");
        card.className = "crypto-card";
        card.setAttribute("data-name", symbol.toLowerCase());

        let logo = document.createElement("img");
        logo.src = logos[symbol]; 
        logo.alt = symbol;
        logo.className = "crypto-logo"; 
        let title = document.createElement("h3");
        title.textContent = symbol.replace("USDT", "");

        let price = document.createElement("p");
        price.textContent = "Precio: $" + Number(data.lastPrice).toFixed(2);

        card.appendChild(logo); 
        card.appendChild(title);
        card.appendChild(price);
        container.appendChild(card);
    }
}

function filterCryptos() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let cards = document.getElementsByClassName("crypto-card");

    for (let card of cards) {
        if (card.getAttribute("data-name").includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    }
}
