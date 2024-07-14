import "./style.css";

const tempDisplay = document.querySelector(".temp");
const conditionsDisplay = document.querySelector(".conditions");
const iconDisplay = document.querySelector(".icon");
const convertBtn = document.querySelector(".unitGroup");
convertBtn.setAttribute("style", "visibility: hidden");
let temp = null;

async function fetchCurrentWeather(city) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&include=current&key=2WV3PSAMUFM8QTJ9BUZKB28CA&contentType=json`,
      {
        mode: "cors",
        method: "GET",
        headers: {},
      }
    );
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const json = await response.json();
    console.log(json);
    temp = Math.round(json.currentConditions.temp);
    const conditions = json.currentConditions.conditions;
    const icon = json.currentConditions.icon;

    return {
      temp,
      conditions,
      icon,
    };
  } catch (error) {
    console.log("Error: " + error.message);
    return {
      temp: null,
      conditions: "Error fetching data",
      icon: "",
    };
  }
}

const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.querySelector("input").value;
  const { temp, conditions, icon } = await fetchCurrentWeather(city);

  tempDisplay.textContent = `${temp}°F`;
  conditionsDisplay.textContent = conditions;
  iconDisplay.textContent = icon;
  convertBtn.setAttribute("style", "visibility: visible");
  convertBtn.textContent = "°C";
});

convertBtn.addEventListener("click", () => {
  if (convertBtn.textContent === "°C") {
    temp = Math.round(((temp - 32) * 5) / 9);
    tempDisplay.textContent = `${temp}°C`;
    convertBtn.textContent = "°F";
  } else {
    temp = Math.round((temp * 9) / 5 + 32);
    tempDisplay.textContent = `${temp}°F`;
    convertBtn.textContent = "°C";
  }
});
