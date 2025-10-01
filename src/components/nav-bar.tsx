import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger, 
  SheetClose 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
// import { ModeToggle } from '@/components/mode-toggle';
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuList, 
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Menu, X, ExternalLink } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
}

interface HeaderProps {
  brandName: string;
  navItems: NavItem[];
  evaluateUrl?: string; // Nueva prop opcional para la URL de evaluate
  pdfLink?: string; // Nueva prop opcional para la URL de evaluate
}

const Header: React.FC<HeaderProps> = ({ brandName, navItems, evaluateUrl = "https://wordwall.net/es/resource/98587855/f%c3%adsica/leyes-de-newton", pdfLink = "/pdf/Línea de tiempo Newton.pdf" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleEvaluateClick = () => {
    window.open(evaluateUrl, '_blank', 'noopener,noreferrer');
  };
  const handlePdfClick = () => {
    window.open(pdfLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {brandName}
            </h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavLink to={item.to} end={item.to === '/'}>
                  <NavigationMenuLink 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === item.to 
                        ? "bg-accent text-accent-foreground" 
                        : "hover:bg-accent/50"
                    )}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            ))}
            
            {/* Botón Evaluate para desktop */}
            <NavigationMenuItem>
              <Button
                variant="default"
                className="ml-2 bg-gradient-to-r from-blue-900 to-purple-900 hover:from-blue-800 hover:to-purple-700 text-white"
                onClick={handlePdfClick}
              >
                Timeline
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                variant="default"
                className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                onClick={handleEvaluateClick}
              >
                Evaluate
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
          {/* <ModeToggle></ModeToggle> */}
        </NavigationMenu>

        {/* Mobile Navigation Sheet */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {brandName}
                </h1>
              </div>
              
              {navItems.map((item, index) => (
                <SheetClose asChild key={index}>
                  <NavLink 
                    to={item.to} 
                    className={({ isActive }) => 
                      cn(
                        "flex w-full items-center py-2 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 px-4 rounded-md",
                        isActive ? "bg-accent text-accent-foreground" : "text-foreground/70"
                      )
                    }
                    onClick={handleMobileLinkClick}
                    end={item.to === '/'}
                  >
                    {item.label}
                  </NavLink>
                </SheetClose>
              ))}
              
              {/* Botón Evaluate para mobile */}
              <SheetClose asChild>
                <Button
                  variant="default"
                  className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handleEvaluateClick}
                >
                  Evaluate
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  variant="default"
                  className="mt-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={handlePdfClick}
                >
                  Timeline
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;