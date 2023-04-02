import React, { useState, useEffect, useRef } from "react";
import './AutoCompleteCss.css';

interface Option {
    name: any;
}


interface AutoCompleteProps {
    options: Option[];
    onSelect: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
    const [countryName, setCountryName] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // filtering the options based on the input value
        async function filterOptions() {
            // simulate API call with mock data
            const filtered = await new Promise<Option[]>((resolve) =>
                // timeout to simulate API call
                setTimeout(
                    () =>
                        resolve(
                            options.filter((option) =>
                                option.name.common.toLowerCase().includes(countryName.toLowerCase())
                            )
                        ),
                    500
                )
            );
            // set the filtered options
            setFilteredOptions(filtered);
        }
        //check if the input value is not empty
        if (countryName) {
            filterOptions();
        }else{
            setFilteredOptions([]);
        }
    }, [countryName, options]);

    useEffect(()=>{
        // close the autocomplete when clicking outside of it
        const handleClickOutside = (event: MouseEvent) => {
            if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
                setFilteredOptions([]);
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [])

    // function to handle the selection of an option
    function handleCountryChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCountryName(event.target.value);
    }

    // function to  select country from the list
    function handleOptionSelect(name: string) {
        setCountryName(name);
        onSelect(name);
        setFilteredOptions([]);
    }

    return (
        <div className="autocomplete"  ref={autocompleteRef}>
            <input
                className="autocomplete-input"
                type="text"
                value={countryName}
                onChange={handleCountryChange}
                placeholder="Search for countries..."
                onFocus={() => setFilteredOptions(options)}
            />
            {
                filteredOptions.length > 0 ? (
                    <ul className="options">
                        {filteredOptions.map((option) => (
                            <li key={option.name.common} onClick={() => handleOptionSelect(option.name.common)}>
                          <span className="label">
                            {option.name.common.slice(0, countryName.length)}
                          </span>
                                {option.name.common.slice(countryName.length)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="no-options">
                        {!options.some((option) => option.name.common.toLowerCase() === countryName.toLowerCase()) && countryName && (
                            <div className="countryNotFound">No Country Found"</div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default AutoComplete;
