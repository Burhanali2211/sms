
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RoleBasedContent from "@/components/dashboard/RoleBasedContent";
import QuickActions from "@/components/dashboard/QuickActions";
import FunctionalNotifications from "@/components/dashboard/FunctionalNotifications";
import FunctionalCalendarWidget from "@/components/dashboard/FunctionalCalendarWidget";
import DataAnalyticsWidget from "@/components/dashboard/DataAnalyticsWidget";
import SuperAdminDashboard from "@/pages/dashboard/admin/SuperAdminDashboard";
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import PrincipalDashboard from "@/pages/dashboard/admin/PrincipalDashboard";
import { useDashboardData } from "@/hooks/use-dashboard-data";
import LoadingSpinner from "@/components/ui/loading-spinner";
import ErrorBoundary from "@/components/ui/error-boundary";
import { UserRole } from "@/types/dashboard";

const Dashboard = () => {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { stats, notifications, events, isLoading: dashboardLoading, error } = useDashboardData();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <DashboardHeader title="Dashboard" />

        <main className="flex-1 overflow-auto dashboard-content p-6 space-y-6" style={{ background: '#f0fdf4' }}>
          {user.role === 'super-admin' ? (
            <SuperAdminDashboard />
          ) : user.role === 'admin' ? (
            <AdminDashboard />
          ) : user.role === 'principal' ? (
            <PrincipalDashboard />
          ) : (
            <>
              <DashboardStats stats={stats} isStatsLoading={dashboardLoading} />
              <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                <QuickActions />
                <FunctionalNotifications />
                <FunctionalCalendarWidget />
              </div>
              <div className="grid gap-6 grid-cols-1">
                <DataAnalyticsWidget />
              </div>
              <RoleBasedContent role={user.role as UserRole} />
            </>
          )}
        </main>
      </DashboardLayout>
    </ErrorBoundary>
  );
};

export default Dashboard;
