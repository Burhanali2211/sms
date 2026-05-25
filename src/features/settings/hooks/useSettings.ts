import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "@/components/ui/use-toast";

export const useSettings = () => {
  const { theme, setTheme } = useTheme();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    smsNotifications: false,
    dailySummary: true,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showActivity: true,
    allowMessages: true,
    publicCalendar: false,
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largerText: false,
    reducedMotion: false,
    screenReader: false,
  });

  const [displaySettings, setDisplaySettings] = useState({
    contentDensity: "normal",
    fontFamily: "system",
    animationsEnabled: true,
    fontSize: 16,
  });
  
  const [language, setLanguage] = useState("english");

  const [exportData, setExportData] = useState({
    includeProfile: true,
    includeActivities: true,
    includeGrades: true,
    format: "pdf",
  });
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
      duration: 3000,
    });
  };

  return {
    state: {
      theme, setTheme,
      notificationSettings, setNotificationSettings,
      privacySettings, setPrivacySettings,
      accessibilitySettings, setAccessibilitySettings,
      displaySettings, setDisplaySettings,
      language, setLanguage,
      exportData, setExportData
    },
    actions: {
      handleSaveSettings
    }
  };
};
