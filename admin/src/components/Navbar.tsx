import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  setToken: (token: string) => void;
}

const Navbar = ({ setToken }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link 
          to="/" 
          className={cn(
            "flex items-center gap-2 transition-colors hover:opacity-90"
          )}
        >
          <img
            src="https://res.cloudinary.com/dryhpaq1t/image/upload/e_background_removal/f_png/v1740752141/tespa_logo_fvfey9.jpg"
            alt="TESPA METROLOGY"
            className="h-10 w-auto object-contain"
          />
          <span className="hidden font-bold sm:inline-block">
            Admin Dashboard
          </span>
        </Link>

        <div className="flex-1 flex justify-end">
          <button
            onClick={() => setToken('')}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:opacity-50 disabled:pointer-events-none",
              "bg-gray-600 text-white hover:bg-gray-700 cursor-pointer",
              "h-9 px-4 py-2"
            )}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
