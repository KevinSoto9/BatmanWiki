import { ReactNode } from 'react';
import NavBar from '../Navbar';
import Footer from '../Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="mt-[4rem] items-center justify-center w-full">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
