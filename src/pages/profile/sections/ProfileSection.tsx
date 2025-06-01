import React, { useState, useRef } from "react";

interface ProfileSectionProps {
  profileData: {
    fullname: string;
    email: string;
    nim: string;
    sks: string;
    year: string;
    program: string;
  };
  handleProfileInputChange: (field: string, value: string) => void;
  handleSaveProfile: () => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profileData, handleProfileInputChange, handleSaveProfile }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  return (
    <div className="flex items-center w-7xl pt-24 gap-6 p-8">
      <div className="flex flex-col items-center justify-center">
        <div className="w-80 h-80 rounded-2xl flex items-center justify-center overflow-hidden">
          {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-gray-500">No Photo Available</span>}
        </div>
        <button onClick={handleUploadClick} className="mt-4 bg-secondary text-sm font-semibold text-white py-2 px-4 rounded-lg cursor-pointer">
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
                className="bg-white text-black rounded-lg p-3 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">NIM</label>
            <input 
                type="text" 
                value={profileData.nim} 
                onChange={(e) => handleProfileInputChange("nim", e.target.value)} 
                className="bg-white text-black rounded-lg p-3 mt-1" 
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => handleProfileInputChange("email", e.target.value)} 
                className="bg-white text-black rounded-lg p-3 mt-1" 
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">SKS Lulus</label>
            <input 
                type="text" 
                value={profileData.sks} 
                onChange={(e) => handleProfileInputChange("sks", e.target.value)} 
                className="bg-white text-black rounded-lg p-3 mt-1" 
                placeholder="Masukkan jumlah SKS lulus anda" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Tahun Masuk</label>
            <input 
                type="text" 
                value={profileData.year} 
                onChange={(e) => 
                handleProfileInputChange("year", e.target.value)} 
                className="bg-white text-black rounded-lg p-3 mt-1" 
                placeholder="Masukkan tahun masuk anda" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Program Studi</label>
            <input 
                type="text" 
                value={profileData.program} 
                onChange={(e) => handleProfileInputChange("program", e.target.value)} 
                className="bg-white text-black rounded-lg p-3 mt-1" />
          </div>
        </div>
        <button onClick={handleSaveProfile} className="mt-6 bg-secondary text-sm font-semibold text-white py-2 px-4 rounded-full hover:bg-orange-600">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
