import Header from "../components/nav-bar"
import { Outlet } from 'react-router-dom';

const Layout = () => {

     const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/videos', label: 'Videos' },
    { to: '/info', label: 'Comics' },
    { to: '/info', label: 'Infografia' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        brandName="3 Leyes"
        navItems={navItems}
      />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;