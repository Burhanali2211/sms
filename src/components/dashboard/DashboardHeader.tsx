
import { Bell, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  title: string;
  description?: string; // Added optional description prop
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Get user initials for avatar fallback
  const getInitials = (name: string | undefined) => {
    if (!name) return 'U'; // Return 'U' for undefined/unknown user
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className={cn(
      "border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10",
      "bg-card text-card-foreground shadow-sm transition-colors duration-300"
    )}>
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 hover:bg-accent hover:text-accent-foreground rounded-md p-1" />
        <div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-school-primary to-school-secondary bg-clip-text text-transparent">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-school-primary">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 pt-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Link
                to="/dashboard/notifications"
                className="text-xs text-school-secondary hover:underline"
              >
                View all
              </Link>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[1, 2, 3].map((i) => (
                <DropdownMenuItem key={i} className="p-4 cursor-pointer hover:bg-accent">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium">Notification Title {i}</p>
                      <Badge variant="outline" className="text-xs px-1 py-0">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">This is a notification message.</p>
                    <p className="text-xs text-muted-foreground mt-1">{i} hour{i > 1 ? 's' : ''} ago</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-accent rounded-md px-2 py-1">
              <Avatar className="border-2 border-school-primary/20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-school-primary/10 text-school-primary">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-sm">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role === "super-admin" ? "Super Admin" : user.role}
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center justify-start p-2 md:hidden">
              <div className="ml-2 space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <DropdownMenuSeparator className="md:hidden" />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
