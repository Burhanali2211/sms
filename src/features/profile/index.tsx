import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useProfile } from "./useProfile";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileInfo } from "./components/ProfileInfo";
import { AccountInfo } from "./components/AccountInfo";

const Profile = () => {
  const {
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
  } = useProfile();

  return (
    <DashboardLayout>
      <DashboardHeader title="Profile" />
      <div className="flex-1 overflow-auto bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <ProfileHeader 
            isEditing={isEditing} 
            setIsEditing={setIsEditing} 
          />

          <ProfileInfo 
            user={user}
            formData={formData}
            isEditing={isEditing}
            avatarPreview={avatarPreview}
            fileInputRef={fileInputRef}
            handleChange={handleChange}
            handleAvatarChange={handleAvatarChange}
            handleChangePhotoClick={handleChangePhotoClick}
            handleSave={handleSave}
          />

          <AccountInfo 
            formData={formData}
            accountAge={accountAge}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
