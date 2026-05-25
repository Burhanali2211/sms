import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Lock, Shield } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface SecuritySettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const SecuritySettings = ({ isLoading, handleSave }: SecuritySettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="Authentication" 
        description="Configure user authentication settings" 
        icon={Lock}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Password Policy" 
            description="Minimum requirements for user passwords"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Label>Minimum Length:</Label>
                <Input type="number" defaultValue="8" className="w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="requireUpper" defaultChecked />
                <Label htmlFor="requireUpper">Require uppercase</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="requireNumber" defaultChecked />
                <Label htmlFor="requireNumber">Require numbers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="requireSpecial" defaultChecked />
                <Label htmlFor="requireSpecial">Require special characters</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Two-Factor Authentication" 
            description="Require 2FA for certain user roles"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="2faAdmin" defaultChecked />
                <Label htmlFor="2faAdmin">Administrators</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="2faTeacher" />
                <Label htmlFor="2faTeacher">Teachers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="2faStudent" />
                <Label htmlFor="2faStudent">Students</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Session Timeout" 
            description="Automatically log out inactive users"
          >
            <div className="flex items-center gap-3">
              <Input type="number" defaultValue="30" className="w-20" />
              <Label>minutes</Label>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Authentication Settings")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="Data Protection" 
        description="Configure data security and privacy settings" 
        icon={Shield}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="Data Encryption" 
            description="Enable encryption for sensitive data"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Automated Backups" 
            description="Schedule regular system backups"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Switch defaultChecked />
                <span>Daily at 2:00 AM</span>
              </div>
              <Button variant="outline" size="sm" className="self-start">
                Change Schedule
              </Button>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Data Retention" 
            description="How long to keep historical data"
          >
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input type="radio" id="retention-1y" name="retention" />
                <Label htmlFor="retention-1y">1 Year</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="retention-3y" name="retention" defaultChecked />
                <Label htmlFor="retention-3y">3 Years</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="retention-5y" name="retention" />
                <Label htmlFor="retention-5y">5 Years</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" id="retention-forever" name="retention" />
                <Label htmlFor="retention-forever">Indefinitely</Label>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Data Protection")} 
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
