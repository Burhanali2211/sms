import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Notification } from "@/types/dashboard";

interface DashboardNotificationsProps {
  notifications: Notification[];
}

const DashboardNotifications = ({ notifications }: DashboardNotificationsProps) => {
  const formatTime = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications && notifications.length > 0 ? notifications.slice(0, 3).map((notification) => (
            <div key={notification.id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{formatTime(notification.createdAt || notification.time)}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          )) : (
            <div className="text-center py-4 text-muted-foreground">
              No recent notifications
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardNotifications;