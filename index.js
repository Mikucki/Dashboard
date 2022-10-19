fetch(
  "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
)
  .then((res) => res.json())
  .then((data) => {
    let backgroudnImage = data.urls.full;
    document.body.style.backgroundImage = `url('${backgroudnImage}')`;
    document.getElementById("author").innerText = `Foto by: ${data.user.name}`;
  })
  .catch((err) => {
    let backgroudnImage =
      "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NjYwMzExNTI&ixlib=rb-1.2.1&q=80";
    document.body.style.backgroundImage = `url('${backgroudnImage}')`;
  });

fetch(
  "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false"
)
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("crypto").innerHTML = `
        <div class="crypto-logo">
            <img src="${data.image.small}" />
            <h2 class="crypto-name">${data.name}</h2>
        </div> 
        <div>
            <h3 class="data">Current Price: ${data.market_data.current_price.pln}</h3>
            <h3>Todays High: <span class="high data">${data.market_data.high_24h.pln}</span></h3>
            <h3>Todays Low: <span class="low data">${data.market_data.low_24h.pln}</span></h3>
        <div>
        `;
  })
  .catch((err) => {});

function getCurrentTime() {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString(
    "en-us",
    { timeStyle: "short" }
  );
}

navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error("Weather data not available");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("weather").innerHTML = `
                <div class="location">
                    <img class="nonepad-img" src="http://openweathermap.org/img/wn/${
                      data.weather[0].icon
                    }@2x.png" />
                    <h2 class="nonepad" >${Math.round(data.main.temp)}°C</h2>
                </div>
                <div class="location-name">
                    <h2 class="location-name-name">${data.name}</h2>
                </div>
            `;
    })
    .catch((err) => console.error(err));
});

setInterval(getCurrentTime, 1);
