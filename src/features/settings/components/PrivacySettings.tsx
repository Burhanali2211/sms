import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save } from "lucide-react";

interface PrivacySettingsProps {
  privacySettings: {
    showProfile: boolean;
    showActivity: boolean;
    allowMessages: boolean;
    publicCalendar: boolean;
  };
  setPrivacySettings: React.Dispatch<React.SetStateAction<{
    showProfile: boolean;
    showActivity: boolean;
    allowMessages: boolean;
    publicCalendar: boolean;
  }>>;
  handleSaveSettings: () => void;
}

export const PrivacySettings = ({
  privacySettings, setPrivacySettings,
  handleSaveSettings
}: PrivacySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control who can see your information and activity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-primary/5 border border-primary/20 mb-6">
          <AlertDescription>
            Your privacy is important to us. These settings determine what information others can see about you.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to see your profile
              </p>
            </div>
            <Switch 
              checked={privacySettings.showProfile}
              onCheckedChange={(checked) => 
                setPrivacySettings({...privacySettings, showProfile: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Activity Status</Label>
              <p className="text-sm text-muted-foreground">
                Show when you're active on the platform
              </p>
            </div>
            <Switch 
              checked={privacySettings.showActivity}
              onCheckedChange={(checked) => 
                setPrivacySettings({...privacySettings, showActivity: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Direct Messages</Label>
              <p className="text-sm text-muted-foreground">
                Allow other users to send you direct messages
              </p>
            </div>
            <Switch 
              checked={privacySettings.allowMessages}
              onCheckedChange={(checked) => 
                setPrivacySettings({...privacySettings, allowMessages: checked})
              }
            />
          </div>

          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Public Calendar</Label>
              <p className="text-sm text-muted-foreground">
                Make your calendar visible to other users
              </p>
            </div>
            <Switch 
              checked={privacySettings.publicCalendar}
              onCheckedChange={(checked) => 
                setPrivacySettings({...privacySettings, publicCalendar: checked})
              }
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <Label htmlFor="data-sharing">Data Sharing</Label>
            <Select defaultValue="minimal">
              <SelectTrigger id="data-sharing">
                <SelectValue placeholder="Select data sharing level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None - Don't share any data</SelectItem>
                <SelectItem value="minimal">Minimal - Only essential information</SelectItem>
                <SelectItem value="standard">Standard - Normal information sharing</SelectItem>
                <SelectItem value="enhanced">Enhanced - Share more details</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Control how much information is shared with the EduSync platform to improve your experience.
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
