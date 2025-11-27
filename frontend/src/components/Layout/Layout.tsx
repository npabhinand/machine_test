import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

const Layout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 overflow-auto p-0 md:p-4">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 lg:hidden z-20"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default Layout;
