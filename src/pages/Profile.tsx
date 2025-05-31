import React, { useState } from "react";

const Profile = () => {
  const [name, setName] = useState("Aisha Zahra Fidelya");
  const [nim, setNim] = useState("225150700111829");
  const [email, setEmail] = useState("aishazahra@student.ub.ac.id");
  const [sks, setSks] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("Sistem Informasi");
  const [photo, setPhoto] = useState<File | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSaveProfile = () => {
    console.log("Saved Profile", {
      name,
      nim,
      email,
      sks,
      year,
      program,
      photo,
    });
  };

  const handleSavePassword = () => {
    if (newPassword === confirmPassword) {
      console.log("Password changed successfully");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <main>
      <div className="flex items-center justify-center flex-col bg-dark-blue text-white rounded-lg shadow-lg w-full bg-primary">
        <div className="flex items-center w-7xl pt-24 gap-6 p-8">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-80 rounded-2xl object-cover"
              src={
                photo
                  ? URL.createObjectURL(photo)
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
            />
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <button
              onClick={() => document.getElementById("file-upload")?.click()}
              className="mt-6 text-sm text-white bg-secondary px-4 py-2 rounded-full cursor-pointer"
            >
              Upload Foto
            </button>
          </div>
          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col">
                <label className="text-sm">Nama Lengkap</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">NIM</label>
                <input
                  type="text"
                  value={nim}
                  onChange={(e) => setNim(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">SKS Lulus</label>
                <input
                  type="text"
                  value={sks}
                  onChange={(e) => setSks(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                  placeholder="Masukkan jumlah SKS lulus anda"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Tahun Masuk</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                  placeholder="Masukkan tahun masuk anda"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm">Program Studi</label>
                <input
                  type="text"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className="bg-white text-black rounded-lg p-3 mt-1"
                />
              </div>
            </div>
            <button
              onClick={handleSaveProfile}
              className="mt-6 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 w-full mx-auto bg-white text-black p-8 rounded-lg shadow-lg">
          <h2 className="flex items-center justify-center text-2xl font-semibold mb-6 bg-black text-white rounded-lg w-7xl px-4 py-2">
            Ganti Password Baru
          </h2>
          <div className="space-y-4 w-7xl">
            <div className="flex flex-col">
              <label className="text-sm">Username</label>
              <input
                type="text"
                value="aishazahra08"
                className="border-black border-3 text-black rounded-lg p-3 mt-1"
                readOnly
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Password Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border-black border-3 text-black rounded-lg p-3 mt-1"
                placeholder="Masukkan password baru anda (Minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka)"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-black border-3 text-black rounded-lg p-3 mt-1"
                placeholder="Konfirmasi password baru anda"
              />
            </div>
          </div>
          <button
            onClick={handleSavePassword}
            className="mt-6 bg-black text-white py-2 px-6 rounded-full hover:bg-orange-600"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;
