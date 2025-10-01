import Header from "../components/nav-bar"
import { Outlet } from 'react-router-dom';

const Layout = () => {

     const navItems = [
    { to: '/', label: 'Inicio' },
    { to: '/videos', label: 'Videos' },
    { to: '/comics', label: 'Comics' },
    { to: '/infografias', label: 'Infografias' },
    { to: '/comments', label: 'Comments' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        brandName="Newton"
        navItems={navItems}
      />
      <main className=" w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;