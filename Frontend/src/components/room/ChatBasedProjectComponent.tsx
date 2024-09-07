import React, { useState, ChangeEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FreshSearchBar } from "@/components/FreshSearchBar";
import FileInputComponent from "../FileInputCompo";
import {
    Deliverable,
    Feature,
    FeatureSection,
    media,
    Milestone,
    ProjectData,
    Risk,
    SuccessMetric,
    TechnicalRequirement,
} from "../../../lib/interface/INTERFACE";
import fea from "../../../lib/control/project/HandleFeatureChange";
import useFeatureHandler from "../../../lib/control/project/HandleFeatureChange";
import CloudinaryFileUpload from "../FileInputCompo";
import axios from "axios";
import { Domain } from "../../../lib/Domain";
import { useToast } from "../ui/use-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const ChatBasedProjectSubmit: React.FC = () => {
    const [step, setStep] = useState(0);
    const { toast } = useToast();
    const router = useRouter();
    const [roomId, setroomId] = useState<string>("");
    const pathname = usePathname();
    const parts = pathname.split("/");
    useEffect(() => {
        const roomIdFromPath = parts[2];
        if (roomIdFromPath && roomIdFromPath !== roomId) {
            setroomId(roomIdFromPath);
        }
        console.log(roomId);
    }, [pathname, roomId,parts]);
    const [projectData, setProjectData] = useState<ProjectData>({
        projectType: "",
        projectName: "",
        projectDescription: "",
        mentor: "",
        reference: "",
        demoLink: "",
        hardwareComponents: [],
        softwareTechnologies: [],
        features: [],
        technicalRequirements: {
            programmingLanguages: [],
            frameworks: [],
            databases: [],
            infrastructure: [],
            tools: [],
        },
        milestones: [],
        deliverables: [],
        budget: { totalAmount: 0, breakdown: {} },
        risks: [],
        successMetrics: [],
    });

    const {
        features,
        currentFeature,
        handleTextChange,
        handleFileUpload,
        addFeature,
        handleFileRemove,
    } = useFeatureHandler(projectData, setProjectData);
    useEffect(() => {
        console.log(features, currentFeature, projectData);
    }, [
        features,
        currentFeature,
        handleTextChange,
        handleFileUpload,
        handleFileRemove,
        addFeature,
        projectData
    ]);

    const handleHardwareComponentsChange = (components: any[]) => {
        setProjectData((prev) => ({ ...prev, hardwareComponents: components }));
    };
    const handleInputChange = (
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    };

    const handleArrayInputChange = (
        field: keyof TechnicalRequirement,
        value: string
    ) => {
        setProjectData((prev) => ({
            ...prev,
            technicalRequirements: {
                ...prev.technicalRequirements,
                [field]: value.split(",").map((item) => item.trim()),
            },
        }));
    };

    const addMilestone = (milestone: Milestone) => {
        setProjectData((prev) => ({
            ...prev,
            milestones: [...prev.milestones, milestone],
        }));
    };

    const addDeliverable = (deliverable: Deliverable) => {
        setProjectData((prev) => ({
            ...prev,
            deliverables: [...prev.deliverables, deliverable],
        }));
    };

    const addRisk = (risk: Risk) => {
        setProjectData((prev) => ({
            ...prev,
            risks: [...prev.risks, risk],
        }));
    };

    const addSuccessMetric = (metric: SuccessMetric) => {
        setProjectData((prev) => ({
            ...prev,
            successMetrics: [...prev.successMetrics, metric],
        }));
    };

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    const skipStep = () => nextStep();
    const SubmitFeature = () => {
        try {
            // Increment step if needed
            addFeature();

            setStep((prev) => prev + 1);
        } catch (error) {
            console.error(error);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="text-center ">
                        <h2 className="text-2xl font-bold mb-4">
                            Are you ready to submit your final project?
                        </h2>
                        <div className="flex justify-center">
                            {/* <Button onClick={prevStep}>Prev</Button> */}
                            {/* <Button onClick={skipStep}>Skip</Button> */}
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Let&apos;s start with the basics
                        </h2>

                        <div>
                            <Label>Project Type</Label>
                            <select
                                name="projectType"
                                value={projectData.projectType}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select Type</option>
                                <option value="hardware">Hardware</option>
                                <option value="software">Software</option>
                            </select>
                        </div>
                        <div>
                            <Label>Project Name</Label>
                            <Input
                                name="projectName"
                                value={projectData.projectName}
                                onChange={handleInputChange}
                                placeholder="Enter project name"
                            />
                        </div>
                        <div>
                            <Label>Project Description</Label>
                            <Textarea
                                name="projectDescription"
                                value={projectData.projectDescription}
                                onChange={handleInputChange}
                                placeholder="Describe your project"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Prev</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Additional Information
                        </h2>
                        <div>
                            <Label>Mentor</Label>
                            <Input
                                name="mentor"
                                value={projectData.mentor}
                                onChange={handleInputChange}
                                placeholder="Enter mentor's name"
                            />
                        </div>
                        <div>
                            <Label>Reference</Label>
                            <Input
                                name="reference"
                                value={projectData.reference}
                                onChange={handleInputChange}
                                placeholder="Enter reference source"
                            />
                        </div>
                        <div>
                            <Label>Demo Link</Label>
                            <Input
                                name="demoLink"
                                value={projectData.demoLink}
                                onChange={handleInputChange}
                                placeholder="Enter demo link"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Prev</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Project Components
                        </h2>
                        {projectData.projectType === "hardware" && (
                            <div>
                                <Label>Hardware Components</Label>
                                <FreshSearchBar
                                    FINALVALUE={projectData.hardwareComponents}
                                    SETFINALVALUE={
                                        handleHardwareComponentsChange
                                    }
                                    GET_LIST_API="/api/v1/project/component-list"
                                />
                            </div>
                        )}
                        <div>
                            <Label>Software Technologies</Label>
                            <Input
                                name="softwareTechnologies"
                                value={projectData.softwareTechnologies.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    setProjectData((prev) => ({
                                        ...prev,
                                        softwareTechnologies:
                                            e.target.value.split(", "),
                                    }))
                                }
                                placeholder="Enter technologies, separated by commas"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Prev</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Feature Details
                        </h2>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="border p-2 rounded mb-4"
                            >
                                <h3>Feature {index + 1}</h3>
                                <p>Input: {feature.input.text}</p>
                                <p>Process: {feature.process.text}</p>
                                <p>Output: {feature.output.text}</p>
                            </div>
                        ))}
                        <div>
                            <Label>Input</Label>
                            <Textarea
                                value={currentFeature.input.text}
                                onChange={(e) =>
                                    handleTextChange("input", e.target.value)
                                }
                                placeholder="Describe the input"
                            />
                            <CloudinaryFileUpload
                                section="input"
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                            />
                        </div>
                        <div>
                            <Label>Process</Label>
                            <Textarea
                                value={currentFeature.process.text}
                                onChange={(e) =>
                                    handleTextChange("process", e.target.value)
                                }
                                placeholder="Describe the process"
                            />
                            <CloudinaryFileUpload
                                section="process"
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                            />
                        </div>
                        <div>
                            <Label>Output</Label>
                            <Textarea
                                value={currentFeature.output.text}
                                onChange={(e) =>
                                    handleTextChange("output", e.target.value)
                                }
                                placeholder="Describe the output"
                            />
                            <CloudinaryFileUpload
                                section="output"
                                onFileUpload={handleFileUpload}
                                onFileRemove={handleFileRemove}
                            />
                        </div>

                        <Button onClick={addFeature}>Add Feature</Button>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={SubmitFeature}>Next</Button>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Technical Requirements
                        </h2>
                        <div>
                            <Label>Programming Languages</Label>
                            <Input
                                value={projectData.technicalRequirements.programmingLanguages.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "programmingLanguages",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter programming languages, separated by commas"
                            />
                        </div>
                        <div>
                            <Label>Frameworks</Label>
                            <Input
                                value={projectData.technicalRequirements.frameworks.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "frameworks",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter frameworks, separated by commas"
                            />
                        </div>
                        <div>
                            <Label>Databases</Label>
                            <Input
                                value={projectData.technicalRequirements.databases.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "databases",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter databases, separated by commas"
                            />
                        </div>
                        <div>
                            <Label>Infrastructure</Label>
                            <Input
                                value={projectData.technicalRequirements.infrastructure.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "infrastructure",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter infrastructure requirements, separated by commas"
                            />
                        </div>
                        <div>
                            <Label>Tools</Label>
                            <Input
                                value={projectData.technicalRequirements.tools.join(
                                    ", "
                                )}
                                onChange={(e) =>
                                    handleArrayInputChange(
                                        "tools",
                                        e.target.value
                                    )
                                }
                                placeholder="Enter required tools, separated by commas"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">Milestones</h2>
                        {projectData.milestones.map((milestone, index) => (
                            <div key={index} className="border p-2 rounded">
                                <p>
                                    <strong>Name:</strong> {milestone.name}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {milestone.description}
                                </p>
                                <p>
                                    <strong>Due Date:</strong>{" "}
                                    {milestone.dueDate}
                                </p>
                            </div>
                        ))}
                        <div>
                            <Label>Milestone Name</Label>
                            <Input
                                id="milestoneName"
                                placeholder="Enter milestone name"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                id="milestoneDescription"
                                placeholder="Describe the milestone"
                            />
                        </div>
                        <div>
                            <Label>Due Date</Label>
                            <Input type="date" id="milestoneDueDate" />
                        </div>
                        <Button
                            onClick={() => {
                                const name = (
                                    document.getElementById(
                                        "milestoneName"
                                    ) as HTMLInputElement
                                ).value;
                                const description = (
                                    document.getElementById(
                                        "milestoneDescription"
                                    ) as HTMLTextAreaElement
                                ).value;
                                const dueDate = (
                                    document.getElementById(
                                        "milestoneDueDate"
                                    ) as HTMLInputElement
                                ).value;
                                addMilestone({ name, description, dueDate });
                            }}
                        >
                            Add Milestone
                        </Button>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );

            case 7:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Project Deliverables
                        </h2>
                        {projectData.deliverables.map((deliverable, index) => (
                            <div key={index} className="border p-2 rounded">
                                <p>
                                    <strong>Name:</strong> {deliverable.name}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {deliverable.description}
                                </p>
                                <p>
                                    <strong>Type:</strong> {deliverable.type}
                                </p>
                            </div>
                        ))}
                        <div>
                            <Label>Deliverable Name</Label>
                            <Input
                                id="deliverableName"
                                placeholder="Enter deliverable name"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                id="deliverableDescription"
                                placeholder="Describe the deliverable"
                            />
                        </div>
                        <div>
                            <Label>Type</Label>
                            <select
                                id="deliverableType"
                                className="w-full p-2 border rounded"
                            >
                                <option value="document">Document</option>
                                <option value="software">Software</option>
                                <option value="data">Data</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <Button
                            onClick={() => {
                                const name = (
                                    document.getElementById(
                                        "deliverableName"
                                    ) as HTMLInputElement
                                ).value;
                                const description = (
                                    document.getElementById(
                                        "deliverableDescription"
                                    ) as HTMLTextAreaElement
                                ).value;
                                const type = (
                                    document.getElementById(
                                        "deliverableType"
                                    ) as HTMLSelectElement
                                ).value as
                                    | "document"
                                    | "software"
                                    | "data"
                                    | "other";
                                addDeliverable({ name, description, type });
                            }}
                        >
                            Add Deliverable
                        </Button>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );

            case 8:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Budget and Resources
                        </h2>
                        <div>
                            <Label>Budget Breakdown</Label>
                            {Object.entries(projectData.budget.breakdown).map(
                                ([key, value], index) => (
                                    <div
                                        key={index}
                                        className="flex space-x-2 mb-2"
                                    >
                                        <Input
                                            value={key}
                                            onChange={(e) => {
                                                const newBreakdown = {
                                                    ...projectData.budget
                                                        .breakdown,
                                                };
                                                const oldKey =
                                                    Object.keys(newBreakdown)[
                                                        index
                                                    ];
                                                delete newBreakdown[oldKey];
                                                newBreakdown[e.target.value] =
                                                    value;
                                                setProjectData((prev) => ({
                                                    ...prev,
                                                    budget: {
                                                        ...prev.budget,
                                                        breakdown: newBreakdown,
                                                    },
                                                }));
                                            }}
                                            placeholder="Category"
                                        />
                                        <Input
                                            type="number"
                                            value={value}
                                            onChange={(e) => {
                                                const newBreakdown = {
                                                    ...projectData.budget
                                                        .breakdown,
                                                };
                                                newBreakdown[key] = Number(
                                                    e.target.value
                                                );
                                                setProjectData((prev) => ({
                                                    ...prev,
                                                    budget: {
                                                        ...prev.budget,
                                                        breakdown: newBreakdown,
                                                    },
                                                }));
                                            }}
                                            placeholder="Amount"
                                        />
                                    </div>
                                )
                            )}
                            <Button
                                onClick={() => {
                                    const newBreakdown = {
                                        ...projectData.budget.breakdown,
                                        "": 0,
                                    };
                                    setProjectData((prev) => ({
                                        ...prev,
                                        budget: {
                                            ...prev.budget,
                                            breakdown: newBreakdown,
                                        },
                                    }));
                                }}
                            >
                                Add Budget Item
                            </Button>
                        </div>
                        <div>
                            <Label>Total Budget</Label>
                            <Input
                                type="number"
                                value={Object.values(
                                    projectData.budget.breakdown
                                ).reduce((a, b) => a + b, 0)}
                                readOnly
                                placeholder="Total budget"
                            />
                        </div>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );
            case 9:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Risks and Assumptions
                        </h2>
                        {projectData.risks.map((risk, index) => (
                            <div key={index} className="border p-2 rounded">
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {risk.description}
                                </p>
                                <p>
                                    <strong>Impact:</strong> {risk.impact}
                                </p>
                                <p>
                                    <strong>Mitigation:</strong>{" "}
                                    {risk.mitigation}
                                </p>
                            </div>
                        ))}
                        <div>
                            <Label>Risk Description</Label>
                            <Textarea
                                id="riskDescription"
                                placeholder="Describe the risk"
                            />
                        </div>
                        <div>
                            <Label>Impact</Label>
                            <select
                                id="riskImpact"
                                className="w-full p-2 border rounded"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <Label>Mitigation Strategy</Label>
                            <Textarea
                                id="riskMitigation"
                                placeholder="Describe the mitigation strategy"
                            />
                        </div>
                        <Button
                            onClick={() => {
                                const description = (
                                    document.getElementById(
                                        "riskDescription"
                                    ) as HTMLTextAreaElement
                                ).value;
                                const impact = (
                                    document.getElementById(
                                        "riskImpact"
                                    ) as HTMLSelectElement
                                ).value as "low" | "medium" | "high";
                                const mitigation = (
                                    document.getElementById(
                                        "riskMitigation"
                                    ) as HTMLTextAreaElement
                                ).value;
                                addRisk({ description, impact, mitigation });
                            }}
                        >
                            Add Risk
                        </Button>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );

            case 10:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Success Metrics and Evaluation
                        </h2>
                        {projectData.successMetrics.map((metric, index) => (
                            <div key={index} className="border p-2 rounded">
                                <p>
                                    <strong>Name:</strong> {metric.name}
                                </p>
                                <p>
                                    <strong>Description:</strong>{" "}
                                    {metric.description}
                                </p>
                                <p>
                                    <strong>Target Value:</strong>{" "}
                                    {metric.targetValue}
                                </p>
                            </div>
                        ))}
                        <div>
                            <Label>Metric Name</Label>
                            <Input
                                id="metricName"
                                placeholder="Enter metric name"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                id="metricDescription"
                                placeholder="Describe the success metric"
                            />
                        </div>
                        <div>
                            <Label>Target Value</Label>
                            <Input
                                id="metricTargetValue"
                                placeholder="Enter target value"
                            />
                        </div>
                        <Button
                            onClick={() => {
                                const name = (
                                    document.getElementById(
                                        "metricName"
                                    ) as HTMLInputElement
                                ).value;
                                const description = (
                                    document.getElementById(
                                        "metricDescription"
                                    ) as HTMLTextAreaElement
                                ).value;
                                const targetValue = (
                                    document.getElementById(
                                        "metricTargetValue"
                                    ) as HTMLInputElement
                                ).value;
                                addSuccessMetric({
                                    name,
                                    description,
                                    targetValue,
                                });
                            }}
                        >
                            Add Success Metric
                        </Button>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={skipStep}>Skip</Button>
                            <Button onClick={nextStep}>Next</Button>
                        </div>
                    </div>
                );

            case 11:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold mb-4">
                            Review Your Project
                        </h2>
                        <pre className="bg-background p-4 rounded overflow-auto">
                            {JSON.stringify(projectData, null, 2)}
                        </pre>
                        <div className="flex justify-between">
                            <Button onClick={prevStep}>Back</Button>
                            <Button onClick={handleSubmit}>
                                Submit Project
                            </Button>
                        </div>
                    </div>
                );

            default:
                return <div>Invalid step</div>;
        }
    };
    const handleSubmit = async () => {
        try {
            console.log(projectData);

            const response = await axios.post(
                `${Domain}/api/v1/project/create`,
                { roomId, projectData }
            );

            if (response.status === 200) {
                alert("Project submitted successfully!");
                toast({
                    title: "Project Submitted Succesfully",
                    description:
                        "As the project is submitted, we are closing the room.",
                });
                router.push(`/project/${response.data.data.id}`);
            } else {
                toast({
                    variant: "destructive",
                    title: "Project Submission Update",
                    description:
                        "Unfortunately, the project has not been successfully submitted.",
                });
                throw new Error("Failed to submit project");
            }
        } catch (error) {
            console.error("Error submitting project:", error);
            alert(
                "An error occurred while submitting the project. Please try again."
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Submit Your Project</h1>
            {renderStep()}
        </div>
    );
};

export default ChatBasedProjectSubmit;
