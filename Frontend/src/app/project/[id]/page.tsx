"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "@/lib/domain";
import { Facebook, Github, HeartIcon, Linkedin, Youtube } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Modal from "@/components/Model";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import useAuth from "@/lib/hooks/useUser";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import CommentsSection from "@/components/CommentSection";

export default function Page({ params }: { params: { id: string } }) {
    const [user] = useAtom(userAtom);
    console.log(user)
    const { loading, authenticated } = useAuth();
    const { toast } = useToast();
    useEffect(() => {
        if (!user) {
            if (!loading && authenticated) {
                toast({
                    title: "You are logged in.",
                    description: "You are logged in as previously logged user",
                });
            }
        }
    }, [user]);
    const [projectName, setProjectName] = useState<string>("");
    const [creator, setCreator] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [links, setLinks] = useState<any[]>([]);
    const [imageLinks, setImageLinks] = useState<any[]>([]);
    const [collaborators, setCollaborators] = useState<any[]>([]);
    const [roomName, setRoomName] = useState<string>("");
    const [roomId, setRoomId] = useState<string>();
    const [createdAt, setCreatedAt] = useState<string>("");
    const [likes, setLikes] = useState<number>(0);
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for the selected image
    const [modalOpen, setModalOpen] = useState<boolean>(false); // State for the modal visibility
    const [Likepress, setLikepress] = useState<boolean>(false); // State for the modal visibility

    const getData = async () => {
        try {
            const response = await axios.get(`${domain}/api/v1/project/get`, {
                params: { projectId: params.id },
            });
            const likeReponse = await axios.get(
                `${domain}/api/v1/project/project/likes`,
                {
                    params: { projectId: params.id },
                }
            );

            const project = response.data;
            console.log(project);

            setRoomId(project.roomId);
            setProjectName(project.name);
            setCreator(project.author?.name || "Unknown");
            setDescription(project.description);
            setLinks(project.links || []);
            setImageLinks(project.images || []);
            setCollaborators(
                project.room?.members.map((member: any) => member.user) || []
            );
            setRoomName(project.room?.name || "N/A");
            setCreatedAt(new Date(project.createdAt).toLocaleDateString());
            setLikes(likeReponse.data.count || 0);
            setComments(project.comments || []);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };
    const checkUserLike = async () => {
        try {
            const response = await axios.get(
                `${domain}/api/v1/project/project/check-like`,
                {
                    params: {
                        userId: user,
                        projectId: params.id,
                    },
                }
            );

            if (response.data.hasLiked) {
                setLikepress(true);
            } else {
                setLikepress(false);
            }
        } catch (error) {
            console.error("Error checking like status:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [params.id]);
    useEffect(() => {
        if (user && params.id) {
            checkUserLike();
        }
    }, [params.id, user]);

    const handleImageClick = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };
    const handleLike = async () => {
        try {
            if (Likepress == false) {
                const response = await axios.post(
                    `${domain}/api/v1/project/project/like`,
                    {
                        userId: user,
                        projectId: params.id,
                    }
                );
                if (response.status === 201) {
                    setLikepress(true);
                }

                setLikes(likes + 1);
            } else {
                handleRemoveLike();
            }
        } catch (error) {
            console.error("Error liking the project:", error);
        }
    };
    const handleRemoveLike = async () => {
        try {
            const response = await axios.post(
                `${domain}/api/v1/project/project/remove-likes`,
                {
                    userId: user,
                    projectId: params.id,
                }
            );
            if (response.status === 200) {
                setLikepress(false);
            }
            setLikes(likes - 1);
        } catch (error) {
            console.error("Error removing the like:", error);
        }
    };

    const handleCommentSubmit = () => {
        // Logic to submit a new comment
        // e.g., make an API request to save the comment
        // Reset new comment input
        setNewComment("");
    };

    const handleCommentLike = (commentId:string) => {
        // Logic to like a comment
        // e.g., make an API request to toggle the like status
        // setCommentLikes((prevLikes) => ({
        //     ...prevLikes,
        //     [commentId]: !prevLikes[commentId],
        // }));
    };

    return (
        <main className="w-screen min-h-screen max-h-full px-[300px] m-0 flex flex-col">
            <Toaster />
            <div id="header" className="flex flex-col w-full p-3">
                <div
                    id="title"
                    className=" text-[40px] font-bold flex w-full space-between justify-start items-center"
                >
                    <div className="flex-grow">{projectName}</div>
                    <div id="like" className="from-neutral-700 mt-10">
                        <HeartIcon
                            fill={Likepress ? "red" : "white"}
                            className="cursor-pointer"
                            size={30}
                            color="red"
                            onClick={handleLike}
                        />
                        <p className="text-gray-500 text-sm">{likes} Likes</p>
                    </div>
                </div>
                <div id="creator">
                    {roomId && roomName}
                    {roomId && " |"}
                    {creator}
                </div>
            </div>
            <div id="body" className="p-2 w-full flex flex-col">
                <div id="descLink" className="flex">
                    <div
                        id="desc"
                        className="flex-grow flex p-5 text-gray-600 shadow-lg mr-5 rounded-xl"
                    >
                        {description}
                    </div>
                    <div
                        id="usefulLink"
                        className="flex flex-col w-full border-2 rounded-lg p-4"
                    >
                        <div className="p-3 text-[20px] font-extrabold">
                            Useful Links
                        </div>
                        <div>
                            {links.map((link, index) => (
                                <div key={index} className="flex">
                                    <div className="w-7 flex justify-center items-center py-2">
                                        {link.url.includes("github") && (
                                            <Github />
                                        )}
                                        {link.url.includes("youtube") && (
                                            <Youtube />
                                        )}
                                        {link.url.includes("linkedin") && (
                                            <Linkedin />
                                        )}
                                        {link.url.includes("facebook") && (
                                            <Facebook />
                                        )}
                                    </div>
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        className="text-blue-600 hover:text-blue-800 flex justify-center items-center"
                                    >
                                        {link.url}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full mt-10 flex justify-center items-center">
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-full"
                    >
                        <CarouselContent>
                            {imageLinks.map((image, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-2 overflow-hidden">
                                                <img
                                                    src={image.url}
                                                    alt="Project Image"
                                                    className="object-cover w-full h-full cursor-pointer"
                                                    onClick={() =>
                                                        handleImageClick(
                                                            image.url
                                                        )
                                                    }
                                                />
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
            <div className="flex w-full">
                {roomId && (
                    <div className="room">
                        <div id="title">From the group of {roomName}</div>
                        <div id="collborator">
                            {collaborators.map((collaborator, index) => (
                                <div key={index}>{collaborator.name}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full mt-10 flex-col">
                {
                    user!=null &&  <CommentsSection projectId={params.id}/>
                }
            </div>
            <Modal
                isOpen={modalOpen}
                imageSrc={selectedImage || ""}
                onClose={handleCloseModal}
            />
        </main>
    );
}
