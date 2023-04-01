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
    const [isFocused, setIsFocused] = useState(false);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function filterOptions() {
            // simulate API call with mock data
            const filtered = await new Promise<Option[]>((resolve) =>
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
            setFilteredOptions(filtered);
        }
        // only filter options if the input is focused
        if (isFocused) {
            filterOptions();
        } else {
            setFilteredOptions([]);
        }
    }, [countryName, options, isFocused]);

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

    function handleCountryChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCountryName(event.target.value);
    }

    function handleOptionSelect(name: string) {
        setCountryName(name);
        onSelect(name);
        setFilteredOptions([]);
    }

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input
                type="text"
                value={countryName}
                onChange={handleCountryChange}
                placeholder="Search for countries..."
                onFocus={() => setIsFocused(true)}
            />
            {filteredOptions.length > 0 && (
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
            )}
        </div>
    );
};

export default AutoComplete;
