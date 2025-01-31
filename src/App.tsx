import React, { useState } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
// import "./index.css";

interface IData {
  location: string;
  cloudcover?: number | undefined;
  conditions?: string | undefined;
  datetime?: string | undefined;
  dew?: number | undefined;
  feelslike?: number | undefined;
  humidity?: number | undefined;
  icon: string;
  pressure?: number | undefined;
  snow?: number | undefined;
  snowdepth?: number | undefined;
  solarenergy?: number | undefined;
  solarradiation?: number | undefined;
  sunrise: string;
  sunset: string;
  temp: number;
  visibility?: number | undefined;
  description: string;
}

function App() {
  const [data, setData] = useState<IData>({
    location: "",
    cloudcover: 0,
    conditions: "",
    datetime: "",
    dew: 0,
    feelslike: 0,
    humidity: 0,
    icon: "",
    pressure: 0,
    snow: 0,
    snowdepth: 0,
    solarenergy: 0,
    solarradiation: 0,
    sunrise: "",
    sunset: "",
    temp: 0,
    visibility: 0,
    description: "",
  });

  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClear = () => {
    setInputValue("");
  };

  const fetchCities = async () => {
    // const options = {
    //   method: 'GET',
    //   // url: 'https://world-cities-api-by-apirobots.p.rapidapi.com/v1/cities/random',
    //   url: 'https://andruxnet-world-cities-v1.p.rapidapi.com/',
    //   headers: {
    //     'x-rapidapi-key': 'd2fa08225emsh63099ab231bf534p197056jsncbb54ceefcaa',
    //     // 'X-RapidAPI-Host': 'world-cities-api-by-apirobots.p.rapidapi.com'
    //     'X-RapidAPI-Host': 'andruxnet-world-cities-v1.p.rapidapi.com'
    //   }
    // };

    // try {
    //   const response = await axios.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    // const location = "Подсосенье, Можайский район";
    const URL =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const API_key = "38WYW4KM5BQWJWXDLZUQD7VNP";

    try {
      const response = await axios.get(
        `${URL}${inputValue}?unitGroup=us&key=${API_key}&contentType=json`,
        {
          method: "GET",
          headers: {},
        },
      );
      const data = await response;
      console.log("data: ", data);
      if (data.data.address.includes(inputValue)) {
        setData({
          ...data,
          location: data.data.resolvedAddress,
          temp: data.data.currentConditions.temp,
          description: data.data.description,
          sunrise: data.data.currentConditions.sunrise,
          sunset: data.data.currentConditions.sunset,
          icon: data.data.currentConditions.icon,
        });
      }
    } catch (err) {
      console.error("error: ", (err as Error).message);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchCities();
    onClear();
    console.log(data);
  };

  const {
    location,
    // cloudcover,
    // conditions,
    // datetime,
    // dew,
    // feelslike,
    // humidity,
    icon,
    // pressure,
    // snow,
    // snowdepth,
    // solarenergy,
    // solarradiation,
    sunrise,
    sunset,
    temp,
    // visibility,
    description,
  } = data;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          className="App-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="bg-red">
          Search location
        </button>
      </form>
      <div className="text-3xl font-bold underline">{location}</div>
      <div>{temp}</div>
      <div>{description}</div>
      <div>{icon}</div>
      <div>{description}</div>
      <div>{sunrise}</div>
      <div>{sunset}</div>
    </div>
  );
}

export default App;
