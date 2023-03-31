// @ts-ignore
import React, { useState, useEffect } from "react";
import './AutoCompleteCss.css';

interface Option {
    title: string;
    value: string;
}

interface AutoCompleteProps {
    options: Option[];
    onSelect: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ options, onSelect }) => {
    const [inputValue, setInputValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);

    useEffect(() => {
        async function filterOptions() {
            // simulate API call with mock data
            const filtered = await new Promise<Option[]>((resolve) =>
                setTimeout(
                    () =>
                        resolve(
                            options.filter((option) =>
                                option.title.toLowerCase().includes(inputValue.toLowerCase())
                            )
                        ),
                    500
                )
            );
            setFilteredOptions(filtered);
        }

        filterOptions();
    }, [inputValue, options]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleOptionSelect(value: string) {
        setInputValue("");
        onSelect(value);
    }

    return (
        <div className="auto-complete">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type something..."

            />
            {filteredOptions.length > 0 && (
                <ul className="options">
                    {filteredOptions.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                        >
              <span className="label">
                {option.title.slice(0, inputValue.length)}
              </span>
                            {option.title.slice(inputValue.length)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AutoComplete;
