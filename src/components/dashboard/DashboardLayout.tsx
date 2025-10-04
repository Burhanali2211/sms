import { ReactNode, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardNav from "./DashboardNav";
import { useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, user, isAuthenticated, isLoading } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Ensure user is authenticated, otherwise redirect to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-10 w-10 text-school-primary animate-spin mb-4" />
        <div className="text-xl font-medium text-gray-700 dark:text-gray-300">Loading dashboard...</div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">Please wait while we prepare your personalized workspace</p>
      </div>
    );
  }
  
  // If not authenticated, don't render anything (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={cn(
      "min-h-screen flex w-full transition-colors duration-300",
      "bg-background dark:bg-background"
    )}>
      <SidebarProvider>
        <Sidebar className="bg-card dark:bg-card border-r shadow-sm">
          <SidebarHeader className="px-6 py-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                <span className="text-school-primary">Edu</span>
                <span className="text-school-secondary">Sync</span>
              </h2>
              <ThemeSwitcher />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="py-2">
            <DashboardNav />
          </SidebarContent>
          
          <SidebarFooter className="px-6 py-4 border-t mt-auto">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors dark:hover:bg-red-950 dark:hover:text-red-400"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className={cn(
          "flex-1 flex flex-col min-h-screen overflow-hidden",
          "dashboard-content"
        )}>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;