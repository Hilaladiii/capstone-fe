import React, { useState, useRef, useEffect } from "react";
import { useUpdateProfile } from "../../../common/hooks/useProfile";
import { UpdateProfileData } from "../../../common/types/user.type";
import toast from "react-hot-toast";

interface ProfileSectionProps {
  profileData: {
    fullname: string;
    email: string;
    nim: string;
    sks: number | '';
    year: number | '';
    program: string;
    profileImageUrl?: string; 
  };
  handleProfileInputChange: (field: keyof UpdateProfileData, value: string | number | '') => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profileData, handleProfileInputChange }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (profileData.profileImageUrl && !profileImage && !selectedFile) {
      setProfileImage(profileData.profileImageUrl);
    }
  }, [profileData.profileImageUrl, profileImage, selectedFile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveProfile = () => {

    const updateData: UpdateProfileData = {};

    if (typeof profileData.sks === 'number' && profileData.sks > 0) {
      updateData.sks = profileData.sks;
    }
    if (typeof profileData.year === 'number' && profileData.year > 0) {
      updateData.year = profileData.year;
    }

    if (Object.keys(updateData).length === 0 && !selectedFile) {
      toast.error("Harap isi SKS atau Tahun Masuk dengan nilai yang valid, atau pilih foto profil");
      return;
    }

    console.log("Updating profile with data:", updateData);
    console.log("With image:", selectedFile);

    updateProfileMutation.mutate(
      {
        data: updateData,
        image: selectedFile || undefined,
      },
      {
        onSuccess: () => {
          setSelectedFile(null);
        }
      }
    );
  };

  const handleNumberInputChange = (field: 'sks' | 'year', value: string) => {
    if (value.trim() === '') {
      handleProfileInputChange(field, '');
      return;
    }

    if (/^\d+$/.test(value)) {
        const numberValue = parseInt(value, 10);
        if (!isNaN(numberValue)) {
             handleProfileInputChange(field, numberValue);
        } else {
            console.error(`Failed to parse ${field} as integer:`, value);
             handleProfileInputChange(field, '');
             toast.error(`Invalid input for ${field}. Please enter a valid number.`); 
        }
    } else {
        console.error(`Invalid characters in ${field} input:`, value);
        handleProfileInputChange(field, ''); 
        toast.error(`Invalid input for ${field}. Please enter only digits.`);
    }
  };

  const displayImage = selectedFile ? profileImage : (profileData.profileImageUrl || profileImage);

  return (
    <div className="flex items-center w-7xl pt-24 gap-6 p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-80 h-80 rounded-2xl flex items-center justify-center overflow-hidden bg-gray-100">
          {displayImage ? (
            <img src={displayImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-500">No Photo Available</span>
          )}
        </div>
        <button
          onClick={handleUploadClick}
          className="mt-4 bg-secondary text-sm font-semibold text-white py-2 px-4 rounded-lg cursor-pointer hover:opacity-90"
          disabled={updateProfileMutation.isPending}
        >
          Unggah Foto
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm">Nama Lengkap</label>
            <input
              type="text"
              value={profileData.fullname}
              onChange={(e) => handleProfileInputChange("fullname", e.target.value)}
              className="bg-gray-100 text-gray-600 rounded-lg p-3 mt-1 cursor-not-allowed"
              disabled={true}
              title="Field ini tidak dapat diubah"
            />
            <small className="text-gray-500 mt-1">Field ini tidak dapat diubah</small>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">NIM</label>
            <input
              type="text"
              value={profileData.nim}
              onChange={(e) => handleProfileInputChange("nim", e.target.value)}
              className="bg-gray-100 text-gray-600 rounded-lg p-3 mt-1 cursor-not-allowed"
              disabled={true}
              title="Field ini tidak dapat diubah"
            />
            <small className="text-gray-500 mt-1">Field ini tidak dapat diubah</small>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => handleProfileInputChange("email", e.target.value)}
              className="bg-gray-100 text-gray-600 rounded-lg p-3 mt-1 cursor-not-allowed"
              disabled={true}
              title="Field ini tidak dapat diubah"
            />
            <small className="text-gray-500 mt-1">Field ini tidak dapat diubah</small>
          </div>
          <div className="flex flex-col">
            <label className="text-sm">SKS Lulus</label>
            <input
              type="number"
              value={profileData.sks}
              onChange={(e) => handleNumberInputChange("sks", e.target.value)}
              className="bg-white text-black rounded-lg p-3 mt-1"
              placeholder="Masukkan jumlah SKS lulus anda"
              disabled={updateProfileMutation.isPending}
              min="0"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Tahun Masuk</label>
            <input
              type="number"
              value={profileData.year}
              onChange={(e) => handleNumberInputChange("year", e.target.value)}
              className="bg-white text-black rounded-lg p-3 mt-1"
              placeholder="Masukkan tahun masuk anda"
              disabled={updateProfileMutation.isPending}
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Program Studi</label>
            <input
              type="text"
              value={profileData.program}
              onChange={(e) => handleProfileInputChange("program", e.target.value)}
              className="bg-gray-100 text-gray-600 rounded-lg p-3 mt-1 cursor-not-allowed"
              disabled={true}
              title="Field ini tidak dapat diubah"
            />
            <small className="text-gray-500 mt-1">Field ini tidak dapat diubah</small>
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          className="mt-6 bg-secondary text-sm font-semibold text-white py-2 px-4 rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;