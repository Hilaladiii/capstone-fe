import FooterLayout from "../../components/layout/FooterLayout";
import HeaderLayout from "../../components/layout/HeaderLayout";
import FormLogbook from "./sections/FormLogbook";
import ListLogbook from "./sections/ListLogbook";

const Logbook = () => {
  return (
    <div className="w-full min-h-screen bg-primary">
      <HeaderLayout />
      <FormLogbook />
      <div className="bg-white h-0.5 min-w-screen my-14" />
      <ListLogbook />
      <FooterLayout />
    </div>
  );
};

export default Logbook;
