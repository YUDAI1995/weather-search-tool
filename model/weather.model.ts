export interface WeatherApiResponse {
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    }
  ];
  main: { temp: number; humidity: number };
  name: string;
  dt: number;
  statusText: "OK" | "unKnown";
}

export interface AreaWeatherApiResponse {
  current: {
    dt: number;
    temp: number;
    pressure: number;
    humidity: number;
    weather: [
      {
        main: string;
        description: string;
        icon: string;
      }
    ];
    wind_speed: number;
    wind_deg: number;
    rain: {};
    statusText: "OK" | "unKnown";
  };
}
