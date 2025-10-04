import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, Phone, MapPin, User, GraduationCap, Clock, Award, Upload } from "lucide-react";
import { format } from "date-fns";
import { apiClient } from "@/utils/api/client";

const Profile = () => {
  const { user, setUser } = useAuth(); // Now we can use setUser
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: "", // We'll store this locally for now
    address: user?.address || "",
    department: "Mathematics",
    position: user?.role === "super-admin" ? "Super Admin" : (user?.role || ""),
    joinDate: user?.created_at ? new Date(user.created_at).toISOString().split('T')[0] : "",
    lastLogin: user?.last_login ? format(new Date(user.last_login), 'MMM d, yyyy h:mm a') : "",
    avatar: user?.avatar || ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: "", // We'll store this locally for now
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

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a preview
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

    try {
      // Update user data in the database
      const response = await apiClient.updateUser(user.id, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar_url: formData.avatar // Include avatar URL in the update
      });

      if (response.error) {
        toast({
          title: "Update Failed",
          description: response.error,
          variant: "destructive"
        });
        return;
      }

      // Update the user in context
      if (response.data && setUser) {
        setUser({
          ...user,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          avatar: formData.avatar
        });
      }

      // Show success message
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully."
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile.",
        variant: "destructive"
      });
    }
  };

  // Calculate account age
  const accountAge = user?.created_at 
    ? Math.floor((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))
    : 0;

  // Handle click on change photo button
  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <DashboardLayout>
      <DashboardHeader title="Profile" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header Card */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">My Profile</CardTitle>
                  <CardDescription>Manage your personal information and account details</CardDescription>
                </div>
                <Button 
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Information Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Avatar and Basic Info Section */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarPreview || user?.avatar || "https://github.com/shadcn.png"} alt={user?.name} />
                        <AvatarFallback className="text-lg">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}</AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-primary rounded-full p-1 cursor-pointer">
                          <Upload className="h-4 w-4 text-primary-foreground" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                            ref={fileInputRef}
                          />
                        </label>
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm" className="mt-2" onClick={handleChangePhotoClick}>
                        Change Photo
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true} // Email cannot be changed
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position" className="text-sm font-medium flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Position
                        </Label>
                        <Input
                          id="position"
                          name="position"
                          value={formData.position}
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Additional Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-sm font-medium flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Department
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    className={`w-full ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              {isEditing && (
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </CardFooter>
          </Card>

          {/* Account Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>Details about your account and activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      value={formData.joinDate}
                      disabled
                    />
                    {accountAge > 0 && (
                      <Badge variant="secondary">{accountAge} years</Badge>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Last Login
                  </Label>
                  <Input
                    value={formData.lastLogin}
                    disabled
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <h4 className="font-medium mb-2">Account Status</h4>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Active</Badge>
                  <Badge variant="outline">Verified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;