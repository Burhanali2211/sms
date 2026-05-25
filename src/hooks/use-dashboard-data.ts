import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  MOCK_STATS_BY_ROLE,
  MOCK_NOTIFICATIONS,
  MOCK_EVENTS,
  type MockNotification,
  type MockEvent,
} from '@/data/mock/dashboard';
import { DashboardStat } from '@/types/dashboard';

// Re-export the types expected by consumers
export type { MockNotification as Notification, MockEvent as Event };

const isDemoToken = () => {
  const token = localStorage.getItem('authToken');
  return !token || token.startsWith('demo-token-');
};

export function useDashboardData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [notifications, setNotifications] = useState<MockNotification[]>([]);
  const [events, setEvents] = useState<MockEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMockData = () => {
    if (!user) return;
    const role = user.role;
    const roleStats = MOCK_STATS_BY_ROLE[role] ?? MOCK_STATS_BY_ROLE['admin'];
    setStats(roleStats);
    setNotifications(MOCK_NOTIFICATIONS);
    setEvents(MOCK_EVENTS);
    setError(null);
    setIsLoading(false);
  };

  const fetchDashboardData = async () => {
    if (!user) return;
    setIsLoading(true);

    // Always use mock data in demo mode (no backend running)
    if (isDemoToken()) {
      // Small artificial delay so loading states are visible
      await new Promise(r => setTimeout(r, 300));
      loadMockData();
      return;
    }

    // Real API path (backend available)
    try {
      const { apiClient } = await import('@/utils/api/client');
      const [statsRes, notifRes, eventsRes] = await Promise.all([
        apiClient.getDashboardStats(user.role, user.id),
        apiClient.getNotifications(user.id),
        apiClient.getEvents(user.id, user.role),
      ]);

      if (statsRes.error || notifRes.error || eventsRes.error) throw new Error('API error');

      const backendStats = (statsRes.data as any[] ?? []).map((s: any) => ({
        title: s.label ?? s.title,
        value: s.value,
        description: s.description,
      }));
      setStats(backendStats.length ? backendStats : MOCK_STATS_BY_ROLE[user.role] ?? []);
      setNotifications((notifRes.data as MockNotification[]) ?? MOCK_NOTIFICATIONS);
      setEvents((eventsRes.data as MockEvent[]) ?? MOCK_EVENTS);
    } catch {
      // Silently fall back to mock data — client demo must not show errors
      toast({ title: 'Demo Mode', description: 'Using demo data — backend not connected.' });
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
    );
    toast({ title: 'Marked as read', description: 'Notification updated.' });
  };

  useEffect(() => {
    fetchDashboardData();
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
    markNotificationAsRead,
  };
}
