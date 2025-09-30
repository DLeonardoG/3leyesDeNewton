import Header from "../components/nav-bar"
import { Outlet } from 'react-router-dom';

const Layout = () => {

     const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/videos', label: 'Videos' },
    { to: '/comics', label: 'Comics' },
    { to: '/infografias', label: 'Infografias' },
    { to: '/timeline', label: 'Linea de tiempo' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        brandName="3 Leyes"
        navItems={navItems}
      />
      <main className=" w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;