import React from 'react';
import { format } from 'date-fns';
import { update } from '../../lib/interface/INTERFACE';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ProjectUpdates = ({ updateList, currentUserId }:{updateList:update[], currentUserId:string}) => {
  return (
    <div className="w-full space-y-6 p-4">
      {updateList.map((update, index) => {
        const isCurrentUser = update.author_id === currentUserId;
        
        return (
          <motion.div
            key={update.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[500px] rounded-2xl backdrop-blur-sm border ${
                isCurrentUser
                  ? 'bg-blue-500/10 border-blue-500/20 text-blue-50'
                  : 'bg-neutral-900/50 border-neutral-800 text-neutral-50'
              } overflow-hidden`}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-neutral-800/50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${
                    isCurrentUser ? 'from-blue-400 to-violet-400' : 'from-neutral-400 to-neutral-600'
                  } flex items-center justify-center text-white font-medium`}>
                    {update?.author_details?.full_name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{update?.author_details?.full_name}</div>
                    <div className="text-xs opacity-60">
                      {format(new Date(update.createdAt), 'MMM d, yyyy • HH:mm')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-4 whitespace-pre-wrap">{update.text}</div>

                {/* Images */}
                {update.image_link && update.image_link.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {update.image_link.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative aspect-video rounded-lg overflow-hidden group">
                        <Image
                          src={image}
                          alt={`Update image ${imgIndex + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Videos */}
                {update.video_link && update.video_link.length > 0 && (
                  <div className="space-y-2">
                    {update.video_link.map((video, vidIndex) => (
                      <div key={vidIndex} className="relative rounded-lg overflow-hidden">
                        <video
                          src={video}
                          controls
                          className="w-full"
                          style={{ maxHeight: '400px' }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProjectUpdates;