let button = document.getElementById("fetch-btn");
button.addEventListener("click", () => {
  const API_KEY = "a059d01100076699ed971258da736401";
  const map = document.getElementById("map");
  getLocation();
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition,showError);
    } else {
    //   map.innerText = "Geolocation is not supported by this browser.";
    alert("Allow Location In Your Browser")
    }
  }

  function showPosition(position) {
    
    map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${position.coords.latitude}, ${position.coords.longitude}&z=15&output=embed" frameborder="0" style="border:0" class="location-on-map"></iframe>`;

    const latitude = document.querySelector(".latitude");
    const longitude = document.querySelector(".longitude");

    latitude.innerText = `Lat: ${position.coords.latitude}`;
    longitude.innerText = `Long: ${position.coords.longitude}`;
    const weather = document.querySelector(".weather-data");

    async function fetchWheather() {
        try{
            let response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&lang=en&units=metric`
              );
              let data1 = await response.json();
              weatherAdd(data1);
        }catch{
              weather.innerText="check your API"
        }
    }
    function weatherAdd(data) {
      weather.innerHTML = ` <div class="Weather-info">Location: ${data.name}</div>
           <div class="Weather-info">Wind Speed: ${data.wind.speed} Km/h</div>
           <div class="Weather-info">Humidity: ${data.main.humidity} %</div>
           <div class="Weather-info">Time Zone: ${data.timezone}</div>
           <div class="Weather-info">Pressure: ${data.main.pressure} millibars</div>
           <div class="Weather-info">Wind angle: ${data.wind.deg} degree</div>
           <div class="Weather-info">Country: ${data.sys.country} </div>
           <div class="Weather-info">Feels Like: ${data.main.feels_like} °C</div>`;
    }
    fetchWheather();
  }
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        map.innerHTML = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        map.innerHTML = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        map.innerHTML = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        map.innerHTML = "An unknown error occurred."
        break;
    }
  }
  let container1 = document.querySelector(".container");
  container1.classList.add("hide");
  let container2 = document.querySelector(".container2");
  container2.classList.remove("hide");
});
