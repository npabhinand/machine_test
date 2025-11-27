import React from "react";
import { NavLink } from "react-router-dom";
import { Users, LayoutDashboard, Menu, PackageOpen } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const navigation = [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Contacts", href: "/contacts", icon: Users },
    ];

    return (
        <>
            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-30
                    transform transition-transform duration-300 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:static
                `}
            >
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <PackageOpen className="h-6 w-6 text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-800">Machine Test</h1>
                    </div>

                    <button
                        className="lg:hidden text-gray-600"
                        onClick={() => setIsOpen(false)}
                    >
                        ✕
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5 mr-3" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
};
