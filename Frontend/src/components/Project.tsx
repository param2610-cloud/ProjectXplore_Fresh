"use client";
import { userAtom } from '@/lib/atoms/UserAtom';
import { Domain } from "@/lib/Domain";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useAtom } from "jotai";
import { SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "./ui/card";
import { ComboboxDemo } from "./ui/combobox";
import { Input } from "./ui/input";
import Linkfiled from "./ui/Linkfiled";
import Mediainput from "./ui/mediainput";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
interface ProjectProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const Project: React.FC<ProjectProps> = ({ setRefresh }) => {
    const [loading, setloading] = useState<boolean>(false);
    const [mode, setmode] = useState();
    const [user] = useAtom(userAtom);
    const userid = user?.toString();
    const [ProjectChoice, setProjectChoice] = useState<string>("1");
    const [linkfields, setlinkfields] = useState<any>([{ id: 1, link: "" }]);
    const [name, setname] = useState<string>("");
    const [desc, setdesc] = useState<string>("");
    const [mediaFiles, setmediaFiles] = useState<File[]>([]);
    const { toast } = useToast();
    const handlemediaChange = (files: File[]) => {
        setmediaFiles(files);
    };
    const handleLinkChange = (id: any, value: string) => {
        setlinkfields(
            linkfields.map((field: any) => {
                if (field.id == id) {
                    return { ...field, link: value };
                }
                return field;
            })
        );
    };

    const projectsarray = [
        { value: "1", label: "Create Project" },
        { value: "2", label: "Update Project" },
    ];

    const addField = (event: any) => {
        event.preventDefault();
        setlinkfields([...linkfields, { id: linkfields.length + 1 }]);
    };
    const deleteField = (id: number) => {
        setlinkfields(linkfields.filter((field: any) => field.id != id));
    };

    const handleProjectValueChange = (newValue: string) => {
        setProjectChoice(newValue);
    };
    const handleSubmit = async () => {
        // if (typeof user === "string") {
        if (userid) {
            setRefresh(true);
            console.log("user : ", user);
            setloading(true);
            const links = linkfields.map((field: any) => field.link);
            const formData = new FormData();

            formData.append("name", name);
            formData.append("userId", userid ? userid : "");
            formData.append("description", desc);
            formData.append("links", JSON.stringify(links));

            mediaFiles.forEach((file) => {
                formData.append("images", file);
            });

            try {
                const response = await axios.post(
                    `${Domain}/api/v1/project/create`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("Project created successfully:", response.data);
                toast({
                    title: "Project Created Successfully",
                });
                setloading(false);
            } catch (error) {
                console.error(error);
                toast({
                    title: "Error Uploading the Project",
                    description: "Please try again.",
                });
                setloading(false);
                setRefresh(false);
            }
        }
        // }
    };

    return (
        <Card className="w-full flex flex-col justify-center items-start p-5">
            <CardTitle className="w-full flex justify-start">
                {/* <ComboboxDemo
                    frameworks={projectsarray}
                    placeholder="Select a project..."
                    defaultValue={ProjectChoice}
                    onValueChange={handleProjectValueChange}
                /> */}
            </CardTitle>
            <CardDescription className="w-full flex justify-start py-2 pl-4">
                Share your new project
            </CardDescription>
            <CardContent className="w-full flex justify-center ">
                <form className="w-full flex justify-center flex-1">
                    <div className="flex flex-col w-full items-center gap-4 justify-center flex-1">
                        <div className="flex flex-col space-y-1.5 w-full justify-center">
                            <Label
                                htmlFor="name"
                                className="w-full justify-start "
                            >
                                Name
                            </Label>
                            <Input
                                value={name}
                                onChange={(e: any) => setname(e.target.value)}
                                id="name"
                                placeholder="Name of your project"
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5 w-full">
                            <Label htmlFor="desc">Description</Label>
                            <Textarea
                                value={desc}
                                onChange={(e: any) => setdesc(e.target.value)}
                                id="desc"
                                placeholder="Description of your project"
                            />
                        </div>
                        {linkfields.map((field: any) => (
                            <Linkfiled
                                key={field.id}
                                id={field.id}
                                ondelete={deleteField}
                                onChange={handleLinkChange}
                            />
                        ))}
                        <Button type="button" onClick={addField}>
                            Add
                        </Button>
                        <Mediainput onChange={handlemediaChange} />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="w-full flex justify-center">
                <Button
                    onClick={handleSubmit}
                    disabled={loading ? true : false}
                >
                    Submit
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Project;
