import { useForm } from "react-hook-form";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import SuccessNotification from '../../../../components/ui/SuccessNotification';

interface ProfileInfoFormData {
  namaLengkap: string;
  nip: string;
  email: string;
}

const ProfileInfo = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const profileForm = useForm<ProfileInfoFormData>({
    defaultValues: {
      namaLengkap: 'Dr. Sarah Johnson',
      nip: '198501152010122001',
      email: 'sarah.johnson@university.ac.id'
    }
  });

  const handleSimpanPerubahan = (data: ProfileInfoFormData) => {
    console.log('Menyimpan perubahan:', data);

    setShowSuccessModal(true);
  };

  const handleUploadFoto = () => {

    console.log('Upload foto');
  };

  return (
      <div className="bg-white rounded-lg p-6 mb-6 min-w-full text-black">
        <div className="flex items-start gap-10 min-w-full">
          <div className="flex flex-col items-center">
            <div className="w-42 h-46 flex flex-row rounded-xl overflow-hidden bg-gray-200 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <Button 
              onClick={handleUploadFoto}
              variant="secondary"
              className="flex items-center justify-center w-40 px-0 text-sm py-2 font-semibold"
            >
              <span className="flex items-center">
                Unggah Foto
                <FiUpload className="ml-2 font-extrabold text-base"/>
              </span>
            </Button>
          </div>

          <div className="text-black">
            <form 
              onSubmit={profileForm.handleSubmit(handleSimpanPerubahan)}
              className="space-y-2"
            >
              <Input
                register={profileForm.register}
                name="namaLengkap"
                label="Nama Lengkap"
                placeholder="Masukkan nama lengkap"
                errors={profileForm.formState.errors.namaLengkap}
                className='min-w-3xl w-full text-sm border-primary'
              />

              <Input
                register={profileForm.register}
                name="nip"
                label="NIP"
                placeholder="Masukkan NIP"
                errors={profileForm.formState.errors.nip}
                className='min-w-3xl w-full text-sm border-primary'
              />

              <Input
                register={profileForm.register}
                name="email"
                label="Email"
                type="email"
                placeholder="Masukkan email"
                errors={profileForm.formState.errors.email}
                className='min-w-3xl w-full text-sm border-primary'
              />

              <Button 
                variant="primary"
                className="bg-gray-800 hover:bg-gray-900 text-sm font-semibold mt-2 py-3 px-14"
              >
                Simpan Perubahan
              </Button>
            </form>
          </div>
        </div>
        <SuccessNotification
          isOpen={showSuccessModal}
          title="Selamat profil anda berhasil diperbarui!"
          message="Silahkan klik button dibawah untuk kembali ke halaman profil"
          onClose={() => setShowSuccessModal(false)}
        />
      </div>
  );
};

export default ProfileInfo;