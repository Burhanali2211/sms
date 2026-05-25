import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient } from "@/utils/api/client";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export const useProfile = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "", 
    address: user?.address || "",
    department: "Mathematics",
    position: user?.role === "super-admin" ? "Super Admin" : (user?.role || ""),
    joinDate: user?.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "",
    lastLogin: user?.last_login ? format(new Date(user.last_login), 'MMM d, yyyy h:mm a') : "",
    avatar: user?.avatar || ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: "", 
        address: user.address || "",
        department: "Mathematics",
        position: user.role === "super-admin" ? "Super Admin" : (user.role || ""),
        joinDate: user.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "",
        lastLogin: user.last_login ? format(new Date(user.last_login), 'MMM d, yyyy h:mm a') : "",
        avatar: user.avatar || ""
      });
      setAvatarPreview(user.avatar || null);
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({
          ...prev,
          avatar: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const isDemoToken = () => {
      const token = localStorage.getItem('authToken');
      return !token || token.startsWith('demo-token-');
    };

    if (isDemoToken()) {
      if (setUser) {
        setUser({ ...user, name: formData.name, phone: formData.phone, address: formData.address, avatar: formData.avatar });
      }
      setIsEditing(false);
      toast({ title: "Profile Updated", description: "Your profile information has been updated successfully." });
      return;
    }

    try {
      const response = await apiClient.updateUser(user.id, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar_url: formData.avatar
      });

      if (response.error) {
        toast({ title: "Update Failed", description: response.error, variant: "destructive" });
        return;
      }

      if (response.data && setUser) {
        setUser({ ...user, name: formData.name, phone: formData.phone, address: formData.address, avatar: formData.avatar });
      }

      setIsEditing(false);
      toast({ title: "Profile Updated", description: "Your profile information has been updated successfully." });
    } catch {
      toast({ title: "Update Failed", description: "An error occurred while updating your profile.", variant: "destructive" });
    }
  };

  const accountAge = user?.created_at 
    ? Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0;

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
    user,
    formData,
    isEditing,
    setIsEditing,
    avatarPreview,
    handleChange,
    handleAvatarChange,
    handleSave,
    accountAge,
    handleChangePhotoClick,
    fileInputRef
  };
};
