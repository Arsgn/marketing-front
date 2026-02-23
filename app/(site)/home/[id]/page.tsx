import { use } from "react";
import AvailableDetail from "@/components/pages/home/sections/AvailableDetail";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <AvailableDetail id={id} />;
}
