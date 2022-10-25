export interface City {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export interface CityData extends City {
  slug: string;
}

interface BaseWeatherData {
  dt: number;
  pressure: number;
  humidity: number;
  temp: number;
  sunrise: number;
  sunset: number;
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface HourlyWeatherData extends BaseWeatherData {}
export interface DailyWeatherData extends Omit<BaseWeatherData, "temp"> {
  temp: {
    min: number;
    max: number;
  };
}
export interface CurrentWeatherData extends BaseWeatherData {}
