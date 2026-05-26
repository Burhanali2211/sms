import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  CommandDialog, CommandInput, CommandList, CommandEmpty,
  CommandGroup, CommandItem, CommandSeparator,
} from "@/components/ui/command";
import {
  Home, Users, BookOpen, Calendar, Settings, Bell, User,
  GraduationCap, Building, DollarSign, UserCheck,
  Beaker, Book, Activity, Database, Shield, Cpu,
  FileText, BarChart3, ClipboardList, CreditCard, LogOut,
} from "lucide-react";

type Role = "student" | "teacher" | "principal" | "admin" | "financial" | "admission" | "school-admin" | "labs" | "club" | "library" | "super-admin";

const ALL_ROLES: Role[] = ["student", "teacher", "admin", "principal", "financial", "admission", "school-admin", "labs", "club", "library", "super-admin"];

const NAV_ITEMS = [
  { title: "Dashboard",        href: "/dashboard",                   icon: Home,          group: "Overview",       roles: ALL_ROLES },
  { title: "School Overview",  href: "/dashboard/school-overview",   icon: Building,      group: "School",         roles: ["principal", "admin", "super-admin"] },
  { title: "Staff Management", href: "/dashboard/staff",             icon: Users,         group: "School",         roles: ["principal", "admin", "school-admin", "super-admin"] },
  { title: "Classes",          href: "/dashboard/classes",           icon: BookOpen,      group: "Academic",       roles: ["teacher", "principal", "school-admin", "admin"] },
  { title: "Grades",           href: "/dashboard/grades",            icon: GraduationCap, group: "Academic",       roles: ["teacher", "principal", "super-admin"] },
  { title: "Courses",          href: "/dashboard/courses",           icon: Book,          group: "Academic",       roles: ["student", "teacher", "principal"] },
  { title: "Attendance",       href: "/dashboard/attendance",        icon: UserCheck,     group: "Academic",       roles: ["student", "teacher", "principal", "admin"] },
  { title: "Finance",          href: "/dashboard/finance",           icon: DollarSign,    group: "Finance",        roles: ["financial", "principal", "admin", "super-admin"] },
  { title: "Finance Advanced", href: "/dashboard/finance-advanced",  icon: CreditCard,    group: "Finance",        roles: ["financial", "principal", "super-admin"] },
  { title: "Admissions",       href: "/dashboard/admissions",        icon: ClipboardList, group: "Admin",          roles: ["admission", "principal", "admin", "super-admin"] },
  { title: "User Management",  href: "/dashboard/users",             icon: Users,         group: "Admin",          roles: ["admin", "super-admin"] },
  { title: "Library",          href: "/dashboard/library",           icon: Book,          group: "Resources",      roles: ["library", "student", "teacher", "principal", "super-admin"] },
  { title: "Lab Resources",    href: "/dashboard/labs",              icon: Beaker,        group: "Resources",      roles: ["labs", "principal", "super-admin"] },
  { title: "Club Activities",  href: "/dashboard/clubs",             icon: Activity,      group: "Resources",      roles: ["club", "principal", "super-admin"] },
  { title: "Calendar",         href: "/dashboard/calendar",          icon: Calendar,      group: "Account",        roles: ALL_ROLES },
  { title: "Notifications",    href: "/dashboard/notifications",     icon: Bell,          group: "Account",        roles: ALL_ROLES },
  { title: "Reports",          href: "/dashboard/reports",           icon: FileText,      group: "Account",        roles: ALL_ROLES },
  { title: "Profile",          href: "/dashboard/profile",           icon: User,          group: "Account",        roles: ALL_ROLES },
  { title: "Settings",         href: "/dashboard/settings",          icon: Settings,      group: "Account",        roles: ALL_ROLES },
  { title: "System Health",    href: "/dashboard/system-health",     icon: Cpu,           group: "System",         roles: ["super-admin"] },
  { title: "Monitoring",       href: "/dashboard/system-monitoring", icon: BarChart3,     group: "System",         roles: ["super-admin"] },
  { title: "Database",         href: "/dashboard/system-database",   icon: Database,      group: "System",         roles: ["super-admin"] },
  { title: "Audit Trail",      href: "/dashboard/audit-trail",       icon: Shield,        group: "System",         roles: ["super-admin"] },
  { title: "System Logs",      href: "/dashboard/system-logs",       icon: FileText,      group: "System",         roles: ["super-admin"] },
  { title: "Backup & Recovery",href: "/dashboard/backup-recovery",   icon: Database,      group: "System",         roles: ["super-admin"] },
  { title: "Configuration",    href: "/dashboard/configuration",     icon: Settings,      group: "System",         roles: ["super-admin"] },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role as Role | undefined;

  const visible = NAV_ITEMS.filter(item => role && item.roles.includes(role));
  const groups = [...new Set(visible.map(i => i.group))];

  function go(href: string) {
    navigate(href);
    onClose();
  }

  return (
    <CommandDialog open={open} onOpenChange={v => !v && onClose()}>
      <CommandInput placeholder="Search pages, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {groups.map(group => (
          <CommandGroup key={group} heading={group}>
            {visible.filter(i => i.group === group).map(item => {
              const Icon = item.icon;
              return (
                <CommandItem
                  key={item.href}
                  value={item.title}
                  onSelect={() => go(item.href)}
                  className="gap-2.5 cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  {item.title}
                </CommandItem>
              );
            })}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem value="sign out logout" onSelect={() => { logout(); onClose(); }} className="gap-2.5 cursor-pointer text-rose-500 data-[selected=true]:text-rose-500">
            <LogOut className="h-4 w-4 shrink-0" />
            Sign out
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
