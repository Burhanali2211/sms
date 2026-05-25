import { Palette, Bell, Lock, Eye, MonitorSmartphone, Zap } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettings } from "@/features/settings/hooks/useSettings";
import { AppearanceSettings } from "@/features/settings/components/AppearanceSettings";
import { NotificationSettings } from "@/features/settings/components/NotificationSettings";
import { PrivacySettings } from "@/features/settings/components/PrivacySettings";
import { AccountSettings } from "@/features/settings/components/AccountSettings";
import { AccessibilitySettings } from "@/features/settings/components/AccessibilitySettings";
import { AdvancedSettings } from "@/features/settings/components/AdvancedSettings";

const Settings = () => {
  const { state, actions } = useSettings();
  const {
    theme, setTheme,
    notificationSettings, setNotificationSettings,
    privacySettings, setPrivacySettings,
    accessibilitySettings, setAccessibilitySettings,
    displaySettings, setDisplaySettings,
    language, setLanguage,
    exportData, setExportData
  } = state;
  const { handleSaveSettings } = actions;

  return (
    <DashboardLayout>
      <DashboardHeader title="Settings" />
      
      <main className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="appearance" className="w-full">
            <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-8">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center gap-2">
                <MonitorSmartphone className="h-4 w-4" />
                <span className="hidden sm:inline">Accessibility</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Advanced</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <AppearanceSettings 
                theme={theme}
                setTheme={setTheme}
                displaySettings={displaySettings}
                setDisplaySettings={setDisplaySettings}
                language={language}
                setLanguage={setLanguage}
                handleSaveSettings={handleSaveSettings}
              />
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <NotificationSettings 
                notificationSettings={notificationSettings}
                setNotificationSettings={setNotificationSettings}
                handleSaveSettings={handleSaveSettings}
              />
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <PrivacySettings 
                privacySettings={privacySettings}
                setPrivacySettings={setPrivacySettings}
                handleSaveSettings={handleSaveSettings}
              />
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <AccountSettings 
                handleSaveSettings={handleSaveSettings}
              />
            </TabsContent>

            <TabsContent value="accessibility" className="space-y-6">
              <AccessibilitySettings 
                accessibilitySettings={accessibilitySettings}
                setAccessibilitySettings={setAccessibilitySettings}
                handleSaveSettings={handleSaveSettings}
              />
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <AdvancedSettings 
                exportData={exportData}
                setExportData={setExportData}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Settings;
