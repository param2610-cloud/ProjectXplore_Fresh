import { useEffect, useState } from 'react';

const useFirebaseNotifications = (url:string) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Update notifications state
        setNotifications(Object.values(data || {})); // Object.values converts the Firebase response into an array
      } else {
        console.error('Failed to fetch notifications:', response.statusText);
        setError('Failed to fetch notifications');
      }
    } catch (err:any) {
      console.error('Error fetching notifications:', err);
      setError(err.message);
    }
  };

  // Polling logic
  useEffect(() => {
    fetchNotifications(); // Fetch once on mount
    const intervalId = setInterval(fetchNotifications, 1000000); // Poll every 30 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [url,fetchNotifications]); // Re-run if the URL changes

  return { notifications, error };
};

export default useFirebaseNotifications;
