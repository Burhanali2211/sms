import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  SidebarMenu, SidebarMenuItem,
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
      { title: "School Overview",  href: "/dashboard/school-overview", icon: Building,      roles: ["principal", "admin", "super-admin"] },
      { title: "Staff Management", href: "/dashboard/staff",           icon: Users,          roles: ["principal", "admin", "school-admin", "super-admin"] },
    ],
  },
  {
    label: "Academic",
    items: [
      { title: "Classes",    href: "/dashboard/classes",    icon: BookOpen,      roles: ["teacher", "principal", "school-admin", "admin"] },
      { title: "Grades",     href: "/dashboard/grades",     icon: GraduationCap, roles: ["teacher", "principal", "super-admin"] },
      { title: "Courses",    href: "/dashboard/courses",    icon: Book,          roles: ["student", "teacher", "principal"] },
      { title: "Attendance", href: "/dashboard/attendance", icon: UserCheck,     roles: ["student", "teacher", "principal", "admin"] },
    ],
  },
  {
    label: "Finance & Admin",
    items: [
      { title: "Finance",          href: "/dashboard/finance",          icon: DollarSign,   roles: ["financial", "principal", "admin", "super-admin"] },
      { title: "Finance Advanced", href: "/dashboard/finance-advanced", icon: CreditCard,   roles: ["financial", "principal", "super-admin"] },
      { title: "Admissions",       href: "/dashboard/admissions",       icon: ClipboardList, roles: ["admission", "principal", "admin", "super-admin"] },
      { title: "User Management",  href: "/dashboard/users",            icon: Users,         roles: ["admin", "super-admin"] },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Library",        href: "/dashboard/library", icon: Book,     roles: ["library", "student", "teacher", "principal", "super-admin"] },
      { title: "Lab Resources",  href: "/dashboard/labs",    icon: Beaker,   roles: ["labs", "principal", "super-admin"] },
      { title: "Club Activities",href: "/dashboard/clubs",   icon: Activity, roles: ["club", "principal", "super-admin"] },
    ],
  },
  {
    label: "System",
    items: [
      { title: "System Health",     href: "/dashboard/system-health",      icon: Cpu,      roles: ["super-admin"] },
      { title: "Monitoring",        href: "/dashboard/system-monitoring",  icon: BarChart3, roles: ["super-admin"] },
      { title: "Database",          href: "/dashboard/system-database",    icon: Database, roles: ["super-admin"] },
      { title: "Audit Trail",       href: "/dashboard/audit-trail",        icon: Shield,   roles: ["super-admin"] },
      { title: "System Logs",       href: "/dashboard/system-logs",        icon: FileText, roles: ["super-admin"] },
      { title: "Backup & Recovery", href: "/dashboard/backup-recovery",    icon: Database, roles: ["super-admin"] },
      { title: "Configuration",     href: "/dashboard/configuration",      icon: Settings, roles: ["super-admin"] },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Calendar",      href: "/dashboard/calendar",      icon: Calendar, roles: ALL_ROLES },
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell,     roles: ALL_ROLES },
      { title: "Reports",       href: "/dashboard/reports",       icon: FileText, roles: ALL_ROLES },
      { title: "Profile",       href: "/dashboard/profile",       icon: User,     roles: ALL_ROLES },
      { title: "Settings",      href: "/dashboard/settings",      icon: Settings, roles: ALL_ROLES },
    ],
  },
];

const DashboardNav = () => {
  const { user } = useAuth();
  const role = user?.role as Role | undefined;

  return (
    <div className="space-y-0.5">
      {navGroups.map((group) => {
        const visibleItems = group.items.filter(item => role && item.roles.includes(role));
        if (visibleItems.length === 0) return null;

        return (
          <SidebarGroup key={group.label} className="py-1">
            <SidebarGroupLabel className="px-3.5 mb-1 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-700/40 dark:text-emerald-400/40">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <NavLink
                        to={item.href}
                        end={item.href === "/dashboard"}
                        className="block w-full"
                      >
                        {({ isActive }: { isActive: boolean }) => (
                          <div
                            className={cn(
                              "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer",
                              isActive
                                ? "text-emerald-800 dark:text-emerald-300"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50"
                            )}
                            style={isActive ? {
                              background: 'rgba(255,255,255,0.88)',
                              boxShadow: '0 2px 10px rgba(5,150,105,0.13), 0 1px 0 rgba(255,255,255,0.9) inset',
                            } : undefined}
                          >
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150"
                              style={isActive ? {
                                background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                                boxShadow: '0 2px 6px rgba(5,150,105,0.22)',
                              } : undefined}
                            >
                              <Icon
                                className="h-3.5 w-3.5"
                                style={{ color: isActive ? '#059669' : 'currentColor' }}
                              />
                            </div>
                            <span className="truncate flex-1">{item.title}</span>
                            {isActive && (
                              <div
                                className="w-1.5 h-1.5 rounded-full shrink-0"
                                style={{ background: '#059669' }}
                              />
                            )}
                          </div>
                        )}
                      </NavLink>
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
