import React, { useState, useEffect } from "react";
import './index.css';
import AutoComplete from "./components/AutoComplete";

// const options = [
//   { label: "Apple", value: "apple" },
//   { label: "Banana", value: "banana" },
//   { label: "Cherry", value: "cherry" },
//   { label: "Durian", value: "durian" },
//   { label: "Elderberry", value: "elderberry" }
// ];
const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setOptions(json));
  }, []);

  function handleSelect(value: string) {
    setSelectedValue(value);
  }

  return (
      <div className="app">
        <div>
            <h1>auto-complete component</h1>
            <AutoComplete options={options} onSelect={handleSelect} />
            <p>Selected value: {selectedValue}</p>
        </div>
      </div>
  );
};

export default App;
