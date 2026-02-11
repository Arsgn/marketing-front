"use client";

import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { FC, ReactNode } from "react";

interface ILayoutClientProps {
  children: ReactNode;
}

const LayoutClient: FC<ILayoutClientProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </ReactQueryProvider>
  );
};

export default LayoutClient;
