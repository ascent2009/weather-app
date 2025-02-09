import React, { useState } from "react";
// import logo from "./logo.svg";
import axios from "axios";
import "./App.css";
import { convertTemp } from "./helpers/utils";

interface IData {
  location: string;
  cloudcover?: number | undefined;
  conditions?: string | undefined;
  datetime?: string | undefined;
  dew: number;
  feelslike: number;
  humidity?: number | undefined;
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
  days: [];
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
    days: [],
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
          visibility: data.data.currentConditions.visibility,
          cloudcover: data.data.currentConditions.cloudcover,
          conditions: data.data.currentConditions.conditions,
          datetime: data.data.currentConditions.datetime,
          dew: data.data.currentConditions.dew,
          feelslike: data.data.currentConditions.feelslike,
          humidity: data.data.currentConditions.humidity,
          pressure: data.data.currentConditions.pressure,
          snow: data.data.currentConditions.snow,
          snowdepth: data.data.currentConditions.snowdepth,
          solarenergy: data.data.currentConditions.solarenergy,
          solarradiation: data.data.currentConditions.solarradiation,
          days: data.data.days.slice(1, 5),
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
    cloudcover,
    conditions,
    datetime,
    dew,
    feelslike,
    humidity,
    pressure,
    snow,
    snowdepth,
    solarenergy,
    solarradiation,
    sunrise,
    sunset,
    temp,
    visibility,
    description,
    days,
  } = data;

  return (
    <section className="App">
      <form onSubmit={handleSubmit} className="app-form">
        <input
          className="app-input"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter country or city in original language"
        />
        <button type="submit" className="app-button">
          Search location
        </button>
      </form>
      <div className="my-16 m-auto text-white w-[80%]">
        <div className="my-8 text-2xl font-bold">{location}</div>
        <div className="text-1xl font-bold">
          <p>{description}</p>
        </div>

        <div className="grid grid-cols-3 gap-x-4 gap-y-8 font-bold mt-[3rem]">
          <div>
            <h2 className="text-blue-400">Temperature</h2>
            <p>{convertTemp(temp)}&deg;C</p>
          </div>
          <div>
            <h2 className="text-blue-400">Feels like</h2>
            <p>{convertTemp(feelslike)}&deg;C</p>
          </div>
          {/* <div className="md:text-black/70">{icon}</div> */}
          <div>
            <h2 className="text-blue-400">Visibility</h2>
            <p>{visibility} km</p>
          </div>
          <div>
            <div>
              <h2 className="text-blue-400">Sunrise</h2>
              <p>{sunrise}</p>
            </div>
            <div>
              <h2 className="text-blue-400">Sunset</h2>
              {sunset}
            </div>
          </div>
          <div>
            <h2 className="text-blue-400">Cloud cover</h2>
            <p>{cloudcover}%</p>
          </div>
          <div>
            <h2 className="text-blue-400">Conditions</h2>
            <p>{conditions}</p>
          </div>

          <div>
            <h2 className="text-blue-400">Time</h2>
            <p>{datetime}</p>
          </div>
          <div>
            <h2 className="text-blue-400">Dew</h2>
            <p>{convertTemp(dew)}&deg;C</p>
          </div>

          <div>
            <h2 className="text-blue-400">Humidity</h2>
            <p>{humidity}%</p>
          </div>

          <div>
            <h2 className="text-blue-400">Pressure</h2>
            <p>
              {pressure} kg/cm<sup>2</sup>
            </p>
          </div>
          <div>
            <h2 className="text-blue-400">Snow</h2>
            <p>{snow}</p>
          </div>
          <div>
            <h2 className="text-blue-400">Snow depth</h2>
            <p>{snowdepth} cm</p>
          </div>

          <div>
            <h2 className="text-blue-400">Solar energy</h2>
            <p>{solarenergy}</p>
          </div>
          <div>
            <h2 className="text-blue-400">Solar radiation</h2>
            <p>{solarradiation}</p>
          </div>
        </div>
        <div className="text-2xl font-bold my-12">
          <p>This location weather forecast for 4 days</p>
        </div>
        <div className="grid grid-cols-4 gap-x-8 font-bold mt-[2rem]">
          {days.map(
            ({
              datetime,
              description,
              feelslike,
              temp,
              humidity,
              pressure,
            }) => {
              return (
                <div className="flex-col h-64 justify-between" key={datetime}>
                  <div className="flex gap-4 py-2 px-2 rounded-2xl bg-blue-400 justify-center">
                    <h3>{new Date(datetime).toLocaleDateString()}</h3>
                  </div>

                  <h3>{description}</h3>
                  <div className="flex gap-4 ">
                    <h2 className="text-blue-400">Temperature</h2>
                    <h3>{convertTemp(temp)}&deg;C</h3>
                  </div>

                  <div className="flex gap-4 ">
                    <h2 className="text-blue-400">Feels like</h2>
                    <h3>{convertTemp(feelslike)}&deg;C</h3>
                  </div>
                  <div className="flex gap-4 ">
                    <h2 className="text-blue-400">Humidity</h2>
                    <h3>{humidity}%</h3>
                  </div>
                  <div className="flex gap-4 ">
                    <h2 className="text-blue-400">Pressure</h2>
                    <h3>
                      {pressure} kg/cm<sup>2</sup>
                    </h3>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
