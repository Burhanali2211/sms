import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { 
  Settings, 
  Layout, 
  Bell, 
  Shield, 
  Database, 
  Save,
  Upload,
  Download
} from "lucide-react";

import { GeneralSettings } from "./GeneralSettings";
import { AppearanceSettings } from "./AppearanceSettings";
import { NotificationSettings } from "./NotificationSettings";
import { SecuritySettings } from "./SecuritySettings";
import { IntegrationsSettings } from "./IntegrationsSettings";
import { AdvancedSettings } from "./AdvancedSettings";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ConfigurationManager = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (section: string) => {
    setIsLoading(true);
    
    // Simulate saving configuration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Configuration Saved",
        description: `${section} settings have been updated successfully.`,
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Configuration Manager</h1>
            <p className="text-muted-foreground">Manage and configure system-wide settings.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSave("All")}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="default" size="sm" onClick={() => handleSave("All")}>
              <Save className="h-4 w-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <div className="flex overflow-auto pb-2">
            <TabsList className="h-9">
              <TabsTrigger value="general" className="text-xs sm:text-sm px-3">
                <Settings className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="text-xs sm:text-sm px-3">
                <Layout className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs sm:text-sm px-3">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs sm:text-sm px-3">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="integrations" className="text-xs sm:text-sm px-3">
                <Database className="h-4 w-4 mr-2" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="advanced" className="text-xs sm:text-sm px-3">
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="h-[calc(100vh-230px)]">
            <TabsContent value="general">
              <GeneralSettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>

            <TabsContent value="appearance">
              <AppearanceSettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationSettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>

            <TabsContent value="security">
              <SecuritySettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>

            <TabsContent value="integrations">
              <IntegrationsSettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>

            <TabsContent value="advanced">
              <AdvancedSettings isLoading={isLoading} handleSave={handleSave} />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ConfigurationManager;
