import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/common/Sidebar";
import Navbar from "../../components/common/Navbar";


function PatientLayout() {

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
       PATIENT LAYOUT
    ========================================= */

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
                role="PATIENT"
                isOpen={sidebarOpen}
                onClose={closeSidebar}
            />


            {/* MAIN AREA */}

            <div className="main-area">

                {/* NAVBAR */}

                <Navbar
                    role="PATIENT"
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

export default PatientLayout;