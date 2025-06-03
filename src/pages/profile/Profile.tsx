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
    sks: "" as number | "",
    year: "" as number | "",
    program: "Sistem Informasi",
    profileImageUrl: undefined as string | undefined,
  });

  useEffect(() => {
    if (profile) {
      setProfileData({
        fullname: profile.fullname || "",
        email: profile.email || "",
        nim: profile.student?.nim || "",
        sks: profile.student?.sks || "",
        year: profile.student?.year || "",
        program: profile.student?.program || "Sistem Informasi",
        profileImageUrl: profile.profileImageUrl,
      });
    }
  }, [profile]);

  const handleProfileInputChange = (field: string, value: string | number) => {
    if (field === "sks" || field === "year") {
      // Handle both string and number inputs
      let numValue: number | "";
      if (typeof value === "string") {
        numValue = value === "" ? "" : Number(value);
      } else {
        numValue = value;
      }
      setProfileData((prev) => ({
        ...prev,
        [field]: numValue,
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [field]: typeof value === "string" ? value : value.toString(),
      }));
    }
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
        <ProfileSection 
          profileData={profileData} 
          handleProfileInputChange={handleProfileInputChange}  
        />
        <PasswordChangeSection email={profile?.email} />
      </div>
      <FooterLayout />
    </main>
  );
};

export default ProfileStudent;