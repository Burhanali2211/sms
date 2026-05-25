import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Layout } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface AppearanceSettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const AppearanceSettings = ({ isLoading, handleSave }: AppearanceSettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="Theme Settings" 
        description="Configure visual appearance of the application" 
        icon={Layout}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Dark Mode Default" 
            description="Set dark mode as the default theme"
          >
            <Switch />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Primary Color" 
            description="Main color used throughout the application"
          >
            <div className="flex flex-wrap gap-2">
              {["#1E40AF", "#047857", "#7E22CE", "#B91C1C", "#0369A1", "#000000"].map(color => (
                <div 
                  key={color} 
                  className="w-8 h-8 rounded-full cursor-pointer border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="School Logo" 
            description="Upload your school logo (Recommended: 200x200px)"
          >
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">Upload Logo</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Appearance Settings")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="Dashboard Layout" 
        description="Configure the default dashboard layout for users" 
        icon={Layout}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Compact View" 
            description="Use a more compact layout for dashboard elements"
          >
            <Switch />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Show Quick Actions" 
            description="Display quick action buttons on the dashboard"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Widget Arrangement" 
            description="Choose default widget arrangement order"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                <span className="text-muted-foreground">1</span>
                <span>Calendar</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                <span className="text-muted-foreground">2</span>
                <span>Notifications</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/50 rounded border">
                <span className="text-muted-foreground">3</span>
                <span>Recent Activities</span>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Dashboard Layout")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>
    </div>
  );
};
