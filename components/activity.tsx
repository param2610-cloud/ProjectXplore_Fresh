import React from 'react'
import { notification } from '@/app/(head)/activity/page'

interface ActivityProps {
    notifications:notification[]
}


const Activity = ({notifications}:ActivityProps) => {
  return (
    <div>
      {notifications.map((notification, index) => (
              <div
              key={index}
              className="mb-4 flex gap-4 items-start pb-4 last:mb-0 last:pb-0 "
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-[#DF5173]" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
    </div>
  )
}

export default Activity
