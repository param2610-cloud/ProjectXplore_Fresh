import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import axios from "axios";
import { Domain } from "../../lib/Domain";
import { useAtom } from "jotai";
import userAtom from '../../lib/atoms/UserAtom';

interface Skillprops {
    skill_name: string;
    skill_id: string;
}

const SkillSearchWithSuggestions = () => {
    const [userId] = useAtom(userAtom);
    const [skilllist, setskillList] = useState<Skillprops[]>([]);
    const [selectedskilllist, setselectedskillList] = useState<Skillprops[]>([]);

    const [inputValue, setInputValue] = useState<string>(""); // State for search input
    const [filteredSuggestions, setFilteredSuggestions] = useState<Skillprops[]>([]); // State for filtered suggestions
    const [selectedSkill, setSelectedSkill] = useState<Skillprops | null>(null); // Track selected skill (name and id)

    // Retrieve skill data
    useEffect(() => {
        const fetchdata = async () => {
            const response2 = await axios.get(`${Domain}/api/v1/self/skill-list`, {
                withCredentials: true,
            });
            const response3 = await axios.get(`${Domain}/api/v1/users/get-skill`, {
                params: {
                    userId: userId
                },
                withCredentials: true
            });
            console.log(response3)
            setselectedskillList(response3.data.data);
            setskillList(response2.data.data);
        };
        if (userId) {
            fetchdata();
        }
    }, [userId]);

    // Handle input change and filter suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInputValue(query);

        // Reset selected skill if manually typing
        setSelectedSkill(null);

        // Filter suggestions based on input
        if (query.length > 0) {
            const filtered = skilllist.filter((item: Skillprops) =>
                item.skill_name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    // Handle suggestion click (store both skill name and id)
    const handleSuggestionClick = (suggestion: Skillprops) => {
        setInputValue(suggestion.skill_name);
        setSelectedSkill(suggestion);
        setFilteredSuggestions([]); // Clear suggestions after selection
    };

    // Add skill based on selection or manual entry
    const addSkill = async () => {
        try {
            // If selectedSkill is null, it means the user entered a new skill manually
            if (selectedSkill) {
                console.log(selectedSkill);
                
                // Skill was selected from suggestions, so send skill_id and skill_name
                const response = await axios.post(`${Domain}/api/v1/users/add-skill`, {
                    skill_id: selectedSkill.skill_id,
                    skill_name: selectedSkill.skill_name,
                    userId: userId
                },{
                    withCredentials:true
                });
                console.log(response);
            } else {
                // No skill was selected, treat it as a new skill with just the name
                if(inputValue){

                    const response = await axios.post(`${Domain}/api/v1/users/add-skill`, {
                        skill_name: inputValue,
                        skill_id:null,
                        userId:userId
                    },{
                        withCredentials:true
                    });
                    console.log(response);
                }
            }
            // Clear the input field and reset selected skill
            setInputValue("");
            setSelectedSkill(null);

            // Refresh selected skills after adding
            fetchUserSkills();
        } catch (error) {
            console.log(error);
        }
    };

    // Function to delete a skill
    const deleteSkill = async (skillId: string) => {
        try {
            if (skillId) {
                await axios.post(`${Domain}/api/v1/users/delete-skill`, {
                    skillId: skillId,
                    userId: userId
                });
            }
            // Refresh selected skills after deletion
            fetchUserSkills();
        } catch (error) {
            console.log(error);
        }
    };

    // Function to refresh selected skills
    const fetchUserSkills = async () => {
        try {
            const response = await axios.get(`${Domain}/api/v1/users/get-skill`, {
                params: {
                    userId: userId
                },
                withCredentials: true
            });
            setselectedskillList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <div className="search-container w-full flex justify-center items-center gap-4">
                <Label className="text-xl font-bold whitespace-nowrap">Skill:</Label>
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
                <ul className="suggestions-list list-none z-10 absolute rounded-lg mt-2 shadow-lg bg-white border-2 w-1/4 flex flex-col justify-center items-start p-4 gap-4">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            id={suggestion.skill_id}
                            className="suggestion-item text-lg cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.skill_name}
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex flex-row justify-start items-center w-full h-14 px-4 py-2 rounded-lg m-6 gap-6 overflow-x-scroll overflow-y-hidden border-2">
                {selectedskilllist &&
                    selectedskilllist.map((item: any) => (
                        <div
                            key={item.skills.skill_id}
                            id={item.skills.skill_name}
                            className="flex justify-center items-center gap-4 p-2 rounded-xl"
                        >
                            <div className="whitespace-nowrap">{item.skills.skill_name}</div>
                            <div>
                                <X
                                    color="gray"
                                    className="cursor-pointer"
                                    onClick={() => deleteSkill(item.skills.skill_id)}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export { SkillSearchWithSuggestions };
