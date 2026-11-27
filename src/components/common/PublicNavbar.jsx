import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    HeartPulse,
    ArrowRight,
    Menu,
    X
} from "lucide-react";

import "./PublicNavbar.css";

function PublicNavbar() {

    const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const toggleMenu = () => {
        setMenuOpen(previous => !previous);
    };

    return (
        <header className="public-navbar">

            {/* BRAND */}
            <Link
                to="/"
                className="public-brand"
                onClick={closeMenu}
            >
                <div className="public-brand-icon">
                    <HeartPulse size={28} />
                </div>

                <div>
                    <h2>HealthCare</h2>
                    <span>Hospital Management System</span>
                </div>
            </Link>

            {/* HAMBURGER / CLOSE BUTTON */}
            <button
                type="button"
                className={`public-menu-toggle ${
                    menuOpen ? "active" : ""
                }`}
                onClick={toggleMenu}
                aria-label={
                    menuOpen
                        ? "Close navigation menu"
                        : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                aria-controls="public-navigation"
            >
                {menuOpen ? (
                    <X size={27} />
                ) : (
                    <Menu size={27} />
                )}
            </button>

            {/* NAVIGATION MENU */}
            <nav
                id="public-navigation"
                className={`public-nav-links ${
                    menuOpen ? "open" : ""
                }`}
            >

                <Link
                    to="/#home"
                    onClick={closeMenu}
                >
                    Home
                </Link>

                <Link
                    to="/#about"
                    onClick={closeMenu}
                >
                    About
                </Link>

                <Link
                    to="/#services"
                    onClick={closeMenu}
                >
                    Services
                </Link>

                <Link
                    to="/#contact"
                    onClick={closeMenu}
                >
                    Contact
                </Link>

                {/* MOBILE LOGIN AND REGISTER */}
                <div className="public-mobile-actions">

                    <Link
                        to="/login"
                        className={`public-login-btn ${
                            isLogin ? "active" : ""
                        }`}
                        onClick={closeMenu}
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className={`public-register-btn ${
                            isRegister ? "active" : ""
                        }`}
                        onClick={closeMenu}
                    >
                        Register
                        <ArrowRight size={18} />
                    </Link>

                </div>

            </nav>

            {/* DESKTOP LOGIN AND REGISTER */}
            <div className="public-nav-actions">

                <Link
                    to="/login"
                    className={`public-login-btn ${
                        isLogin ? "active" : ""
                    }`}
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    className={`public-register-btn ${
                        isRegister ? "active" : ""
                    }`}
                >
                    Register
                    <ArrowRight size={16} />
                </Link>

            </div>

        </header>
    );
}

export default PublicNavbar;