import moment from "moment-timezone";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import cities from "../../lib/city.list.json";
import {
  City,
  CurrentWeatherData,
  DailyWeatherData,
  HourlyWeatherData,
} from "../../utils/types";
import HourlyWeather from "../components/HourlyWeather";
import SearchBox from "../components/SearchBox";
import TodaysWeather from "../components/TodaysWeather";
import WeeklyWeather from "../components/WeeklyWeather";

export async function getServerSideProps(context: { params: any }) {
  const city = getCity(context.params.city);

  if (!city) {
    return {
      notFound: true,
    };
  }
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&exclude=minutely&appid=${process.env.API_TOKEN}&units=metric`
  );
  const data = await res.json();
  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);

  if (!data) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        city: city,
        timezone: data.timezone,
        currentWeather: data.current,
        dailyWeather: data.daily,
        hourlyWeather: hourlyWeather,
      },
    };
  }
}

const getHourlyWeather = (
  hourlyData: Array<HourlyWeatherData>,
  timezone: string
) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimestamp = Math.floor(endOfDay / 1000);

  const todayData = hourlyData.filter((data) => data.dt < eodTimestamp);

  return todayData;
};

const getCity = (slug: string) => {
  // safe action
  const cityParam = slug.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) return null;
  const cityArray = cities as Array<City>;
  const city = cityArray.find((city) => city.id.toString() === id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const City = ({
  city,
  timezone,
  dailyWeather,
  hourlyWeather,
}: {
  city: City;
  timezone: string;
  currentWeather: CurrentWeatherData;
  dailyWeather: Array<DailyWeatherData>;
  hourlyWeather: Array<HourlyWeatherData>;
}) => {
  return (
    <div>
      <Head>
        <title>{city.name} Weather</title>
      </Head>
      <div className="page-wrapper">
        <div className="container">
          <Link href={"/"}>
            <a className="back-link">&larr; Home</a>
          </Link>
          <SearchBox placeholder="Search for another location..."></SearchBox>
          <TodaysWeather
            city={city}
            weather={dailyWeather[0]}
            timezone={timezone}
          />
          <HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
          <WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
        </div>
      </div>
    </div>
  );
};

export default City;
