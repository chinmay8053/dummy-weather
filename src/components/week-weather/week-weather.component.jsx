import React, { useEffect, useState } from "react";
import date from "date-and-time";
import clear from "../../images/clear.svg";
import cloudy from "../../images/cloudy.svg";

import "./week-weather.styles.scss";
import { oneTimeWeather } from "../use-fetch/use-fetch";

const dayChecker = (infoDate) => {
  const currentDate = new Date();
  const weekDate = new Date(infoDate * 1000);
  const subDate = date.subtract(currentDate, weekDate).toDays().toString().split(".")[0];
  if (subDate === "0") {
    return "today";
  } else if (subDate === "1") {
    return "yesterday";
  } else {
    return date.format(weekDate, "ddd");
  }
};

function WeekWeather({ setDate }) {
  const [weekInfo, setWeekInfo] = useState(null);
  let newDate = (new Date().getTime() / 1000).toString().split(".")[0];
  const weeks = [];

  useEffect(() => {
    const detailsFn = async () => {
      for (let i = 0; i < 5; i++) {
        const detail = await oneTimeWeather(newDate);
        newDate = newDate - 86400;
        weeks.push(detail);
      }
      setWeekInfo(weeks);
    };
    detailsFn();
  }, []);
  console.log(weekInfo);

  if (weekInfo === null) {
    return <div>.....loading</div>;
  }
  return (
    <div className="weekWeather">
      <div className="weekbar">
        <div className="daily">Daily</div>
        <div className="menu-icon">...</div>
      </div>
      <hr className="hr" />
      <div className="weekMenu">
        <div className="reports">
          {weekInfo.map((info, i) => {
            const dateDay = dayChecker(info.current.dt);

            return (
              <div
                className="weather"
                key={i}
                onClick={() => {
                  setDate(info.current.dt);
                }}
              >
                <div className="weekName">{dateDay}</div>
                {info.current.weather[0].main === "Clear" ? (
                  <img src={clear} alt="clear" className="cloud-icon" />
                ) : (
                  <img src={cloudy} alt="cloudy" className="cloud-icon" />
                )}
                <div className="image">{info.current.weather[0].main}</div>
                <div className="deg">{info.current.temp}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeekWeather;
