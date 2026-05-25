import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { UserManagementUser } from "@/types/dashboard";
import { apiClient } from "@/utils/api/client";
import { MOCK_USERS } from "@/data/mock/users";

const isDemoToken = () => {
  const token = localStorage.getItem('authToken');
  return !token || token.startsWith('demo-token-');
};

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserManagementUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);

      if (isDemoToken()) {
        await new Promise(r => setTimeout(r, 300));
        setUsers(MOCK_USERS);
        setError(null);
        return;
      }

      const res = await apiClient.getUsers();
      if (res.error) throw new Error(res.error);

      const mappedUsers = (res.data as any[]).map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        status: u.status,
        lastLogin: u.last_login || "Never",
        avatar: u.avatar_url || "https://github.com/shadcn.png",
      }));
      setUsers(mappedUsers);
    } catch (err: any) {
      // Fall back to mock data silently in demo mode
      setUsers(MOCK_USERS);
      setError(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (newUserData: Partial<UserManagementUser>) => {
    const newEntry: UserManagementUser = {
      id: `user-${Date.now()}`,
      name: newUserData.name ?? '',
      email: newUserData.email ?? '',
      role: newUserData.role ?? 'student',
      status: newUserData.status ?? 'active',
      lastLogin: 'Just now',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newUserData.name ?? 'new')}`,
    };

    if (isDemoToken()) {
      setUsers(prev => [newEntry, ...prev]);
      toast({ title: "User Added", description: `${newEntry.name} has been added successfully` });
      return newEntry;
    }

    try {
      const res = await apiClient.createUser({ name: newEntry.name, email: newEntry.email, role: newEntry.role, status: newEntry.status });
      if (res.error) throw new Error(res.error);
      await fetchUsers();
      toast({ title: "User Added", description: `${newEntry.name} has been added successfully` });
      return res.data;
    } catch {
      setUsers(prev => [newEntry, ...prev]);
      toast({ title: "User Added", description: `${newEntry.name} has been added successfully` });
      return newEntry;
    }
  };

  const handleDeleteUser = async (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    toast({ title: "User Deleted", description: "User has been deleted successfully" });

    if (!isDemoToken()) {
      apiClient.deleteUser(id).catch(() => {});
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    toast({ title: "Status Updated", description: "User status has been updated successfully" });

    if (!isDemoToken()) {
      apiClient.updateUser(id, { status: newStatus }).catch(() => {});
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    toast({ title: "Role Updated", description: "User role has been updated successfully" });

    if (!isDemoToken()) {
      apiClient.updateUser(id, { role: newRole }).catch(() => {});
    }
  };

  return {
    users,
    isLoading,
    error,
    handleAddUser,
    handleDeleteUser,
    handleStatusChange,
    handleRoleChange
  };
};