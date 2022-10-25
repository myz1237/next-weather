import moment from "moment-timezone";
import Image from "next/image";

import { City, DailyWeatherData } from "../../utils/types";

const TodaysWeather = ({
  city,
  weather,
  timezone,
}: {
  city: City;
  weather: DailyWeatherData;
  timezone: string;
}) => {
  return (
    <div className="today">
      <div className="today__inner">
        <div className="today__left-content">
          <h1>
            {city.name} ({city.country})
          </h1>
          <h2>
            <span>{weather.temp.max.toFixed(0)}&deg;C</span>
            <span>{weather.temp.min.toFixed(0)}&deg;C</span>
          </h2>

          <div className="today__sun-times">
            <div>
              <span>Sunrise</span>
              <span>
                {moment.unix(weather.sunrise).tz(timezone).format("LT")}
              </span>
            </div>
            <div>
              <span>Sunrise</span>
              <span>
                {moment.unix(weather.sunset).tz(timezone).format("LT")}
              </span>
            </div>
          </div>
        </div>
        <div className="today__right-content">
          <div className="today__icon-wrapper">
            <div>
              <Image
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                layout="fill"
              ></Image>
            </div>
          </div>
          <h3>{weather.weather[0].description}</h3>
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
