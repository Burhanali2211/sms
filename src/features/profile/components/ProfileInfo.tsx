import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, User, GraduationCap, Upload } from "lucide-react";

interface ProfileInfoProps {
  user: any;
  formData: any;
  isEditing: boolean;
  avatarPreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePhotoClick: () => void;
  handleSave: () => void;
}

export const ProfileInfo = ({
  user,
  formData,
  isEditing,
  avatarPreview,
  fileInputRef,
  handleChange,
  handleAvatarChange,
  handleChangePhotoClick,
  handleSave
}: ProfileInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
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
                    disabled={true} 
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
              className={`w-full ${!isEditing ? 'bg-muted' : 'bg-background'}`}
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
  );
};
