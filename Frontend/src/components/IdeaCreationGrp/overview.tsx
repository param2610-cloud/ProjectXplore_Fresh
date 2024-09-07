import { Ideas } from "../../../lib/interface/INTERFACE";
import React from "react";

const Overview = ({ IdeaDetails }: { IdeaDetails: Ideas }) => {
    return (
        <div className="w-full h-full bg-white shadow-md rounded-lg p-6">
            {/* Post Overview */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                    Post Overview
                </h1>
            </div>

            {/* Post Likes */}
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-700">
                    Post Likes:{" "}
                    <span className="font-bold">
                        {IdeaDetails.idea_impressions.length}
                    </span>
                </h2>
            </div>

            {/* Like Members */}
            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Like Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {IdeaDetails.idea_impressions &&
                        IdeaDetails.idea_impressions.map((idea, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-md shadow hover:bg-gray-100"
                                >
                                    <div className="text-sm font-medium text-gray-900">
                                        {idea.users[0].full_name}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Overview;
