import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

interface AccessibilitySettingsProps {
  accessibilitySettings: {
    highContrast: boolean;
    largerText: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  };
  setAccessibilitySettings: React.Dispatch<React.SetStateAction<{
    highContrast: boolean;
    largerText: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  }>>;
  handleSaveSettings: () => void;
}

export const AccessibilitySettings = ({
  accessibilitySettings, setAccessibilitySettings,
  handleSaveSettings
}: AccessibilitySettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>
          Adjust settings to improve your browsing experience
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better readability
              </p>
            </div>
            <Switch 
              checked={accessibilitySettings.highContrast}
              onCheckedChange={(checked) => 
                setAccessibilitySettings({...accessibilitySettings, highContrast: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Larger Text</Label>
              <p className="text-sm text-muted-foreground">
                Increase base font size for better readability
              </p>
            </div>
            <Switch 
              checked={accessibilitySettings.largerText}
              onCheckedChange={(checked) => 
                setAccessibilitySettings({...accessibilitySettings, largerText: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimize animations and transitions
              </p>
            </div>
            <Switch 
              checked={accessibilitySettings.reducedMotion}
              onCheckedChange={(checked) => 
                setAccessibilitySettings({...accessibilitySettings, reducedMotion: checked})
              }
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Screen Reader Support</Label>
              <p className="text-sm text-muted-foreground">
                Optimize interface for screen readers
              </p>
            </div>
            <Switch 
              checked={accessibilitySettings.screenReader}
              onCheckedChange={(checked) => 
                setAccessibilitySettings({...accessibilitySettings, screenReader: checked})
              }
            />
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
