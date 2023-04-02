import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AutoComplete, { Option } from "./AutoComplete";

describe("AutoComplete component", () => {
    const options: Option[] = [
        { name: { common: "Ghana" } },
        { name: { common: "Togo" } },
        { name: { common: "Kenya" } },
    ];

    it("should render the input field with placeholder text", () => {
        const onSelect = jest.fn();
        render(<AutoComplete options={options} onSelect={onSelect} />);
        expect(screen.getByPlaceholderText("Search for countries...")).toBeInTheDocument();
    });

    it("should show the options list when input is focused", () => {
        const onSelect = jest.fn();
        render(<AutoComplete options={options} onSelect={onSelect} />);
        const input = screen.getByPlaceholderText("Search for countries...");
        fireEvent.focus(input);
        const optionList = screen.getByRole("list");
        expect(optionList).toBeInTheDocument();
        expect(screen.getByText("Ghana")).toBeInTheDocument();
        expect(screen.getByText("Togo")).toBeInTheDocument();
        expect(screen.getByText("Kenya")).toBeInTheDocument();
    });

    it("should call onSelect when an option is selected", async () => {
        const onSelect = jest.fn();
        render(<AutoComplete options={options} onSelect={onSelect} />);
        const input = screen.getByPlaceholderText("Search for countries...");
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "ghana" } });
        const option = await screen.findByText("Ghana");
        fireEvent.click(option);
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith("Ghana");
    });

    it("should close the options list when an option is selected", async () => {
        const onSelect = jest.fn();
        render(<AutoComplete options={options} onSelect={onSelect} />);
        const input = screen.getByPlaceholderText("Search for countries...");
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "ghana" } });
        const option = await screen.findByText("Ghana");
        fireEvent.click(option);
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    })

    it("should close the options list when clicking outside of the component", async () => {
        const onSelect = jest.fn();
        render(<AutoComplete options={options} onSelect={onSelect} />);
        const input = screen.getByPlaceholderText("Search for countries...");
        fireEvent.focus(input);
        fireEvent.change(input, { target: { value: "ghana" } });
        const option = await screen.findByText("Ghana");
        fireEvent.click(option);
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    })

});
