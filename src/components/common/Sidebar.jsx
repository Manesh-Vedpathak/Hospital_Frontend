import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import {
    House,
    UserRound,
    Stethoscope,
    Building2,
    CalendarCheck,
    Pill,
    IndianRupee,
    ChartColumn
} from "lucide-react";

import api from "../../services/api";

import "../../styles/sidebar.css";

function Sidebar({
    role = "ADMIN",
    isOpen = false,
    onClose = () => {}
}) {

    const [profile, setProfile] = useState(null);

    /* LOAD PROFILE */

    useEffect(() => {

        const fetchProfile = async () => {

            if (role === "ADMIN") {
                return;
            }

            try {

                let response;

                if (role === "DOCTOR") {
                    response = await api.get("/doctor/profile");
                }

                if (role === "PATIENT") {
                    response = await api.get("/patient/profile");
                }

                const profileData = response?.data ?? response;

                if (profileData) {
                    setProfile(profileData);
                }

            } catch (error) {

                console.error(
                    "Error loading sidebar profile:",
                    error
                );

            }

        };

        fetchProfile();

    }, [role]);

    /* MENU ITEMS */

    const menuItems = {

        ADMIN: [
            {
                path: "/admin/dashboard",
                icon: House,
                label: "Dashboard"
            },
            {
                path: "/admin/doctors",
                icon: Stethoscope,
                label: "Doctors"
            },
            {
                path: "/admin/patients",
                icon: UserRound,
                label: "Patients"
            },
            {
                path: "/admin/departments",
                icon: Building2,
                label: "Departments"
            },
            {
                path: "/admin/appointments",
                icon: CalendarCheck,
                label: "Appointments"
            },
            {
                path: "/admin/medicines",
                icon: Pill,
                label: "Medicines"
            },
            {
                path: "/admin/billing",
                icon: IndianRupee,
                label: "Billing"
            },
            {
                path: "/admin/reports",
                icon: ChartColumn,
                label: "Reports"
            }
        ],

        DOCTOR: [
            {
                path: "/doctor/dashboard",
                icon: House,
                label: "Dashboard"
            },
            {
                path: "/doctor/patients",
                icon: UserRound,
                label: "My Patients"
            },
            {
                path: "/doctor/appointments",
                icon: CalendarCheck,
                label: "My Appointments"
            },
            {
                path: "/doctor/prescriptions",
                icon: Pill,
                label: "Prescriptions"
            },
            {
                path: "/doctor/reports",
                icon: ChartColumn,
                label: "Reports"
            }
        ],

        PATIENT: [
            {
                path: "/patient/dashboard",
                icon: House,
                label: "Dashboard"
            },
            {
                path: "/patient/doctors",
                icon: Stethoscope,
                label: "Doctors"
            },
            {
                path: "/patient/appointments",
                icon: CalendarCheck,
                label: "My Appointments"
            },
            {
                path: "/patient/prescriptions",
                icon: Pill,
                label: "My Prescriptions"
            },
            {
                path: "/patient/billing",
                icon: IndianRupee,
                label: "My Bills"
            }
        ]

    };

    const items = menuItems[role] || menuItems.ADMIN;

    /* SIDEBAR NAME */

    const getSidebarName = () => {

        if (role === "ADMIN") {
            return (
                profile?.name ||
                profile?.fullName ||
                "Administrator"
            );
        }

        if (role === "DOCTOR") {

            const doctorName =
                profile?.doctorName ||
                profile?.name ||
                profile?.fullName;

            if (!doctorName) {
                return "Doctor";
            }

            const cleanName = String(doctorName)
                .replace(/^dr\.?\s+/i, "")
                .trim();

            return `Dr. ${cleanName}`;
        }

        if (role === "PATIENT") {

            const patientName =
                profile?.patientName ||
                profile?.name ||
                profile?.fullName;

            if (!patientName) {
                return "Patient";
            }

            const cleanName = String(patientName)
                .replace(/^(mr\.?|mrs\.?|ms\.?)\s+/i, "")
                .trim();

            const gender = String(profile?.gender || "").toUpperCase();

            if (gender === "FEMALE") {
                return `Mrs. ${cleanName}`;
            }

            if (gender === "MALE") {
                return `Mr. ${cleanName}`;
            }

            return cleanName;
        }

        return "Patient";
    };

    const sidebarName = getSidebarName();

    const roleIcon =
        role === "ADMIN" ? "A" :
        role === "DOCTOR" ? "D" : "P";

    const roleLabel =
        role === "ADMIN" ? "Administrator" :
        role === "DOCTOR" ? "Doctor" : "Patient";

    /* CLOSE ON ESCAPE */

    useEffect(() => {

        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };

    }, [isOpen, onClose]);

    return (

        <aside
            id="admin-sidebar"
            className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
            aria-hidden={!isOpen && window.innerWidth <= 600}
        >

            {/* LOGO */}

            <div className="sidebar-logo">

                <div className="sidebar-logo-icon">
                    🏥
                </div>

                <div className="sidebar-logo-text">
                    <h2>HMS</h2>
                    <span>Hospital Management</span>
                </div>

            </div>

            {/* USER ROLE */}

            <div className="sidebar-role">

                <div className="sidebar-role-icon">
                    {roleIcon}
                </div>

                <div className="sidebar-role-details">

                    <strong>{sidebarName}</strong>

                    <span>{roleLabel}</span>

                </div>

            </div>

            {/* MENU */}

            <nav className="sidebar-menu">

                <div className="sidebar-menu-title">
                    Main Menu
                </div>

                {items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >

                            <span className="sidebar-link-icon">
                                <Icon
                                    size={20}
                                    strokeWidth={2}
                                />
                            </span>

                            <span className="sidebar-link-label">
                                {item.label}
                            </span>

                        </NavLink>

                    );

                })}

            </nav>

        </aside>

    );
}

export default Sidebar;