import React from "react";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

interface NavbarProps {
    setIsSidebarOpen: (value: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setIsSidebarOpen }) => {
    const location = useLocation();

    const getPageTitle = () => {
        switch (location.pathname) {
            case "/contacts":
                return "Contacts";
            case "/dashboard":
                return "Dashboard";
            default:
                return "Machine Test";
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-4 lg:px-6">
            <button
                className="lg:hidden mr-4 text-gray-700"
                onClick={() => setIsSidebarOpen(true)}
            >
                <Menu className="h-6 w-6" />
            </button>

            <h1 className="text-2xl font-bold text-gray-800">{getPageTitle()}</h1>
        </header>
    );
};
