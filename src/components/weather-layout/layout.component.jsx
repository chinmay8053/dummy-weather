import React, { useState } from "react";
import DailyWeather from "../daily-weather/daily-weather.component";
import WeekWeather from "../week-weather/week-weather.component";
import "./layout.styles.scss";

function WeatherLayout() {
  const currentSeconds = new Date().getTime() / 1000;
  const getSeconds = currentSeconds.toString().split(".")[0];
  const [date, setDate] = useState(getSeconds);
  return (
    <div className="weather-layout">
      <DailyWeather currentDate={date} />
      <WeekWeather setDate={setDate} />
    </div>
  );
}

export default WeatherLayout;
