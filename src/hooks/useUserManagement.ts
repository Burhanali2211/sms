import { useState, useEffect } from "react";
import { useDatabaseTable } from "@/hooks/database/use-database-table";
import { toast } from "@/hooks/use-toast";
import { UserManagementUser, UserRole } from "@/types/dashboard";

// Mock data for development
const mockUsers: UserManagementUser[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "Active",
    lastLogin: "2023-05-15 14:30:00",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "teacher",
    status: "Active",
    lastLogin: "2023-05-14 09:15:00",
    avatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "student",
    status: "Inactive",
    lastLogin: "2023-05-10 16:45:00",
    avatar: "https://github.com/shadcn.png",
  },
];

export const useUserManagement = () => {
  const { 
    data: dbUsers, 
    isLoading,
    error,
    create: createUser,
    update: updateUser,
    remove: removeUser,
    refresh
  } = useDatabaseTable<UserManagementUser>('users', []);

  const [users, setUsers] = useState<UserManagementUser[]>([]);

  // Sync database users with local state
  useEffect(() => {
    if (dbUsers && dbUsers.length > 0) {
      setUsers(dbUsers);
    } else if (!isLoading && (!dbUsers || dbUsers.length === 0)) {
      // Only use mock data if database is empty and not loading
      setUsers(mockUsers);
    }
  }, [dbUsers, isLoading]);

  const handleAddUser = async (newUserData: Partial<UserManagementUser>) => {
    try {
      const newUser = await createUser({
        ...newUserData,
        status: "Active",
        lastLogin: "Never",
        avatar: "https://github.com/shadcn.png",
      } as Omit<UserManagementUser, 'id'>);
      
      // Update local state with the new user
      setUsers(prev => [...prev, newUser]);
      
      toast({
        title: "User Added",
        description: `${newUser.name} has been added successfully`,
      });

      return newUser;
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add user: " + (error instanceof Error ? error.message : "Unknown error"),
      });
      throw error;
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await removeUser(id);
      
      // Update local state by filtering out the deleted user
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      
      toast({
        title: "User Deleted",
        description: "User has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete user: " + (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const updatedUser = await updateUser(id, { status: newStatus });
      
      // Update local state with the updated user
      setUsers(prevUsers => 
        prevUsers.map(user => user.id === id ? { ...user, ...updatedUser } : user)
      );
      
      toast({
        title: "Status Updated",
        description: `User status changed to ${newStatus}`,
      });
    } catch (error) {
      console.error("Error updating user status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user status: " + (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  };

  return {
    users,
    isLoading,
    error,
    handleAddUser,
    handleDeleteUser,
    handleStatusChange
  };
};