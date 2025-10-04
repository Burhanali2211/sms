import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import { Notification } from "@/types/dashboard";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/utils/api/client";
import { useAuth } from "@/contexts/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const { notifications, isLoading, refetch } = useDashboardData();
  
  const markAsRead = async (id: string) => {
    if (!user) return;
    
    try {
      const response = await apiClient.markNotificationRead(id, user.id);
      if (response.error) {
        throw new Error(response.error);
      }
      
      // Refresh the notifications
      await refetch();
      
      toast({
        title: "Success",
        description: "Notification marked as read.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read.",
        variant: "destructive",
      });
    }
  };
  
  const markAllAsRead = async () => {
    if (!user) return;
    
    try {
      // Mark all unread notifications as read
      const unreadNotifications = notifications.filter(n => !n.is_read);
      await Promise.all(
        unreadNotifications.map(notification => 
          apiClient.markNotificationRead(notification.id, user.id)
        )
      );
      
      // Refresh the notifications
      await refetch();
      
      toast({
        title: "Success",
        description: "All notifications marked as read.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark all notifications as read.",
        variant: "destructive",
      });
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <DashboardLayout>
      <DashboardHeader title="Notifications" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && (
                <span className="ml-2 bg-school-primary text-white text-xs rounded-full px-2 py-1">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all as read
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-lg">No notifications</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-md transition-colors ${
                      notification.is_read ? 'bg-white' : 'bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <Checkbox 
                        className="mt-1 mr-3"
                        checked={notification.is_read}
                        onCheckedChange={() => markAsRead(notification.id)}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className={`font-medium ${!notification.is_read ? 'font-semibold' : ''}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                            {notification.type}
                          </span>
                          {!notification.is_read && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-6 text-xs"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;