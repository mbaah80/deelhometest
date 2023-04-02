import React, { useState, useEffect } from "react";
import './App.css';
import AutoComplete from "./components/AutoComplete";


const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
      // calling external API to get the countries
    fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((json) => setOptions(json));
  }, []);

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  return (
      <div className="app">
          <AutoComplete options={options} onSelect={handleSelect} />
      </div>
  );
};

export default App;
