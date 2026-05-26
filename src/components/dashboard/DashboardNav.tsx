import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarGroup, SidebarGroupLabel, SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Home, Users, BookOpen, Calendar, Settings, Bell, User,
  GraduationCap, Building, DollarSign, UserCheck,
  Beaker, Book, Activity, Database, Shield, Cpu,
  FileText, BarChart3, ClipboardList, CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "student" | "teacher" | "principal" | "admin" | "financial" | "admission" | "school-admin" | "labs" | "club" | "library" | "super-admin";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: Role[];
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const ALL_ROLES: Role[] = ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"];

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: Home, roles: ALL_ROLES },
    ],
  },
  {
    label: "School",
    items: [
      { title: "School Overview", href: "/dashboard/school-overview", icon: Building, roles: ["principal", "admin", "super-admin"] },
      { title: "Staff Management", href: "/dashboard/staff", icon: Users, roles: ["principal", "admin", "school-admin", "super-admin"] },
    ],
  },
  {
    label: "Academic",
    items: [
      { title: "Classes", href: "/dashboard/classes", icon: BookOpen, roles: ["teacher", "principal", "school-admin", "admin"] },
      { title: "Grades", href: "/dashboard/grades", icon: GraduationCap, roles: ["teacher", "principal", "super-admin"] },
      { title: "Courses", href: "/dashboard/courses", icon: Book, roles: ["student", "teacher", "principal"] },
      { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck, roles: ["student", "teacher", "principal", "admin"] },
    ],
  },
  {
    label: "Finance & Admin",
    items: [
      { title: "Finance", href: "/dashboard/finance", icon: DollarSign, roles: ["financial", "principal", "admin", "super-admin"] },
      { title: "Finance Advanced", href: "/dashboard/finance-advanced", icon: CreditCard, roles: ["financial", "principal", "super-admin"] },
      { title: "Admissions", href: "/dashboard/admissions", icon: ClipboardList, roles: ["admission", "principal", "admin", "super-admin"] },
      { title: "User Management", href: "/dashboard/users", icon: Users, roles: ["admin", "super-admin"] },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Library", href: "/dashboard/library", icon: Book, roles: ["library", "student", "teacher", "principal", "super-admin"] },
      { title: "Lab Resources", href: "/dashboard/labs", icon: Beaker, roles: ["labs", "principal", "super-admin"] },
      { title: "Club Activities", href: "/dashboard/clubs", icon: Activity, roles: ["club", "principal", "super-admin"] },
    ],
  },
  {
    label: "System",
    items: [
      { title: "System Health", href: "/dashboard/system-health", icon: Cpu, roles: ["super-admin"] },
      { title: "System Monitoring", href: "/dashboard/system-monitoring", icon: BarChart3, roles: ["super-admin"] },
      { title: "System Database", href: "/dashboard/system-database", icon: Database, roles: ["super-admin"] },
      { title: "Audit Trail", href: "/dashboard/audit-trail", icon: Shield, roles: ["super-admin"] },
      { title: "System Logs", href: "/dashboard/system-logs", icon: FileText, roles: ["super-admin"] },
      { title: "Backup & Recovery", href: "/dashboard/backup-recovery", icon: Database, roles: ["super-admin"] },
      { title: "Configuration", href: "/dashboard/configuration", icon: Settings, roles: ["super-admin"] },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Calendar", href: "/dashboard/calendar", icon: Calendar, roles: ALL_ROLES },
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell, roles: ALL_ROLES },
      { title: "Reports", href: "/dashboard/reports", icon: FileText, roles: ALL_ROLES },
      { title: "Profile", href: "/dashboard/profile", icon: User, roles: ALL_ROLES },
      { title: "Settings", href: "/dashboard/settings", icon: Settings, roles: ALL_ROLES },
    ],
  },
];

const DashboardNav = () => {
  const { user } = useAuth();
  const role = user?.role as Role | undefined;

  return (
    <div className="space-y-1">
      {navGroups.map((group) => {
        const visibleItems = group.items.filter(item => role && item.roles.includes(role));
        if (visibleItems.length === 0) return null;

        return (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.href}
                          end={item.href === "/dashboard"}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              "hover:bg-accent hover:text-accent-foreground",
                              isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-muted-foreground"
                            )
                          }
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.title}
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </div>
  );
};

export default DashboardNav;
