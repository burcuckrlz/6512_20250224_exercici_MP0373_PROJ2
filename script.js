window.onload = function () {
    loadData();
    document.querySelector("#loadData").onclick = loadData;
    document.querySelector("#searchInput").onkeyup = searchCrypto;
};

async function loadData() {
    let coins = [
        "BTCUSDT", "ETHUSDT", "XRPUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT",
        "DOGEUSDT", "DOTUSDT", "MATICUSDT", "LTCUSDT", "AVAXUSDT", "TRXUSDT",
        "LINKUSDT", "XLMUSDT", "ATOMUSDT"
    ];
    let container = document.querySelector("#cryptoContainer");
    container.innerHTML = "";

    let logos = {
        BTCUSDT: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        ETHUSDT: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        XRPUSDT: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
        BNBUSDT: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        SOLUSDT: "https://cryptologos.cc/logos/solana-sol-logo.png",
        ADAUSDT: "https://cryptologos.cc/logos/cardano-ada-logo.png",
        DOGEUSDT: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
        DOTUSDT: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        MATICUSDT: "https://cryptologos.cc/logos/polygon-matic-logo.png",
        LTCUSDT: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
        AVAXUSDT: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
        TRXUSDT: "https://cryptologos.cc/logos/tron-trx-logo.png",
        LINKUSDT: "https://cryptologos.cc/logos/chainlink-link-logo.png",
        XLMUSDT: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
        ATOMUSDT: "https://cryptologos.cc/logos/cosmos-atom-logo.png"
    };

    for (let coin of coins) {
        let url = `https://api.binance.com/api/v3/ticker/24hr?symbol=${coin}`;
        let response = await fetch(url);
        let data = await response.json();

        let card = document.createElement("div");
        card.className = "crypto-card";
        card.dataset.name = coin.toLowerCase();

        let logo = document.createElement("img");
        logo.src = logos[coin];
        logo.alt = coin;
        logo.className = "crypto-logo"; 

        let title = document.createElement("h3");
        title.textContent = coin.replace("USDT", "");

        let price = document.createElement("p");
        let lastPrice = Number(data.lastPrice);
        let formattedPrice = lastPrice.toFixed(2);
        price.textContent = "Precio: $" + formattedPrice;

        card.appendChild(logo);
        card.appendChild(title);
        card.appendChild(price);
        container.appendChild(card);
        
    }
}

function searchCrypto() {
    let search = document.querySelector("#searchInput").value.toLowerCase();
    let cards = document.querySelectorAll(".crypto-card");

    cards.forEach(card => {
        if (card.dataset.name.includes(search)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}
