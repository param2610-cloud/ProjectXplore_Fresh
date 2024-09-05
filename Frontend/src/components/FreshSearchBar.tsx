import { useEffect, useState } from "react";
import axios from "axios";
import { Domain } from "@/lib/Domain"; // Adjust the path to your Domain module
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { OptionProps } from "@/lib/interface/INTERFACE";


const FreshSearchBar = ({
  GET_LIST_API,
  FINALVALUE,
  SETFINALVALUE,
}: {
  GET_LIST_API: string;
  FINALVALUE: OptionProps[];
  SETFINALVALUE: (components: OptionProps[]) => void;
}) => {
  const [optionList, setOptionList] = useState<OptionProps[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionProps | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<OptionProps[]>([]);

  useEffect(() => {
    const getList = async () => {
      const { data } = await axios.get(`${Domain}${GET_LIST_API}`);
      if (data) {
        console.log(data.data);
        
        setOptionList(data.data);
      }
    };
    getList();
  }, [GET_LIST_API]);

  const handleOptionClick = (option: OptionProps) => {
    setSelectedOption(option);
    setInputValue(option.components_name);
    setFilteredSuggestions([]);
  };

  const addSkill = () => {
    if (selectedOption) {
      // Add selected option to FINALVALUE
      SETFINALVALUE([...FINALVALUE, selectedOption]);
    } else if (inputValue) {
      // Add input value if not selected from suggestion
      SETFINALVALUE([...FINALVALUE, { id: null, components_name: inputValue,components_image_link:null }]);
    }
    setInputValue("");
    setSelectedOption(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    console.log(query);
    
    setInputValue(query);
    setSelectedOption(null);
    console.log(optionList);
    

    if (query.length > 0) {
      const filtered = optionList.filter((item: OptionProps) =>
        item.components_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const deleteSkill = (option: OptionProps) => {
    const updatedFinalValue = FINALVALUE.filter((item: OptionProps) => item !== option);
    SETFINALVALUE(updatedFinalValue);
  };

  return (
    <div className="w-full">
      <div className="search-container w-full flex justify-center items-center gap-4">
        <Input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
          className="search-input"
        />
        <Button onClick={addSkill}>Add</Button>
      </div>

      {filteredSuggestions.length > 0 && (
        <ul className="suggestions-list list-none z-10 rounded-lg mt-2 shadow-lg bg-white border-2 w-full flex flex-col justify-center items-start p-4 gap-4 ml-12 ">
          {filteredSuggestions.map((suggestion: OptionProps, index: number) => {
            console.log(suggestion);
            
            return (
            <li
              key={index}
              className="suggestion-item text-lg cursor-pointer"
              onClick={() => handleOptionClick(suggestion)}
            >
                <div className="flex gap-4 justify-start items-center">
                    {suggestion.components_image_link && (<img className="w-14 h-full" src={suggestion.components_image_link} alt="" />)}
                    <div className="whitespace-nowrap">
              {suggestion.components_name}
                    </div>
                </div>
            </li>
          )})}
        </ul>
      )}

      <div className="flex flex-row justify-start items-center w-full h-14 px-4 py-2 rounded-lg my-6 gap-6 overflow-x-scroll overflow-y-hidden border-2">
        {FINALVALUE.map((item: OptionProps) => (
          <div key={item.id} className="flex justify-center items-center gap-4 p-2 rounded-xl">
            <div className="whitespace-nowrap">{item.components_name}</div>
            <X color="gray" className="cursor-pointer" onClick={() => deleteSkill(item)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { FreshSearchBar };
