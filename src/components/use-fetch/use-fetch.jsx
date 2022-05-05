import axios from "axios";
export const oneTimeWeather = async (date) => {
  const fetchJson = await axios.get(
    `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=20.5&lon=78.9&dt=${date}&units=imperial&appid=ec3a17b47ca0a50b2081940298ce64a3`
  );
  const fetchData = await fetchJson.data;
  return fetchData;
};
