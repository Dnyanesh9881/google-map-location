let button = document.getElementById("fetch-btn");
button.addEventListener("click", () => {
  const API_KEY = "a059d01100076699ed971258da736401";

  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    const map = document.getElementById("map");
    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${position.coords.latitude}, ${position.coords.longitude}&z=15&output=embed" frameborder="0" style="border:0" class="location-on-map"></iframe>`;

    const latitude = document.querySelector(".latitude");
    const longitude = document.querySelector(".longitude");

    latitude.innerText = `Lat: ${position.coords.latitude}`;
    longitude.innerText = `Long: ${position.coords.longitude}`;
    const weather = document.querySelector(".weather-data");

    async function fetchWheather() {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&lang=en&units=metric`
      );
      let data1 = await response.json();
      weatherAdd(data1);
      console.log(data1);
    }
    function weatherAdd(data) {
      weather.innerHTML = ` <div class="Weather-info">Location: ${data.name}</div>
           <div class="Weather-info">Wind Speed: ${data.wind.speed} Km/h</div>
           <div class="Weather-info">Humidity: ${data.main.humidity} %</div>
           <div class="Weather-info">Time Zone: ${data.timezone}</div>
           <div class="Weather-info">Pressure: ${data.main.pressure} millibars</div>
           <div class="Weather-info">Wind Direction: ${data.name}</div>
           <div class="Weather-info">UV Index: ${data.name}</div>
           <div class="Weather-info">Feels Like: ${data.main.feels_like} °C</div>`;
    }
    fetchWheather();
  }
  let container1 = document.querySelector(".container");
  container1.classList.add("hide");
  let container2 = document.querySelector(".container2");
  container2.classList.remove("hide");
});
