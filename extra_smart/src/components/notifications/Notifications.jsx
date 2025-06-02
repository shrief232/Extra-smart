import { useWebSocket } from '../hooks/useWebSocket';

const Notifications = () => {
  const { notifications, isConnected } = useWebSocket('ws://localhost:8000/ws/notifications/');

  return (
    <div>
      <h3>الإشعارات {isConnected ? '🟢' : '🔴'}</h3>
      <div>
        {notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            <p>{notification}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;