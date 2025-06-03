import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import SuccessNotification from '../../../../components/ui/successNotification';

interface ChangePasswordFormData {
  username: string;
  passwordBaru: string;
  konfirmasiPassword: string;
}

const ChangePassword = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const passwordForm = useForm<ChangePasswordFormData>({
    defaultValues: {
      username: 'aishazahra08',
      passwordBaru: '',
      konfirmasiPassword: ''
    }
  });

  const handleGantiPassword = (data: ChangePasswordFormData) => {
    if (data.passwordBaru !== data.konfirmasiPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }
    console.log('Mengganti password:', data);
    
    passwordForm.reset({
      username: data.username,
      passwordBaru: '',
      konfirmasiPassword: ''
    });
    
    setShowSuccessModal(true);
  };

  return (
      <div className="w-5xl rounded-lg px-6 pb-10 text-black">
        <h2 className="text-white bg-primary rounded-xl h-12 flex justify-center items-center text-sm font-semibold mb-6 text-center">
          Ganti Password Baru
        </h2>

        <form 
          onSubmit={passwordForm.handleSubmit(handleGantiPassword)}
          className="space-y-2"
        >
          <Input
            register={passwordForm.register}
            name="username"
            label="Username"
            placeholder="Masukkan username"
            errors={passwordForm.formState.errors.username}
            className="border-primary text-primary min-w-244 text-sm font-semibold"
          />
          
          <Input
            register={passwordForm.register}
            name="passwordBaru"
            label="Password Baru"
            type="password"
            placeholder="Masukkan passsword baru anda (Minimal 8 karakter, kombinasi huruf besar, huruf kecil, angka)"
            errors={passwordForm.formState.errors.passwordBaru}
            className="border-primary text-primary min-w-244 text-sm font-semibold"
          />
          
          <Input
            register={passwordForm.register}
            name="konfirmasiPassword"
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="Komfirmasi password baru anda"
            errors={passwordForm.formState.errors.konfirmasiPassword}
            className="border-primary text-primary min-w-244 text-sm font-semibold"
          />
          
          <Button 
            variant="primary"
            className="mt-2 py-3 px-14 text-sm font-semibold"
          >
            Ganti Password
          </Button>
        </form>
        <SuccessNotification
          isOpen={showSuccessModal}
          title="Selamat password anda berhasil diperbarui!"
          message="Silahkan login kembali menggunakan password baru anda"
          onClose={() => setShowSuccessModal(false)}
        />
      </div>

  );
};

export default ChangePassword;