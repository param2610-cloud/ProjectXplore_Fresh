import React from 'react';
import { Bell, X } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import useFirebaseNotifications from '../../lib/control/FirebaseNotification';

const NotificationItem = ({ notification, onDismiss }:{ notification:any, onDismiss:any }) => (
  <div className="flex items-center justify-between p-4 border-b last:border-b-0">
    <div>
      <h4 className="font-semibold">{notification.title}</h4>
      <p className="text-sm text-gray-500">{notification.message}</p>
    </div>
    <Button variant="ghost" size="sm" onClick={() => onDismiss(notification.id)}>
      <X className="h-4 w-4" />
    </Button>
  </div>
);

const Notification = ({ url }:{url:string}) => {
  const { notifications, error } = useFirebaseNotifications(url);

  const handleDismiss = (id:any) => {
    // Implement dismiss logic here
    console.log('Dismissing notification:', id);
  };

  return (
      <>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">Notifications</h3>
          <Button variant="ghost" size="sm" onClick={() => console.log('Mark all as read')}>
            Mark all as read
          </Button>
        </div>
        <ScrollArea className="h-[300px]">
          {error && <p className="text-red-500 p-4">{error}</p>}
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 p-4">No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onDismiss={handleDismiss}
              />
            ))
          )}
        </ScrollArea>
      </>
  );
};

export default Notification;