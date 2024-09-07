import React from 'react';
import { format } from 'date-fns';
import { update } from '../../lib/interface/INTERFACE';
import Image from 'next/image';

const ProjectUpdates = ({ updateList, currentUserId }:{updateList:update[],currentUserId:string}) => {
  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      {updateList.map((update, index) => {
        const isCurrentUser = update.author_id === currentUserId;
        return (
          <div
            key={update.id}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[50%] h-[40%] ${
                isCurrentUser
                  ? 'bg-blue-500 text-white rounded-l-lg rounded-br-lg'
                  : 'bg-gray-200 text-black rounded-r-lg rounded-bl-lg'
              } p-3 shadow-md`}
            >
              <div className="font-semibold mb-1">
                {update?.author_details?.full_name}
              </div>
              <div className="mb-2">{update.text}</div>
              {update.image_link && update.image_link.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {update.image_link.map((image, imgIndex) => (
                    <Image
                    width={128}
                    height={0}
                    style={{objectFit:'cover'}}
                      key={imgIndex}
                      src={image}
                      alt={`Update image ${imgIndex + 1}`}
                      className="w-32 h-auto rounded"
                    />
                  ))}
                </div>
              )}
              {update.video_link && update.video_link.length > 0 && (
                <div className="mb-2">
                  {update.video_link.map((video, vidIndex) => (
                    <video
                      key={vidIndex}
                      src={video}
                      controls
                      className="max-w-full h-auto rounded"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              )}
              <div className="text-xs opacity-75">
                {format(new Date(update.createdAt), 'MMM d, yyyy HH:mm')}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectUpdates;