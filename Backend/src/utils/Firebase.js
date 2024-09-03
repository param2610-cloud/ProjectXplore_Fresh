import fetch from 'node-fetch'

export const sendNotification = async (notification) => {
  const url = 'https://projectxplore-7c636-default-rtdb.firebaseio.com/notifications.json'; // Replace with your Firebase DB URL
  const data = {
    message: notification.message,
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log('Notification posted successfully');
    } else {
      console.error('Failed to post notification:', response.statusText);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Example usage

