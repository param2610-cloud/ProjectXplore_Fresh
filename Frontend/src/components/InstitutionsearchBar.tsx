import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import axios from "axios";
import { useAtom } from "jotai";
import userAtom from '@/lib/atoms/UserAtom';
import { Domain } from "@/lib/Domain";

interface InstitutionProps {
    institution_id: string;
    institution:{
        institution_id:string;
        name:string;
        address:string
    }
    name: string;
    address: string;
    studentId: string;
    verificationStatus: boolean;
}

const InstitutionSearchWithStudentId = () => {
    const [userId] = useAtom(userAtom);
    const [institutionList, setInstitutionList] = useState<InstitutionProps[]>(
        []
    );
    const [selectedInstitutionList, setSelectedInstitutionList] = useState<
        InstitutionProps[]
    >([]);
    const [inputValue, setInputValue] = useState<string>(""); // Search input state
    const [filteredSuggestions, setFilteredSuggestions] = useState<
        InstitutionProps[]
    >([]); // Suggestions state
    const [selectedInstitution, setSelectedInstitution] =
        useState<InstitutionProps | null>(null); // Track selected institution
    const [studentId, setStudentId] = useState<string>(""); // Student ID input
    const [verificationStatus, setVerificationStatus] =
        useState<boolean>(false); // Verification status

    // Fetch the institution list on load
    useEffect(() => {
        const fetchInstitutionData = async () => {
            const response = await axios.get(
                `${Domain}/api/v1/self/institution-list`,
                {
                    withCredentials: true,
                }
            );
            setInstitutionList(response.data.data);
        };
        fetchInstitutionData();
    }, []);

    // Fetch user's previously added institutions on load
    useEffect(() => {
        const fetchUserInstitutions = async () => {
            if (userId) {
                const response = await axios.get(
                    `${Domain}/api/v1/users/get-institution`,
                    {
                        params: {
                            userId: userId,
                        },
                        withCredentials: true,
                    }
                );
                // Populate the state with the previously added institutions
                setSelectedInstitutionList(response.data.data);
            }
        };
        fetchUserInstitutions();
    }, [userId]);

    // Handle input change and filter suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setInputValue(query);

        setSelectedInstitution(null); // Reset selected institution if manually typing

        // Filter suggestions based on input
        if (query.length > 0) {
            const filtered = institutionList.filter((item: InstitutionProps) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    };

    // Handle suggestion click (store both institution name and id)
    const handleSuggestionClick = (suggestion: InstitutionProps) => {
        setInputValue(suggestion.name);
        setSelectedInstitution(suggestion);
        setFilteredSuggestions([]); // Clear suggestions after selection
    };

    // Add institution with student ID
    const addInstitution = async () => {
        try {
            if (selectedInstitution && studentId) {
                const response = await axios.post(
                    `${Domain}/api/v1/users/add-institution`,
                    {
                        userId,
                        institutionId: selectedInstitution.institution_id,
                        studentId,
                    },
                    {
                        withCredentials: true,
                    }
                );

                console.log(response.data);
                const newInstitution = {
                    ...selectedInstitution,
                    studentId,
                    verificationStatus: response.data.data.verificationStatus,
                };
                setSelectedInstitutionList((prev) => [
                    ...prev,
                    newInstitution,
                ]);
                setInputValue("");
                setStudentId("");
                setSelectedInstitution(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full">
            <div className={`search-container w-full flex justify-center items-center gap-4 ${selectedInstitutionList[0]?`hidden`:``}`}>
                <Label className="text-xl font-bold whitespace-nowrap">
                    Institution:
                </Label>
                <Input
                    type="text"
                    placeholder="Search institution..."
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`search-input `}
                />
            </div>
            {filteredSuggestions.length > 0 && (
                <ul className="suggestions-list list-none z-10 absolute rounded-lg mt-2 shadow-lg bg-white border-2 w-1/4 flex flex-col justify-center items-start p-4 gap-4">
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            id={suggestion.institution_id}
                            className="suggestion-item text-lg cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.name}
                            <div className="text-sm text-gray-500">
                                {suggestion.address}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {selectedInstitution && (
                <div className="mt-4">
                    <Label className="text-xl font-bold">Student ID:</Label>
                    <Input
                        type="text"
                        placeholder="Enter your student ID..."
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                </div>
            )}

            {selectedInstitution && studentId && (
                <div className="mt-4">
                    <Button onClick={addInstitution}>Add</Button>
                </div>
            )}

            <div className="flex flex-col mt-6">
                <Label className="text-xl font-bold">Added Institutions:</Label>
                <div className="flex flex-row flex-wrap gap-4">
                    {selectedInstitutionList.map((institution, index) => (
                        <div
                            key={index}
                            className="border p-4 rounded-lg flex flex-col justify-between items-start w-full"
                        >
                            {institution.institution && (
                                <>
                                <div className="font-bold">{institution?.institution?.name}</div>
                                <div>{institution?.institution?.address}</div>
                                </>
                            )}
                            {!institution.institution && (
                                <>
                                <div className="font-bold">{institution?.name}</div>
                                <div>{institution?.address}</div>
                                </>
                            )}
                            <div className="text-sm text-gray-500">
                                Student ID: {institution.studentId}
                            </div>
                            <div className="text-sm text-gray-500">
                                Verification Status:{" "}
                                {institution.verificationStatus
                                    ? "Verified"
                                    : "Pending"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export { InstitutionSearchWithStudentId };
