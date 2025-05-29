import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-[100vh]">
      <Navbar />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
