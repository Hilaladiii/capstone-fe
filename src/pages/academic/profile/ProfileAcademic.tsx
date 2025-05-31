import ProfileInfo from './sections/ProfileInfo';
import ChangePassword from './sections/ChangePassword';

const ProfileAcademic = () => {
  return (
    <div className="mt-20 max-w-6xl mx-auto px-6 bg-white">
      <ProfileInfo />
      <ChangePassword />
    </div>
  );
};

export default ProfileAcademic;