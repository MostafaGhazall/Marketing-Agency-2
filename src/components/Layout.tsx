import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      <FloatingWhatsApp phone="966541398949" message="Hi! I'm interested in your services." />
      <Navbar />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
