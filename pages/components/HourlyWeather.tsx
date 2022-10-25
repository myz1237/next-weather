import moment from "moment-timezone";
import Image from "next/image";
import React from "react";

import { HourlyWeatherData } from "../../utils/types";

const HourlyWeather = ({
  hourlyWeather = [],
  timezone,
}: {
  hourlyWeather: Array<HourlyWeatherData>;
  timezone: string;
}) => {
  return (
    <div className="hourly">
      <div className="hourly__inner">
        {hourlyWeather.length > 0 &&
          hourlyWeather.map((weather, index) => (
            <div className="hourly__box-wrapper" key={weather.dt}>
              <div className="hourly__box">
                <span
                  className={`hourly__time ${
                    index === 0 ? "hourly__time--now" : ""
                  }`}
                >
                  {index == 0
                    ? "Now"
                    : moment.unix(weather.dt).tz(timezone).format("LT")}
                </span>

                <Image
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={"1"}
                  width="100"
                  height="100"
                ></Image>

                <span>{weather.temp.toFixed(0)}&deg;C</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HourlyWeather;
