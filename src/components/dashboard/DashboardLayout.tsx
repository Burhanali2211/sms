import { ReactNode, useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardNav from "./DashboardNav";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { logout, user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin mb-4" style={{ color: '#059669' }} />
        <div className="text-xl font-medium text-foreground">Loading dashboard...</div>
        <p className="text-sm text-muted-foreground mt-2">Preparing your workspace</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const initials = user?.name
    ?.split(' ').map(p => p[0]).join('').toUpperCase().substring(0, 2) ?? 'U';

  return (
    <div className="min-h-screen flex w-full bg-[#f0fdf4] dark:bg-background transition-colors duration-300">
      <SidebarProvider>
        {/* ── Sidebar ── */}
        <Sidebar
          className="border-none"
          style={{
            background: 'linear-gradient(180deg, #f0fdf4 0%, #ecfdf5 100%)',
            boxShadow: '4px 0 32px rgba(5,150,105,0.07)',
          }}
        >
          {/* Logo */}
          <SidebarHeader className="px-5 pt-6 pb-4 border-none">
            <div className="flex items-center gap-3 px-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-white font-extrabold text-base shrink-0 select-none"
                style={{
                  background: 'linear-gradient(135deg, #34d399 0%, #059669 100%)',
                  boxShadow: '0 6px 18px rgba(5,150,105,0.35)',
                }}
              >
                E
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-foreground tracking-tight">EIT SMS</p>
                <p className="text-[10px] text-muted-foreground font-medium">School Management</p>
              </div>
            </div>
          </SidebarHeader>

          {/* Nav */}
          <SidebarContent className="px-3 py-1 overflow-y-auto">
            <DashboardNav />
          </SidebarContent>

          {/* Footer */}
          <SidebarFooter className="px-4 pb-5 pt-3 border-none">
            <div
              className="rounded-2xl p-3.5"
              style={{ background: 'rgba(255,255,255,0.65)', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(5,150,105,0.08)' }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}
                >
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{user?.role}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-rose-500 hover:text-rose-600 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-150"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main content ── */}
        <div className={cn("flex-1 flex flex-col min-h-screen overflow-hidden")}>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
