import React, { useState, useEffect } from "react";
import axios from "axios";
import { domain } from "@/lib/domain";
import { HeartIcon } from "lucide-react";
import { useAtom } from "jotai";
import { userAtom } from "@/lib/atoms/userAtom";
import { Avatar, AvatarImage } from "./ui/avatar";

export default function CommentsSection({ projectId }: { projectId: string }) {
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [user] = useAtom(userAtom);
    console.log("this is useratom: ", user);

    useEffect(() => {
        // Fetch initial comments
        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `${domain}/api/v1/project/comment/list`,
                    {
                        params: { projectId },
                    }
                );
                console.log(response);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [projectId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(
                `${domain}/api/v1/project/comment/create`,
                {
                    content: newComment,
                    authorId: user,
                    projectId,
                }
            );
            console.log(response);

            if (response.status === 201) {
                setComments((prevComments) => [
                    ...prevComments,
                    response.data.comment,
                ]);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    const handleCommentLike = async (commentId: number) => {
        try {
            const response = await axios.post(
                `${domain}/api/v1/project/comment/like`,
                {
                    userId: user,
                    commentId,
                }
            );

            console.log(response);
            if (response.status === 201) {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === commentId
                            ? {
                                  ...comment,
                                  likedUserIds: [...comment.likedUserIds, user],
                                  likesCount: comment.likesCount + 1,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    const handleRemoveCommentLike = async (commentId: number) => {
        try {
            const response = await axios.post(
                `${domain}/api/v1/project/comment/remove-likes`,
                {
                    userId: user,
                    commentId,
                }
            );

            if (response.status === 200) {
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment.id === commentId
                            ? {
                                  ...comment,
                                  likedUserIds: comment.likedUserIds.filter(
                                      (id: any) => id !== user
                                  ),
                                  likesCount: comment.likesCount - 1,
                              }
                            : comment
                    )
                );
            }
        } catch (error) {
            console.error("Error removing comment like:", error);
        }
    };

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    return (
        <div className="comments-section">
            <h2 className="text-lg font-semibold">Comments</h2>
            <div className="comments-list">
                {comments &&
                    comments.map((comment) => {
                        // const [isLike,setisLike] = useState<boolean>(false);

                        return (
                            <div
                                key={comment.id}
                                id={comment.id}
                                className="comment flex m-5"
                            >
                                <Avatar>
                                    <AvatarImage
                                        className=""
                                        src={comment?.author?.avatarUrl}
                                        alt=""
                                    />
                                </Avatar>
                                <div className="flex flex-col flex-grow ml-4">
                                    <div className="comment-author font-semibold">
                                        {comment?.author?.name}
                                    </div>
                                    <div className="comment-content pl-2">
                                        {comment?.content}
                                    </div>
                                </div>
                                    <div className="comment-actions">
                                        <HeartIcon
                                            className="cursor-pointer"
                                            size={20}
                                            color="red"
                                            fill={
                                                comment?.likedUserIds?.includes(
                                                    user
                                                )
                                                    ? "red"
                                                    : "white"
                                            }
                                            onClick={() =>
                                                comment?.likedUserIds?.includes(
                                                    user
                                                )
                                                    ? handleRemoveCommentLike(
                                                          comment.id
                                                      )
                                                    : handleCommentLike(
                                                          comment.id
                                                      )
                                            }
                                        />
                                        <span>{comment.likesCount} Likes</span>
                                    </div>
                            </div>
                        );
                    })}
            </div>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-lg"
                rows={4}
            />
            <button
                onClick={handleCommentSubmit}
                className="mt-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Post Comment
            </button>
        </div>
    );
}
