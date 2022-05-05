import React, { useEffect, useState } from "react";
import date from "date-and-time";
import clear from "../../images/clear.svg";
import cloudy from "../../images/cloudy.svg";

import { oneTimeWeather } from "../use-fetch/use-fetch";

import "./daily-weather.styles.scss";

function DailyWeather({ currentDate }) {
  const [info, setInfo] = useState(null);
  const [dateFormat, setDateFormat] = useState(null);

  useEffect(() => {
    const detailsFn = async () => {
      const detail = await oneTimeWeather(currentDate);
      const modifyDate = new Date(detail.current.dt * 1000);

      setInfo(detail);
      setDateFormat(date.format(modifyDate, "ddd, MMM DD YYYY"));
    };
    detailsFn();
  }, [currentDate]);

  if (info === null) {
    return <div>...loading</div>;
  }

  return (
    <div className="dailyWeather">
      <div className="weatherDetail">
        <h2 className="city">{info.timezone}</h2>
        <p className="date">{dateFormat}</p>
        <p className="climate">
          {info.current.weather[0].main === "Clear" ? (
            <img src={clear} alt="clear" className="cloud-icon" />
          ) : (
            <img src={cloudy} alt="cloudy" className="cloud-icon" />
          )}
        </p>
        <p className="climate-cloudy">{info.current.weather[0].main}</p>
      </div>
      <div className="weatherDeg">
        <div className="deg">{info.current.temp}</div>
        <div className="subDeg">
          {info.current.dew_point}/{info.current.feels_like}
        </div>
      </div>
    </div>
  );
}

export default DailyWeather;
