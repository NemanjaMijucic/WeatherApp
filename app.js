"use strict";

import { addZero, convertToCelsius } from "./helperFunctions.js";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const wrapper = document.querySelector("#wrapper");
const dailyWrapper = document.querySelector(".daily");
const titles = document.querySelectorAll(".title");

let time = new Date();
let dayOfWeek = time.getDay();
let hour = addZero(time.getHours());
let min = addZero(time.getMinutes());
wrapper.innerHTML = "<p>Loading...</p>";

(function weatherForecast() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      if (!long || !lat) throw new Error("Allow app to acsess your location");
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2c4ae810fb0582e5bfd2d6d93d8e708d`;

      async function weatherInfo(lat, long) {
        try {
          //gathering weather data for one day
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2c4ae810fb0582e5bfd2d6d93d8e708d`
          );
          if (!res.ok) throw new Error("UPS! Something went wrong.");
          const data = await res.json();
          console.log(data);
          const { temp, feels_like, temp_max, temp_min } = data.main;
          const html = `
          <div class="location">
              <h2 class="location-timezone">Location: ${data.name}</h2>
              <h2 class="location-country">Country: ${data.sys.country}</h2>
              <h2 class="time-holder">Time: ${hour}:${min} </h2>
          </div>
          <div id="weather-info">
               <div id="img">
               <img src = http://openweathermap.org/img/wn/${
                 data.weather[0].icon
               }@4x.png alt="image"/>
                
                </div>
                <div id="temperature">
                <h2 id="temp"> ${convertToCelsius(temp)}<sup>???</sup></h2>
                  <p>Feels like: ${convertToCelsius(feels_like)}<sup>???</sup></p>
                  <p>Temperature max: ${convertToCelsius(
                    temp_max
                  )}<sup>???</sup></p>
                  <p>Temperature min: ${convertToCelsius(
                    temp_min
                  )}<sup>???</sup></p>
                  <p>Description: ${data.weather[0].description}</p>
  
              </div>
          </div>
         
          `;
          wrapper.innerHTML = html;

          //gathering daily weather data
          const dailyWatherInfo = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=2c4ae810fb0582e5bfd2d6d93d8e708d`
          );
          if (!dailyWatherInfo.ok) throw new Error("UPS! Something went wrong");
          const dailyData = await dailyWatherInfo.json();

          const { daily } = dailyData;
          const forecastFordayse = daily.slice(1, 6);
          forecastFordayse.forEach((day) => {
            console.log(day.weather[0].icon);

            if (dayOfWeek >= 7) {
              dayOfWeek = 0;
            }
            let htmlDaily = `
              <div class="daily-weather">
              <h3>${days[dayOfWeek]}</h3>
              <p> ${day.weather[0].description}</p>
              <img src = http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png alt="image"/>
              <p> max: ${convertToCelsius(day.temp.max)}<sup>???</sup></p>
              <p> min: ${convertToCelsius(day.temp.min)}<sup>???</sup></p>
              </div>
            `;
            dayOfWeek++;
            titles.forEach((title) => (title.style.opacity = 1));
            dailyWrapper.innerHTML += htmlDaily;
          });
        } catch (err) {
          wrapper.innerHTML = `<p id="error">${err.message}</p>`;
        }
      }
      weatherInfo(lat, long);
    });
  }
})();
