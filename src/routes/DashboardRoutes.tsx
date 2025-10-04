import { Route } from "react-router-dom";
import ProtectedRoute from "@/components/dashboard/ProtectedRoute";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/dashboard/Profile";
import Notifications from "@/pages/dashboard/Notifications";
import Calendar from "@/pages/dashboard/Calendar";
import Settings from "@/pages/dashboard/Settings";
import Unauthorized from "@/pages/dashboard/Unauthorized";
import SchoolOverview from "@/pages/dashboard/SchoolOverview";
import Staff from "@/pages/dashboard/Staff";
import Courses from "@/pages/dashboard/student/Courses";
import Attendance from "@/pages/dashboard/student/Attendance";
import AttendanceStudent from "@/pages/dashboard/student/Attendance";
import FinanceDashboard from "@/pages/dashboard/Finance";
import FinanceAdvanced from "@/pages/dashboard/finance/Finance";

// Import Admin routes
import UserManagement from "@/pages/dashboard/admin/UserManagement";
import LabResources from "@/pages/dashboard/admin/LabResources";
import Library from "@/pages/dashboard/admin/Library";
import SystemHealth from "@/pages/dashboard/admin/SystemHealth";
import SystemDatabase from "@/pages/dashboard/admin/SystemDatabase";
import AuditTrail from "@/pages/dashboard/admin/AuditTrail";
import SystemLogs from "@/pages/dashboard/admin/SystemLogs";
import BackupRecovery from "@/pages/dashboard/admin/BackupRecovery";
import SystemMonitoring from "@/pages/dashboard/admin/SystemMonitoring";
import ConfigurationManager from "@/pages/dashboard/admin/ConfigurationManager";
import ClubActivities from "@/pages/dashboard/admin/ClubActivities";
import Admissions from "@/pages/dashboard/admin/Admissions";

// Import Teacher routes
import Classes from "@/pages/dashboard/teacher/Classes";
import Grades from "@/pages/dashboard/teacher/Grades";

// Import Reports route
import Reports from "@/pages/dashboard/Reports";

const DashboardRoutes = () => {
  return (
    <>
      {/* Common dashboard routes accessible to ALL authenticated users */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/calendar" element={
        <ProtectedRoute>
          <Calendar />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/settings" element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/unauthorized" element={
        <ProtectedRoute>
          <Unauthorized />
        </ProtectedRoute>
      } />
      
      {/* School Overview page for principal and super admin */}
      <Route path="/dashboard/school-overview" element={
        <ProtectedRoute allowedRoles={['principal', 'super-admin']}>
          <SchoolOverview />
        </ProtectedRoute>
      } />
      
      {/* Staff management for principal, school-admin and super-admin */}
      <Route path="/dashboard/staff" element={
        <ProtectedRoute allowedRoles={['principal', 'school-admin', 'super-admin']}>
          <Staff />
        </ProtectedRoute>
      } />
      
      {/* Academic routes */}
      <Route path="/dashboard/courses" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'principal']}>
          <Courses />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/attendance" element={
        <ProtectedRoute allowedRoles={['student', 'teacher', 'principal']}>
          <Attendance />
        </ProtectedRoute>
      } />
      
      {/* Admin routes */}
      <Route path="/dashboard/users" element={
        <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/labs" element={
        <ProtectedRoute allowedRoles={['labs', 'principal', 'super-admin']}>
          <LabResources />
        </ProtectedRoute>
      } />
      
      {/* Library route */}
      <Route path="/dashboard/library" element={
        <ProtectedRoute allowedRoles={['library', 'principal', 'super-admin']}>
          <Library />
        </ProtectedRoute>
      } />
      
      {/* Club Activities route */}
      <Route path="/dashboard/clubs" element={
        <ProtectedRoute allowedRoles={['club', 'principal', 'super-admin']}>
          <ClubActivities />
        </ProtectedRoute>
      } />
      
      {/* Teacher routes */}
      <Route path="/dashboard/classes" element={
        <ProtectedRoute allowedRoles={['teacher', 'principal', 'school-admin']}>
          <Classes />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/grades" element={
        <ProtectedRoute allowedRoles={['teacher', 'principal', 'super-admin']}>
          <Grades />
        </ProtectedRoute>
      } />
      
      {/* Administrative routes */}
      <Route path="/dashboard/finance" element={
        <ProtectedRoute allowedRoles={['financial', 'principal', 'super-admin']}>
          <FinanceDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/finance-advanced" element={
        <ProtectedRoute allowedRoles={['financial', 'principal', 'super-admin']}>
          <FinanceAdvanced />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/admissions" element={
        <ProtectedRoute allowedRoles={['admission', 'principal', 'super-admin']}>
          <Admissions />
        </ProtectedRoute>
      } />
      
      {/* Super Admin specific routes */}
      <Route path="/dashboard/system-health" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SystemHealth />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/system-database" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SystemDatabase />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/audit-trail" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <AuditTrail />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/system-logs" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SystemLogs />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/backup-recovery" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <BackupRecovery />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/system-monitoring" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <SystemMonitoring />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/configuration" element={
        <ProtectedRoute allowedRoles={['super-admin']}>
          <ConfigurationManager />
        </ProtectedRoute>
      } />
      
      {/* Routes for users with no specific role (fallback routes) */}
      <Route path="/dashboard/home" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/reports" element={
        <ProtectedRoute>
          <Reports />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/welcome" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </>
  );
};

export default DashboardRoutes;