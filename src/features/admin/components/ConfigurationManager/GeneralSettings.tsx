import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Info, Clock, Settings } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface GeneralSettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const GeneralSettings = ({ isLoading, handleSave }: GeneralSettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="System Information" 
        description="Basic system configuration settings" 
        icon={Info}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="School Name" 
            description="The name of your educational institution"
          >
            <Input defaultValue="Lovable Academy" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Academic Year" 
            description="Current academic year setting"
          >
            <Input defaultValue="2023-2024" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="System Email" 
            description="Email used for system notifications"
          >
            <Input defaultValue="admin@lovableacademy.edu" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("System Information")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="Regional Settings" 
        description="Configure timezone, date format, and language" 
        icon={Clock}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Timezone" 
            description="System default timezone"
          >
            <Input defaultValue="UTC-5 (Eastern Time)" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Date Format" 
            description="Default date display format"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="mm-dd-yyyy" name="dateFormat" defaultChecked />
                <Label htmlFor="mm-dd-yyyy">MM/DD/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="dd-mm-yyyy" name="dateFormat" />
                <Label htmlFor="dd-mm-yyyy">DD/MM/YYYY</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="yyyy-mm-dd" name="dateFormat" />
                <Label htmlFor="yyyy-mm-dd">YYYY-MM-DD</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Language" 
            description="System default language"
          >
            <Input defaultValue="English (US)" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Regional Settings")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="Feature Toggles" 
        description="Enable or disable system features" 
        icon={Settings}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Student Portal" 
            description="Enable student access to the online portal"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Parent Portal" 
            description="Enable parent access to monitor student progress"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Online Assignments" 
            description="Allow teachers to create and grade online assignments"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Attendance Tracking" 
            description="Enable automated attendance tracking system"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Feature Toggles")} 
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
