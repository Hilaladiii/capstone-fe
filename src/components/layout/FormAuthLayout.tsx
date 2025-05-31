interface FormAuthLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
const FormAuthLayout = ({
  title,
  description,
  children,
}: Readonly<FormAuthLayoutProps>) => {
  return (
    <div className="w-fit border-2 border-black rounded-4xl py-8 px-6">
      <h2 className="text-3xl font-semibold text-secondary mb-2">{title}</h2>
      <p className="font-semibold text-sm mb-6">{description}</p>
      {children}
    </div>
  );
};

export default FormAuthLayout;
