import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    HeartPulse,
    ArrowRight
} from "lucide-react";

import "./PublicNavbar.css";

function PublicNavbar() {

    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

    return (
        <header className="public-navbar">

            {/* BRAND */}
            <Link to="/" className="public-brand">
                <div className="public-brand-icon">
                    <HeartPulse size={28} />
                </div>

                <div>
                    <h2>HealthCare</h2>
                    <span>Hospital Management System</span>
                </div>
            </Link>

            {/* NAVIGATION */}
            <nav className="public-nav-links">
                <Link to="/">Home</Link>
                <Link to="/#about">About</Link>
                <Link to="/#services">Services</Link>
                <Link to="/#contact">Contact</Link>
            </nav>

            {/* AUTH BUTTONS */}
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