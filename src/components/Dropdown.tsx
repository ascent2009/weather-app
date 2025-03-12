import React, { useState } from "react";
import DropdownSvg from "../assets/chevron-down.svg";
import { convertTemp } from "../helpers/utils";
import { DropdownType } from "../types";

const Dropdown: React.FC<DropdownType> = ({ days }) => {
  const [dropdown, setDropdown] = useState(false);
  const [active, setActive] = useState("");

  const handleDropdownToggle = (days: Array<object>) => {
    days.forEach((day, index) => {
      console.log("index: ", day);
      setActive(active ? "" : "app-active" + index);
      setDropdown(!dropdown);
    });
  };

  return (
    <ul className="grid md:grid-cols-4 gap-y-4 md:gap-x-8 font-bold mt-[2rem]">
      {days.map(
        (
          { datetime, description, feelslike, temp, humidity, pressure },
          index,
        ) => {
          return (
            <li key={datetime} className="flex flex-col md:h-64 gap-6">
              <button
                className="app-button flex gap-4 items-center justify-center opacity-75 hover:opacity-100"
                id={(index + 1).toString()}
                onClick={() => handleDropdownToggle(days)}
              >
                <h3>{new Date(datetime).toLocaleDateString()}</h3>
                <img
                  src={DropdownSvg}
                  alt="dropdown"
                  className={dropdown ? "" : "rotate-270"}
                />
              </button>

              <div className={`${active || "hidden"} flex-col md:h-72 gap-6"`}>
                <h3 className="text-left md:h-16">{description}</h3>
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
            </li>
          );
        },
      )}
    </ul>
  );
};

export default Dropdown;
