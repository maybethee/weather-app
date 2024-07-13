import "./style.css";

const city = "london";

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
    console.log(
      `temp: ${json.currentConditions.temp}° Fahrenheit\n
      conditions: ${json.currentConditions.conditions}\n
      icon: `
    );
  } catch (error) {
    console.log("Error: " + error.message);
  }
}

fetchCurrentWeather(city);
