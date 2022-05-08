import axios from "axios";
export const oneTimeWeather = async (date) => {
  const fetchJson = await axios.get(
    `http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=20.5&lon=78.9&dt=${date}&units=imperial&appid=${process.env.REACT_APP_API_URL}`
  );
  const fetchData = await fetchJson.data;
  return fetchData;
};
