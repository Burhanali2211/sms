import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Users } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface AdvancedSettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const AdvancedSettings = ({ isLoading, handleSave }: AdvancedSettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="System Maintenance" 
        description="Advanced system maintenance options" 
        icon={Settings}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Maintenance Mode" 
            description="Take the system offline for maintenance"
          >
            <div className="flex flex-col gap-2">
              <Switch />
              <p className="text-sm text-muted-foreground">
                Warning: This will prevent all users from accessing the system
              </p>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="System Cache" 
            description="Clear system cache to resolve issues"
          >
            <Button variant="outline">Clear Cache</Button>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Database Optimization" 
            description="Optimize database for better performance"
          >
            <Button variant="outline">Run Optimization</Button>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Error Logging" 
            description="Configure system error logging level"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="log-errors" name="logging" defaultChecked />
                <Label htmlFor="log-errors">Errors Only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="log-warnings" name="logging" />
                <Label htmlFor="log-warnings">Errors & Warnings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="log-all" name="logging" />
                <Label htmlFor="log-all">All (Verbose)</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("System Maintenance")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="Advanced User Management" 
        description="Configure user management settings" 
        icon={Users}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Auto Account Creation" 
            description="Automatically create accounts for new students"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Account Deactivation" 
            description="What to do with inactive accounts"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="inactive-nothing" name="inactive" />
                <Label htmlFor="inactive-nothing">Do nothing</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="inactive-notify" name="inactive" defaultChecked />
                <Label htmlFor="inactive-notify">Notify administrators</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="inactive-suspend" name="inactive" />
                <Label htmlFor="inactive-suspend">Suspend after 90 days</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Login Rate Limiting" 
            description="Limit login attempts to prevent brute force attacks"
          >
            <div className="flex items-center gap-3">
              <Input type="number" defaultValue="5" className="w-20" />
              <Label>attempts per minute</Label>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("User Management")} 
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
