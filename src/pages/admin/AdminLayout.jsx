import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen((previous) => !previous);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="app-layout">

            {/* MOBILE SIDEBAR BACKDROP */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Close sidebar"
                    onClick={closeSidebar}
                />
            )}

            {/* SIDEBAR */}
            <Sidebar
                role="ADMIN"
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />

            {/* MAIN CONTENT */}
            <div className="main-area">

                <Navbar
                    role="ADMIN"
                    onMenuClick={toggleSidebar}
                />

                <main className="page-content">
                    <Outlet />
                </main>

            </div>
        </div>
    );
}

export default AdminLayout;