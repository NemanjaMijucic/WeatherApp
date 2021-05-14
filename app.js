window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationCountry = document.querySelector('.location-country');
    let locationTimezone = document.querySelector('.location-timezone');
    let icon = document.getElementById('icon');
    let feelsLike = document.querySelector('.temperature-feelsLike');
    let windSpeed = document.querySelector('.wind-speed');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2c4ae810fb0582e5bfd2d6d93d8e708d`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data.weather[0].description)
                    const description = data.weather[0].description;
                    temperatureDescription.innerText = description;
                    const temperature = Math.floor(data.main.temp - 273);
                    temperatureDegree.innerText = `temperature: ${temperature} C`;
                    locationTimezone.innerText =  data.name;
                    locationCountry.innerText = data.sys.country;
                    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                    feelsLike.innerText = `feels like: ${Math.round(data.main.feels_like - 273)} C`;
                    windSpeed.innerText = `wind speed: ${data.wind.speed} m/s`;
                    console.log(data);
                })

        });



    }

});