import DashboardLayout from "@/components/layout/DashboardLayout";


const DashboardLayoutWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutWrapper;
