import { useState, useEffect } from 'react';
// API imports for notification operations
import { 
  getNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead,
  handleApiError 
} from '../services/api';

/**
 * Custom hook for managing user notifications
 * Handles API calls for notifications with loading states and error handling
 */
export const useNotifications = (filters = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  /**
   * Fetch notifications from API
   * API Call: GET /api/v1/notifications
   * @param {Object} newFilters - Notification filters
   */
  const fetchNotifications = async (newFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      
      const notificationsData = await getNotifications(newFilters);
      setNotifications(notificationsData);
      
      // Calculate unread count
      const unread = notificationsData.filter(notification => !notification.read).length;
      setUnreadCount(unread);
    } catch (err) {
      handleApiError(err, (error) => {
        setError(error.message);
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mark single notification as read
   * API Call: PUT /api/v1/notifications/{notificationId}/read
   * @param {string|number} notificationId - Notification ID
   */
  const markAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, read: true }
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      handleApiError(err, (error) => {
        console.error('Failed to mark notification as read:', error);
      });
    }
  };

  /**
   * Mark all notifications as read
   * API Call: PUT /api/v1/notifications/read-all
   */
  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, read: true }))
      );
      
      // Reset unread count
      setUnreadCount(0);
    } catch (err) {
      handleApiError(err, (error) => {
        console.error('Failed to mark all notifications as read:', error);
      });
    }
  };

  // Fetch notifications when filters change
  useEffect(() => {
    fetchNotifications();
  }, [JSON.stringify(filters)]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
};
