import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";

interface NotificationSettingsProps {
  notificationSettings: {
    emailNotifications: boolean;
    appNotifications: boolean;
    smsNotifications: boolean;
    dailySummary: boolean;
  };
  setNotificationSettings: React.Dispatch<React.SetStateAction<{
    emailNotifications: boolean;
    appNotifications: boolean;
    smsNotifications: boolean;
    dailySummary: boolean;
  }>>;
  handleSaveSettings: () => void;
}

export const NotificationSettings = ({
  notificationSettings, setNotificationSettings,
  handleSaveSettings
}: NotificationSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure how you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch 
              checked={notificationSettings.emailNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, emailNotifications: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications in the app
              </p>
            </div>
            <Switch 
              checked={notificationSettings.appNotifications}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, appNotifications: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important notifications via SMS
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Premium
              </Badge>
              <Switch 
                checked={notificationSettings.smsNotifications}
                onCheckedChange={(checked) => 
                  setNotificationSettings({...notificationSettings, smsNotifications: checked})
                }
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Daily Summary</Label>
              <p className="text-sm text-muted-foreground">
                Receive a daily summary of activities
              </p>
            </div>
            <Switch 
              checked={notificationSettings.dailySummary}
              onCheckedChange={(checked) => 
                setNotificationSettings({...notificationSettings, dailySummary: checked})
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="notification-time">Preferred Time for Notifications</Label>
            <Input
              type="time"
              id="notification-time"
              defaultValue="09:00"
              className="w-full md:w-1/3"
            />
            <p className="text-sm text-muted-foreground">
              Non-urgent notifications will be delivered at this time.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
};
