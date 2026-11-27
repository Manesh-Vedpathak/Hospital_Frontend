import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";


function DoctorLayout() {

    /* =========================================
       SIDEBAR STATE
    ========================================= */

    const [sidebarOpen, setSidebarOpen] = useState(false);


    /* =========================================
       TOGGLE SIDEBAR
    ========================================= */

    const toggleSidebar = () => {

        setSidebarOpen(previous => !previous);

    };


    /* =========================================
       CLOSE SIDEBAR
    ========================================= */

    const closeSidebar = () => {

        setSidebarOpen(false);

    };


    /* =========================================
       DOCTOR LAYOUT
    ========================================= */

    return (

        <div className="app-layout">

            {/* =================================
                MOBILE SIDEBAR BACKDROP
            ================================= */}

            {sidebarOpen && (

                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Close sidebar"
                    onClick={closeSidebar}
                />

            )}


            {/* =================================
                SIDEBAR
            ================================= */}

            <Sidebar
                role="DOCTOR"
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />


            {/* =================================
                MAIN AREA
            ================================= */}

            <div className="main-area">

                {/* NAVBAR */}

                <Navbar
                    role="DOCTOR"
                    onMenuClick={toggleSidebar}
                    sidebarOpen={sidebarOpen}
                />


                {/* PAGE CONTENT */}

                <main className="page-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default DoctorLayout;