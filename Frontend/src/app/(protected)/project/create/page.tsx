'use client'
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { FreshSearchBar } from "@/components/FreshSearchBar";
import { OptionProps } from "../../../../../lib/interface/INTERFACE";

type Feature = {
    input: { text: string; media: File | null; link: string };
    process: { text: string; media: File | null; link: string };
    output: { text: string; media: File | null; link: string };
};

interface ProjectFormInputs {
    projectType: "hardware" | "software";
    projectName: string;
    projectDescription: string;
    startDate: dateFns;
    endDate: dateFns;
    mentor: string;
    reference: string;
    demoLink: string;
    hardwareComponents: OptionProps[]; // searched components
    softwareTechnologies: string[]; // searched technologies
    features: Feature[];
}


const ProjectCreateComponent: React.FC = () => {
    const { register, control, handleSubmit, setValue } = useForm<ProjectFormInputs>({
        defaultValues: {
            projectType: "hardware",
            features: [{ input: {}, process: {}, output: {} }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "features",
    });

    // State to manage selected hardware components
    const [hardwareComponents, setHardwareComponents] = useState<OptionProps[]>([]);

    const onSubmit = (data: ProjectFormInputs) => {
        console.log(data);
    };

    // Handle updating hardware components state and react-hook-form's values
    const handleHardwareComponentsChange = (components: OptionProps[]) => {
        setHardwareComponents(components);
        setValue("hardwareComponents", components); // Update form values
    };

    return (
        <div className="w-full bg-gray-100 flex justify-center p-6">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                    <h2 className="text-3xl font-bold text-center mb-4">Final Project</h2>

                    {/* Project Type */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Project Type:</Label>
                        <select className="border w-full h-10 px-4 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("projectType")}>
                            <option value="hardware">Hardware</option>
                            <option value="software">Software</option>
                        </select>
                    </div>

                    {/* Project Name */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Project Name:</Label>
                        <Input {...register("projectName", { required: true })} placeholder="Enter project name" />
                    </div>

                    {/* Project Description */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Project Description:</Label>
                        <Textarea {...register("projectDescription", { required: true })} placeholder="Enter project description" rows={4} />
                    </div>

                    {/* Project Duration */}
                    <div className="flex gap-5">
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Project Start:</Label>
                        <Input type="date" {...register("startDate", { required: true })} placeholder="Enter project Start Date/Month/year" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Project End:</Label>
                        <Input type="date" {...register("endDate", { required: true })} placeholder="Enter project end Date/Month/year" />
                    </div>
                    </div>

                    {/* Mentor */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Mentor:</Label>
                        <Input {...register("mentor", { required: true })} placeholder="Search by mentor name" />
                    </div>

                    {/* Reference */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Reference Taken From:</Label>
                        <Input {...register("reference")} placeholder="Enter reference source" />
                    </div>

                    {/* Demo Link */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Demo Link:</Label>
                        <Input {...register("demoLink")} placeholder="Enter demo link" />
                    </div>

                    {/* Hardware Components */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Hardware Components:</Label>
                        <FreshSearchBar 
                            FINALVALUE={hardwareComponents} 
                            SETFINALVALUE={handleHardwareComponentsChange} 
                            GET_LIST_API="/api/v1/project/component-list" 
                        />
                    </div>

                    {/* Software Technologies */}
                    <div className="flex flex-col space-y-2">
                        <Label className="text-lg font-semibold">Software Technologies:</Label>
                        <Input {...register("softwareTechnologies")} placeholder="Search software technologies" />
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">Features</h3>
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4 bg-gray-50 p-4 rounded-md">
                                <h4 className="text-lg font-bold">Feature {index + 1}</h4>

                                <div className="space-y-2">
                                    <Label className="text-md font-semibold">Input</Label>
                                    <Input {...register(`features.${index}.input.text`)} placeholder="Text" />
                                    <Input type="file" {...register(`features.${index}.input.media`)} />
                                    <Input {...register(`features.${index}.input.link`)} placeholder="Link" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-md font-semibold">Process</Label>
                                    <Input {...register(`features.${index}.process.text`)} placeholder="Text" />
                                    <Input type="file" {...register(`features.${index}.process.media`)} />
                                    <Input {...register(`features.${index}.process.link`)} placeholder="Link" />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-md font-semibold">Output</Label>
                                    <Input {...register(`features.${index}.output.text`)} placeholder="Text" />
                                    <Input type="file" {...register(`features.${index}.output.media`)} />
                                    <Input {...register(`features.${index}.output.link`)} placeholder="Link" />
                                </div>

                                <Button variant="destructive" type="button" onClick={() => remove(index)}>
                                    Remove Feature
                                </Button>
                            </div>
                        ))}

                        <Button variant="default" type="button" onClick={() => append({
                            input: { text: "", media: null, link: "" },
                            process: { text: "", media: null, link: "" },
                            output: { text: "", media: null, link: "" },
                        })}>
                            Add Feature
                        </Button>
                    </div>

                    <Button type="submit" variant="default" className="w-full mt-4">Create Project</Button>
                </form>
            </div>
        </div>
    );
};

export default ProjectCreateComponent;
