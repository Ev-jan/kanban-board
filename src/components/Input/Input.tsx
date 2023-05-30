import { useEffect, useRef, useState } from "react";
import style from "./style.module.css"
import { ITicketGroup } from "../../types";
import Select, { SingleValue } from 'react-select'
import Button from "../Button/Button";

type InputProps = {
    groupName: "Backlog" | "Ready" | "In Progress" | "Finished";
    onInputChange: (inputValue: string) => void;
    selectOptions?: ITicketGroup;
}

const Input: React.FC<InputProps> = ({ groupName, onInputChange, selectOptions }) => {
    const outerRef = useRef<HTMLDivElement>(null);
    const [isInputHidden, setIsInputHidden] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [selectedOption, setSelectedOption] = useState<SingleValue<{ label: string; value: string }> | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSelectChange = (
        newValue: SingleValue<{ label: string; value: string }>,
    ) => {
        setSelectedOption(newValue);
        setInputValue(newValue ? newValue.value : "");
    };

    const handleButtonClick = () => {
        if (inputValue.trim().length === 0) {
            isInputHidden ? setIsInputHidden(false) : setIsInputHidden(true)
        } else {
            onInputChange(inputValue);
            setInputValue("");
            setSelectedOption(null);
            setIsInputHidden(true);
        }
    }

    const handleClearSelection = () => {
        setIsInputHidden(true)
        setSelectedOption(null);
        setInputValue("");
    };

    // clear selected option on click outside the <select> element

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const targetElement = event.target as Element;
            const isClickInsideDropdown =
                targetElement?.closest(".inner__menu") !== null;

            if (outerRef.current && !outerRef.current.contains(event.target as Node) &&
                !isClickInsideDropdown) {
                handleClearSelection();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className={style.inputWrapper} ref={outerRef}>
            {groupName === "Backlog" ? (
                !isInputHidden &&
                <input
                    className={style.input}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange} />
            ) : (
                !isInputHidden && selectOptions?.tickets.length !== 0 ?
                    (<Select
                        className={style.select}
                        classNamePrefix={"inner"}
                        options={selectOptions?.tickets.map((ticket) => ({
                            label: ticket.name,
                            value: ticket.name,
                        }))}
                        value={selectedOption}
                        onChange={handleSelectChange}
                        placeholder={"Select task..."}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                border: "none",
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: "none",
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                padding: "0 10px"
                            }),
                            indicatorsContainer: (provided) => ({
                                ...provided,
                                padding: "0 10px",
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: "#000000"
                            }),
                            option: (provided) => ({
                                ...provided,
                                cursor: "url('./cursor-pointer.svg'), pointer"
                            }),
                        }}
                    ></Select>) : null
            )}
            <Button
                handleButtonClick={handleButtonClick}
                isInputHidden={isInputHidden}
                inputValue={inputValue}
            />
        </div>
    )
}

export default Input