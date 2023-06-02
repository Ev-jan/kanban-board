import { useRef, useState } from "react";
import style from "./style.module.css";
import { ITicket, TicketGroup } from "../../types";
import Select, { SingleValue } from 'react-select';
import Button from "../Button/Button";
import { useCloseOnClickOutside } from "../../utils";

type InputProps = {
  groupName: TicketGroup;
  onInputChange: (inputValue: string) => void;
  selectOptions?: ITicket[];
};

const Input: React.FC<InputProps> = ({ groupName, onInputChange, selectOptions }) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ label: string; value: string }> | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelectChange = (newValue: SingleValue<{ label: string; value: string }>) => {
    setSelectedOption(newValue);
    setInputValue(newValue ? newValue.value : "");
  };

  const handleButtonClick = () => {
    if (inputValue.trim().length === 0) {
      setIsInputHidden((prevIsInputHidden) => !prevIsInputHidden);
    } else {
      onInputChange(inputValue);
      setInputValue("");
      setSelectedOption(null);
      setIsInputHidden(true);
    }
  };

  const handleClearSelection = () => {
    setIsInputHidden(true);
    setSelectedOption(null);
    setInputValue("");
  };

  useCloseOnClickOutside(outerRef, ".inner__menu", handleClearSelection)

  return (
    <div className={style.inputWrapper} ref={outerRef}>
      {groupName === TicketGroup.Backlog && !isInputHidden && (
        <input
          className={style.input}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      )}
      {!isInputHidden && selectOptions?.length !== 0 && groupName !== TicketGroup.Backlog && (
        <Select
          className={style.select}
          classNamePrefix={"inner"}
          options={selectOptions?.map((ticket) => ({
            label: ticket.name,
            value: ticket.name,
          }))}
          value={selectedOption}
          onChange={handleSelectChange}
          placeholder={"Select task..."}
          menuPortalTarget={document.body}
          menuPosition={"fixed"}
          styles={{
            control: (provided) => ({
              ...provided,
              border: "none",
            }),
            indicatorSeparator: (base) => ({
              ...base,
              display: "none",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              padding: "0 10px",
            }),
            indicatorsContainer: (base) => ({
              ...base,
              padding: "0 10px",
            }),
            placeholder: (base) => ({
              ...base,
              color: "#000000",
            }),
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            menu: (base) => ({
              ...base,
              maxHeight: "60px",

            }),
            option: (base) => ({
              ...base,
              cursor: "url('./cursor-pointer.svg'), pointer",
              backgroundColor: "white",
              overflowX: "hidden"
            }),
          }}
        />
      )}
      <Button
        handleButtonClick={handleButtonClick}
        isInputHidden={isInputHidden}
        inputValue={inputValue}
      />
    </div>
  );
};

export default Input;
