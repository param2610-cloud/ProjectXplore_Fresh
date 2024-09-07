import { Ideas } from '../../../lib/interface/INTERFACE'
import React from 'react'
import dayjs from 'dayjs' // Ensure you have dayjs installed for timestamp formatting


const CommentSectionForIdea = ({ IdeaDetails }: { IdeaDetails: Ideas }) => {
    console.log(IdeaDetails);
    
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Comments</h2>
      {
        IdeaDetails.idea_comments?.map((commentOBJ, index) => {
          const formattedTimestamp = dayjs(commentOBJ.comments.timestamp).format('MMMM D, YYYY h:mm A')
        
          return (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-md shadow hover:bg-gray-100">
              {/* Comment Text */}
              <div className="text-lg font-medium text-gray-900 mb-2">
                {commentOBJ.comments.comment_text}
              </div>

              {/* Author Name */}
              <div className="text-sm font-semibold text-gray-600 mb-2">
                Author: {commentOBJ.comments.users?.full_name || 'Anonymous'}
              </div>

              {/* Timestamp */}
              <div className="text-xs text-gray-500">
                Posted on: {formattedTimestamp}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export {CommentSectionForIdea}
