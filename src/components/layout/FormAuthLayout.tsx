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
    <div className="w-fit">
      <h2 className="text-3xl font-bold text-secondary mb-2">{title}</h2>
      <p className="font-semibold text-base mb-6">{description}</p>
      {children}
    </div>
  );
};

export default FormAuthLayout;
