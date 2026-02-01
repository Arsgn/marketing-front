import { FC, ReactNode } from "react";

interface ILayoutProps {
  children: ReactNode;
}

const layout: FC<ILayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default layout;
