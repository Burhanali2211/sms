import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Mail, Bell } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface NotificationSettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const NotificationSettings = ({ isLoading, handleSave }: NotificationSettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="Email Notifications" 
        description="Configure system email notification settings" 
        icon={Mail}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="SMTP Server" 
            description="Email server settings for sending notifications"
          >
            <Input defaultValue="smtp.example.com" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="SMTP Port" 
            description="Port number for the SMTP server"
          >
            <Input defaultValue="587" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Enable TLS" 
            description="Use Transport Layer Security for email"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("Email Settings")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="System Alerts" 
        description="Configure who receives important system notifications" 
        icon={Bell}
      >
        <div className="space-y-4">
          {["System Errors", "Security Alerts", "Performance Warnings", "Database Issues"].map((item) => (
            <React.Fragment key={item}>
              <ConfigSetting 
                title={item} 
                description={`Send ${item.toLowerCase()} to administrators`}
              >
                <Switch defaultChecked />
              </ConfigSetting>
              <Separator />
            </React.Fragment>
          ))}
          <ConfigSetting 
            title="Additional Recipients" 
            description="Email addresses that will receive system alerts"
          >
            <Input defaultValue="tech@lovableacademy.edu" className="w-[250px]" />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("System Alerts")} 
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
