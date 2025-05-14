import FormLogbook from "./section/FormLogbook";
import ListLogbook from "./section/ListLogbook";

const Logbook = () => {
  return (
    <div className="w-full h-screen bg-primary px-16">
      <FormLogbook />
      <ListLogbook />
    </div>
  );
};

export default Logbook;
