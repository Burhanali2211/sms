import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Database } from "lucide-react";
import { ConfigurationSection, ConfigSetting } from "./SharedComponents";

interface IntegrationsSettingsProps {
  isLoading: boolean;
  handleSave: (section: string) => void;
}

export const IntegrationsSettings = ({ isLoading, handleSave }: IntegrationsSettingsProps) => {
  return (
    <div className="space-y-4 pr-4">
      <ConfigurationSection 
        title="Third-Party Services" 
        description="Connect with external services and APIs" 
        icon={Database}
      >
        <div className="space-y-4">
          {[
            { name: "Google Workspace", connected: true, icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" },
            { name: "Microsoft 365", connected: false, icon: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
            { name: "Canvas LMS", connected: true, icon: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Canvas.svg" },
            { name: "Zoom", connected: false, icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" }
          ].map((service) => (
            <ConfigSetting 
              key={service.name}
              title={service.name} 
              description={service.connected ? "Connected" : "Not connected"}
            >
              <div className="flex items-center gap-3">
                <Badge variant={service.connected ? "default" : "outline"}>
                  {service.connected ? "Connected" : "Disconnected"}
                </Badge>
                <Button variant="outline" size="sm">
                  {service.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </ConfigSetting>
          ))}
          <Separator />
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2">Add Integration</Button>
            <Button 
              onClick={() => handleSave("Integrations")} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </ConfigurationSection>

      <ConfigurationSection 
        title="API Configuration" 
        description="Manage API keys and access tokens" 
        icon={Database}
      >
        <div className="space-y-4">
          <ConfigSetting 
            title="API Access" 
            description="Enable API access for third-party integrations"
          >
            <Switch defaultChecked />
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="API Key" 
            description="Your unique API key for external services"
          >
            <div className="flex flex-col gap-2">
              <Input 
                defaultValue="sk_live_****_****_****_****_****_****" 
                type="password" 
                className="w-full md:w-[300px]" 
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Show</Button>
                <Button variant="outline" size="sm">Regenerate</Button>
              </div>
            </div>
          </ConfigSetting>
          <Separator />
          <ConfigSetting 
            title="Webhook URL" 
            description="Endpoint for receiving event notifications"
          >
            <Input 
              defaultValue="https://lovableacademy.edu/api/webhook" 
              className="w-full md:w-[300px]" 
            />
          </ConfigSetting>
          <Separator />
          <div className="flex justify-end mt-4">
            <Button 
              onClick={() => handleSave("API Settings")} 
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
