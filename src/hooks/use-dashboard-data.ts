import { useState, useEffect } from 'react';
import { apiClient } from '@/utils/api/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface BackendDashboardStat {
  metric: string;
  value: number;
  label: string;
  description: string;
}

interface BackendNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}

interface BackendEvent {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
}

// Frontend types
interface DashboardStat {
  title: string;
  value: string | number;
  description: string;
  change?: string | number;
  increasing?: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
  event_type: string;
}

export function useDashboardData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch dashboard stats
      const statsResponse = await apiClient.getDashboardStats(user.role, user.id);
      if (statsResponse.error) {
        throw new Error(statsResponse.error);
      }
      
      // Transform backend stats to frontend format
      const transformedStats: DashboardStat[] = ((statsResponse.data as BackendDashboardStat[]) || []).map(stat => ({
        title: stat.label,
        value: stat.value,
        description: stat.description
      }));
      setStats(transformedStats);

      // Fetch notifications
      const notificationsResponse = await apiClient.getNotifications(user.id);
      if (notificationsResponse.error) {
        throw new Error(notificationsResponse.error);
      }
      // Transform backend notifications to frontend format
      const transformedNotifications: Notification[] = ((notificationsResponse.data as BackendNotification[]) || []).map((notif: any) => ({
        id: notif.id,
        title: notif.title,
        message: notif.message,
        type: notif.type || 'info',
        is_read: notif.is_read || false,
        created_at: notif.created_at
      }));
      setNotifications(transformedNotifications);

      // Fetch events
      const eventsResponse = await apiClient.getEvents(user.id, user.role);
      if (eventsResponse.error) {
        throw new Error(eventsResponse.error);
      }
      // Transform backend events to frontend format
      const transformedEvents: Event[] = ((eventsResponse.data as BackendEvent[]) || []).map((event: any) => ({
        id: event.id,
        title: event.title,
        description: event.description,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        event_type: event.event_type
      }));
      setEvents(transformedEvents);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data. Using fallback data.',
        variant: 'destructive',
      });

      // Set fallback data
      setStats([
        { title: 'Loading...', value: 0, description: 'Data will load shortly' }
      ]);
      setNotifications([]);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) return;
    
    try {
      const response = await apiClient.markNotificationRead(notificationId, user.id);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user?.id, user?.role]);

  return {
    stats,
    notifications,
    events,
    isLoading,
    error,
    refetch: fetchDashboardData,
    markNotificationAsRead
  };
}