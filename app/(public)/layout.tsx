import { Footer, Navbar } from "@/components/public";
import type { ReactNode } from "react";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
