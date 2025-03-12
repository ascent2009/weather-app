import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { convertTemp } from "./helpers/utils";
import GlobeGif from "./assets/earth-terre.gif";
import Dropdown from "./components/Dropdown";
import { IData } from "./types";

function App() {
  const [locationData, setLocationData] = useState({ country: "", city: "" });
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
  const [hidden, setHidden] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onClear = () => {
    setInputValue("");
  };

  const getLocation = async () => {
    try {
      const res = await axios.get("https://geolocation-db.com/json/");
      const data = await res.data;
      setLocationData({ ...data, country: data.country, city: data.city });
    } catch (error) {
      console.error("error: ", (error as Error).message);
    }
  };

  const fetchCities = async () => {
    const URL =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
    const API_key = "38WYW4KM5BQWJWXDLZUQD7VNP";

    try {
      const response = await axios.get(
        `${URL}${inputValue ? inputValue : locationData.city}?unitGroup=us&key=${API_key}&contentType=json`,

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
      setHidden(false);
    } catch (err) {
      console.error("error: ", (err as Error).message);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

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

  console.log(location.split(",")[0]);

  return (
    <section className="md:text-center">
      <form
        onSubmit={handleSubmit}
        className={
          hidden
            ? "app-form md:justify-center"
            : "app-form flex-col w-[80%] md:flex-row md:w-fit"
        }
      >
        <input
          className={hidden ? "hidden" : "app-input"}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter country or city in original language"
        />
        <button
          type="submit"
          className={
            hidden
              ? "app-button w-fit text-2xl md:text-3xl p-6 rounded-full opacity-75 hover:opacity-100"
              : "app-button opacity-75 hover:opacity-100"
          }
        >
          {hidden ? "Get the current location" : "Search location"}
        </button>
      </form>
      {hidden && (
        <img
          src={GlobeGif}
          alt="rotating globe"
          className="inline mt-30 -translate-x-[10%] mb-[90%] md:mb-auto"
        />
      )}
      <div className={hidden ? "hidden" : "block"}>
        <div className="my-16 m-auto text-white w-[80%] md:w-[70%]">
          <div className="my-8 text-2xl font-bold text-center md:flex gap-10 justify-center">
            <p>{location}</p>
            <p>{datetime}</p>
          </div>
          <div className="text-1xl font-bold text-center">
            <p>{description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 font-bold mt-[3rem]">
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Temperature</h2>
              <p>{convertTemp(temp)}&deg;C</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Feels like</h2>
              <p>{convertTemp(feelslike)}&deg;C</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Visibility</h2>
              <p>{visibility} km</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <div>
                <h2 className="text-blue-400">Sunrise</h2>
                <p>{sunrise}</p>
              </div>
              <div>
                <h2 className="text-blue-400">Sunset</h2>
                {sunset}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Cloud cover</h2>
              <p>{cloudcover}%</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Conditions</h2>
              <p>{conditions}</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Dew</h2>
              <p>{convertTemp(dew)}&deg;C</p>
            </div>

            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Humidity</h2>
              <p>{humidity}%</p>
            </div>

            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Pressure</h2>
              <p>
                {pressure} kg/cm<sup>2</sup>
              </p>
            </div>

            <div className="flex flex-col items-center justify-center md:justify-center">
              <div>
                <h2 className="text-blue-400">Snow</h2>
                <p>{snow}</p>
              </div>
              <div>
                <h2 className="text-blue-400">Snow depth</h2>
                <p>{snowdepth} cm</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Solar energy</h2>
              <p>{solarenergy}</p>
            </div>
            <div className="flex flex-col items-center justify-center md:justify-center">
              <h2 className="text-blue-400">Solar radiation</h2>
              <p>{solarradiation}</p>
            </div>
          </div>
          <div className="text-2xl font-bold my-12 text-center">
            <p>
              <span className="text-blue-400">{location.split(",")[0]}</span>{" "}
              weather forecast for 4 days
            </p>
          </div>
          <Dropdown days={days} />
        </div>
      </div>
    </section>
  );
}

export default App;
