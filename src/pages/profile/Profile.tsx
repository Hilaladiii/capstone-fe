import { useState, useEffect } from "react";
import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import { useProfile } from "../../common/hooks/useProfile";
import ProfileSection from "./sections/ProfileSection";
import PasswordChangeSection from "./sections/PasswordChangeSection";

const ProfileStudent = () => {
  const { data: profile, isLoading, error } = useProfile();
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    nim: "",
    sks: "",
    year: "",
    program: "Sistem Informasi",
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullname: profile.fullname || "",
        email: profile.email || "",
        nim: profile.student?.nim || "",
        sks: profile.student?.sks?.toString() || "",
        year: profile.student?.year?.toString() || "",
        program: profile.student?.program || "Sistem Informasi",
      });
    }
  }, [profile]);

  const handleProfileInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    console.log("Profile update will be implemented when API is ready", profileData);
    alert("Fitur update profil akan segera tersedia!");
  };

  if (isLoading) {
    return (
      <main>
        <HeaderLayout />
        <div className="flex items-center justify-center h-96 bg-primary">
          <div className="text-white text-xl">Memuat data profil...</div>
        </div>
        <FooterLayout />
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <HeaderLayout />
        <div className="flex items-center justify-center h-96 bg-primary">
          <div className="text-white text-xl">Gagal memuat data profil</div>
        </div>
        <FooterLayout />
      </main>
    );
  }

  return (
    <main>
      <HeaderLayout />
      <div className="flex items-center justify-center flex-col bg-dark-blue text-white rounded-lg shadow-lg w-full bg-primary">
        <ProfileSection profileData={profileData} handleProfileInputChange={handleProfileInputChange} handleSaveProfile={handleSaveProfile} />
        <PasswordChangeSection email={profile?.email} />
      </div>
      <FooterLayout />
    </main>
  );
};

export default ProfileStudent;
