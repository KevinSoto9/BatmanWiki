import { ReactNode } from 'react';
import NavBar from '../Navbar';

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
    </div>
  );
};

export default Layout;
