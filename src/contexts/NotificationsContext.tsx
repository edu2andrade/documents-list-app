// import { NotificationType } from "@/services";
import { createContext, useContext, useState } from 'react';

type tmpNotificationType = {
  title: string;
  version: string;
};

type NotificationsContextType = {
  notifications: tmpNotificationType[];
  addNotification: (notification: tmpNotificationType) => void;
  clearNotifications: () => void;
};

const initialValue = {
  notifications: [] as tmpNotificationType[],
  addNotification: (notification: tmpNotificationType) => {
    // empty object
  },
  clearNotifications: () => {
    // empty object
  },
};

export const NotificationsContext = createContext<NotificationsContextType>(initialValue);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<tmpNotificationType[]>([]);

  function addNotification(notification: tmpNotificationType) {
    setNotifications((prev) => [...prev, notification]);
    console.log('Notification added:', notification);
  }

  const value = {
    notifications,
    addNotification,
    clearNotifications: () => setNotifications([]),
  };
  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
}
