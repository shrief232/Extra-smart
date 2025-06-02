// RealTimeNotifications.jsx
import { useState, useEffect } from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';
import api from '../../api';

const useRealTimeNotifications = () => {
  const [apiNotifications, setApiNotifications] = useState([]);
  const { notifications: wsNotifications } = useWebSocket('ws://localhost:8000/ws/notifications/');

  const readIds = JSON.parse(localStorage.getItem('read_notifications') || '[]');

  const updateLocalRead = (id) => {
    const updated = [...new Set([...readIds, id])];
    localStorage.setItem('read_notifications', JSON.stringify(updated));
  };

  const markAllLocalRead = (ids) => {
    const updated = [...new Set([...readIds, ...ids])];
    localStorage.setItem('read_notifications', JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await api.get('/en/notifications/');
        setApiNotifications(data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(`/en/notifications/${notificationId}/mark-read/`);
      setApiNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      updateLocalRead(notificationId);
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.post('/en/notifications/mark-all-read/');
      const allIds = allNotifications.map(n => n.id);
      setApiNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      markAllLocalRead(allIds);
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const allNotifications = [...wsNotifications, ...apiNotifications]
    .filter((n, i, self) => self.findIndex(m => m.id === n.id) === i)
    .map(n => ({
      ...n,
      is_read: n.is_read || readIds.includes(n.id),
    }));

  return { allNotifications, markAsRead, markAllAsRead };
};

export default useRealTimeNotifications;
