// @ts-ignore
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
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const autocompleteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function filterOptions() {
            // simulate API call with mock data
            const filtered = await new Promise<Option[]>((resolve) =>
                setTimeout(
                    () =>
                        resolve(
                            options.filter((option) =>
                                option.name.common.toLowerCase().includes(inputValue.toLowerCase())
                            )
                        ),
                    500
                )
            );
            setFilteredOptions(filtered);
        }

        filterOptions();
    }, [inputValue, options]);

    useEffect(()=>{
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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleOptionSelect(name: string) {
        setInputValue(name);
        onSelect(name);
        setFilteredOptions([]);
    }

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for countries..."
                onFocus={() => setFilteredOptions(options)}

            />
            {filteredOptions.length > 0 && (
                <ul className="options">
                    {filteredOptions.map((option) => (
                        <li key={option.name.common} onClick={() => handleOptionSelect(option.name.common)}>
                          <span className="label">
                            {option.name.common.slice(0, inputValue.length)}
                          </span>
                            {option.name.common.slice(inputValue.length)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
