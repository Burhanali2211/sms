import { Bell, LogOut, User, Settings, Search, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ReactNode, useEffect, useState } from "react";
import CommandPalette from "./CommandPalette";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

const BREADCRUMBS: Record<string, string[]> = {
  "/dashboard/school-overview":   ["School", "Overview"],
  "/dashboard/staff":             ["School", "Staff"],
  "/dashboard/classes":           ["Academic", "Classes"],
  "/dashboard/grades":            ["Academic", "Grades"],
  "/dashboard/courses":           ["Academic", "Courses"],
  "/dashboard/attendance":        ["Academic", "Attendance"],
  "/dashboard/finance":           ["Finance"],
  "/dashboard/finance-advanced":  ["Finance", "Advanced"],
  "/dashboard/admissions":        ["Admissions"],
  "/dashboard/users":             ["Admin", "Users"],
  "/dashboard/library":           ["Resources", "Library"],
  "/dashboard/labs":              ["Resources", "Labs"],
  "/dashboard/clubs":             ["Resources", "Clubs"],
  "/dashboard/profile":           ["Account", "Profile"],
  "/dashboard/settings":          ["Account", "Settings"],
  "/dashboard/reports":           ["Reports"],
  "/dashboard/calendar":          ["Calendar"],
  "/dashboard/notifications":     ["Notifications"],
  "/dashboard/system-health":     ["System", "Health"],
  "/dashboard/system-monitoring": ["System", "Monitoring"],
  "/dashboard/system-database":   ["System", "Database"],
  "/dashboard/audit-trail":       ["System", "Audit Trail"],
  "/dashboard/system-logs":       ["System", "Logs"],
  "/dashboard/backup-recovery":   ["System", "Backup"],
  "/dashboard/configuration":     ["System", "Config"],
};

function getGreeting(name: string) {
  const h = new Date().getHours();
  const g = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const first = name?.split(" ")[0] ?? "";
  return `${g}, ${first}`;
}

function getDateLabel() {
  return new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

const DashboardHeader = ({ title, description, actions }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!user) return null;

  const isRoot = location.pathname === "/dashboard";
  const crumbs = BREADCRUMBS[location.pathname] ?? [];
  const getInitials = (name?: string) =>
    name?.split(" ").map(p => p[0]).join("").toUpperCase().substring(0, 2) ?? "U";

  return (
    <>
    <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    <div
      className="sticky top-0 z-10 px-6 pt-5 pb-4"
      style={{
        background: 'linear-gradient(180deg, #f0fdf4 60%, rgba(240,253,244,0))',
      }}
    >
      <div className="flex items-start justify-between gap-4">

        {/* Left — title block */}
        <div className="flex items-start gap-3 min-w-0">
          <SidebarTrigger
            className="mt-0.5 w-8 h-8 rounded-xl hover:bg-emerald-100 transition-colors text-emerald-700/50 shrink-0"
          />
          <div className="min-w-0">
            {isRoot ? (
              <>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  {getGreeting(user.name ?? "")}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{getDateLabel()}</p>
              </>
            ) : (
              <>
                {crumbs.length > 0 && (
                  <div className="flex items-center gap-1 mb-1">
                    <Link to="/dashboard" className="text-[10px] text-emerald-600/60 hover:text-emerald-700 font-medium transition-colors">
                      Home
                    </Link>
                    {crumbs.map((c, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <ChevronRight className="h-2.5 w-2.5 text-emerald-400/40" />
                        <span className={`text-[10px] font-medium ${i === crumbs.length - 1 ? "text-emerald-700" : "text-emerald-600/60"}`}>
                          {c}
                        </span>
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight truncate">{title}</h1>
                {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
              </>
            )}
          </div>
        </div>

        {/* Right — controls */}
        <div className="flex items-center gap-2 shrink-0 pt-0.5">
          {/* Search */}
          <button
            onClick={() => setCmdOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 text-xs transition-colors hover:bg-emerald-100/60"
            style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.1)' }}
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search…</span>
            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-md bg-white/70 text-slate-400 border border-slate-200/60 font-mono">⌘K</span>
          </button>

          {actions}

          <div className="rounded-xl overflow-hidden">
            <ThemeSwitcher />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-emerald-100 transition-colors text-slate-500">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 rounded-2xl p-0 overflow-hidden shadow-xl border-emerald-100/50">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-sm font-semibold">Notifications</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white bg-emerald-500">3 new</span>
                  <Link to="/dashboard/notifications" className="text-[10px] text-emerald-600 hover:text-emerald-700 font-medium">View all</Link>
                </div>
              </div>
              <div className="max-h-72 overflow-auto">
                {[
                  { title: "Fee Payment Received",  msg: "Arjun Kapoor (X-B) paid ₹12,500 term fee.",         time: "12 min ago", dot: '#059669' },
                  { title: "New Admission Request", msg: "Sneha Rajput applied for Class 9.",                  time: "1 hr ago",   dot: '#f59e0b' },
                  { title: "Timetable Updated",     msg: "Semester II timetable published by Vikram Patel.",  time: "3 hrs ago",  dot: '#3b82f6' },
                ].map((n, i) => (
                  <DropdownMenuItem key={i} className="px-4 py-3 cursor-pointer focus:bg-emerald-50/60 rounded-none border-b border-slate-50 dark:border-slate-800/40 last:border-0">
                    <div className="flex gap-3 w-full">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.dot }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{n.msg}</p>
                        <p className="text-[10px] text-muted-foreground/50 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2.5 rounded-xl px-2.5 py-1.5 hover:bg-emerald-100 transition-colors">
                <Avatar className="h-7 w-7 rounded-lg" style={{ boxShadow: '0 0 0 2px #a7f3d0' }}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #34d399, #059669)' }}>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-none">{user.name}</p>
                  <p className="text-[10px] text-slate-400 capitalize mt-0.5">{user.role === "super-admin" ? "Super Admin" : user.role}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52 rounded-2xl overflow-hidden shadow-xl p-1.5 border-emerald-100/50">
              <div className="px-3 py-2.5 mb-1">
                <p className="text-xs font-semibold">{user.name}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="mx-1 mb-1" />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/profile" className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 text-sm">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings" className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 text-sm">
                  <Settings className="h-3.5 w-3.5 text-muted-foreground" />Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="mx-1 my-1" />
              <DropdownMenuItem
                onClick={logout}
                className="flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2 text-sm text-rose-500 focus:text-rose-500 focus:bg-rose-50 dark:focus:bg-rose-950/30"
              >
                <LogOut className="h-3.5 w-3.5" />Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardHeader;
