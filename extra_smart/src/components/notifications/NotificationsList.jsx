import { useState, useEffect } from 'react';
import api from '../../api';

const NotificationsList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/en/notifications/');
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id} className="notification">
          <a href={notification.url}>{notification.message}</a>
          {!notification.is_read && <span className="unread-dot"></span>}
        </div>
      ))}
    </div>
  );
};

export default NotificationsList;