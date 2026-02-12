"use client";
import AuthProvider from "@/providers/AuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
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
