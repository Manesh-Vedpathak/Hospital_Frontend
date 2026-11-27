import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
    Activity,
    HeartPulse,
    Stethoscope,
    CalendarCheck,
    ShieldCheck,
    Clock,
    Users,
    Ambulance,
    ArrowRight,
    Phone,
    MapPin,
    Mail,
    CheckCircle
} from "lucide-react";

import "./Home.css";
import PublicNavbar from "../../components/common/PublicNavbar";


/* =========================================
   SERVICES
========================================= */

const services = [
    {
        icon: <Stethoscope />,
        title: "Expert Doctors",
        description:
            "Get quality medical consultation from experienced healthcare professionals."
    },
    {
        icon: <CalendarCheck />,
        title: "Easy Appointments",
        description:
            "Book and manage your medical appointments with a simple online process."
    },
    {
        icon: <HeartPulse />,
        title: "Patient Care",
        description:
            "We focus on patient comfort, safety and personalized healthcare services."
    },
    {
        icon: <Ambulance />,
        title: "Emergency Care",
        description:
            "Access emergency service information whenever you need immediate assistance."
    }
];


/* =========================================
   FEATURES
========================================= */

const features = [
    "Experienced healthcare professionals",
    "Simple online appointment management",
    "Secure patient information",
    "Digital prescriptions and billing",
    "Dedicated patient and doctor dashboards",
    "Organized hospital management"
];


/* =========================================
   HOME COMPONENT
========================================= */

function Home() {

    const location = useLocation();


    /* =========================================
       HANDLE SECTION NAVIGATION
    ========================================= */

    useEffect(() => {

        const hash = location.hash;

        if (!hash) {
            return;
        }

        const sectionId = hash.replace("#", "");

        const scrollToSection = () => {

            const section = document.getElementById(sectionId);

            if (section) {

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        };

        // Wait until Home page has rendered
        const timer = window.setTimeout(
            scrollToSection,
            150
        );

        return () => {
            window.clearTimeout(timer);
        };

    }, [location.pathname, location.hash]);


    /* =========================================
       UI
    ========================================= */

    return (

        <div className="public-home">

            {/* NAVBAR */}

            <PublicNavbar />


            {/* =========================================
                HERO SECTION
            ========================================= */}

            <section className="public-hero" id="home">

                <div className="public-hero-content">

                    <span className="public-hero-tag">

                        <Activity size={16} />

                        YOUR HEALTH, OUR PRIORITY

                    </span>


                    <h1>

                        Quality Healthcare

                        <br />

                        <span>For A Better Life.</span>

                    </h1>


                    <p>
                        Welcome to our Hospital Management System.
                        We make healthcare management easier through
                        digital appointments, patient services and
                        professional medical care.
                    </p>


                    <div className="public-hero-actions">

                        <Link
                            to="/register"
                            className="public-primary-btn"
                        >
                            Get Started
                            <ArrowRight size={18} />
                        </Link>


                        <Link
                            to="/login"
                            className="public-outline-btn"
                        >
                            Patient Login
                        </Link>

                    </div>


                    <div className="public-hero-trust">

                        <ShieldCheck size={19} />

                        Secure & Reliable Healthcare Management

                    </div>

                </div>


                <div className="public-hero-visual">

                    <div className="public-hero-image-card">

                        <img
                            src="/logo.png"
                            alt="Hospital healthcare logo"
                        />

                    </div>

                </div>

            </section>


            {/* =========================================
                QUICK FEATURES
            ========================================= */}

            <section className="public-highlights">

                <div>

                    <Users />

                    <strong>Patient Focused</strong>

                    <span>Better patient experience</span>

                </div>


                <div>

                    <Clock />

                    <strong>Easy Management</strong>

                    <span>Convenient digital services</span>

                </div>


                <div>

                    <ShieldCheck />

                    <strong>Secure System</strong>

                    <span>Protected user access</span>

                </div>

            </section>


            {/* =========================================
                ABOUT SECTION
            ========================================= */}

            <section
                className="public-about"
                id="about"
            >

                <div className="public-section-heading">

                    <span>ABOUT OUR SYSTEM</span>

                    <h2>Healthcare Made Simpler</h2>

                    <p>
                        A modern digital platform designed to improve
                        hospital administration and patient management.
                    </p>

                </div>


                <div className="public-about-content">

                    <div className="public-about-icon">

                        <HeartPulse size={76} />

                    </div>


                    <div>

                        <h3>Technology Meets Healthcare</h3>

                        <p>
                            Our Hospital Management System provides
                            dedicated access for administrators, doctors
                            and patients. It helps organize hospital
                            operations and makes important services
                            easier to access.
                        </p>


                        <div className="public-feature-list">

                            {features.map((feature, index) => (

                                <div key={index}>

                                    <CheckCircle size={18} />

                                    <span>{feature}</span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================
                SERVICES SECTION
            ========================================= */}

            <section
                className="public-services"
                id="services"
            >

                <div className="public-section-heading">

                    <span>OUR SERVICES</span>

                    <h2>What We Provide</h2>

                    <p>
                        Convenient healthcare management through
                        one digital platform.
                    </p>

                </div>


                <div className="public-service-grid">

                    {services.map((service, index) => (

                        <div
                            className="public-service-card"
                            key={index}
                        >

                            <div className="public-service-icon">

                                {service.icon}

                            </div>


                            <h3>{service.title}</h3>


                            <p>{service.description}</p>


                            <Link to="/login">

                                Explore Services

                                <ArrowRight size={16} />

                            </Link>

                        </div>

                    ))}

                </div>

            </section>


            {/* =========================================
                CALL TO ACTION
            ========================================= */}

            <section className="public-cta">

                <div>

                    <span>GET STARTED TODAY</span>

                    <h2>Your Healthcare Journey Starts Here</h2>

                    <p>
                        Create your patient account or log in to access
                        your healthcare services.
                    </p>

                </div>


                <div className="public-cta-actions">

                    <Link to="/register">

                        Create Account

                        <ArrowRight size={17} />

                    </Link>


                    <Link to="/login">
                        Login
                    </Link>

                </div>

            </section>


            {/* =========================================
                CONTACT SECTION
            ========================================= */}

            <section
                className="public-contact"
                id="contact"
            >

                <div className="public-section-heading">

                    <span>CONTACT US</span>

                    <h2>We Are Here To Help</h2>

                </div>


                <div className="public-contact-grid">

                    <div>

                        <MapPin />

                        <h3>Our Location</h3>

                        <p>
                            Contact your hospital administration.
                        </p>

                    </div>


                    <div>

                        <Phone />

                        <h3>Phone Support</h3>

                        <p>
                            Contact the hospital for assistance.
                        </p>

                    </div>


                    <div>

                        <Mail />

                        <h3>Email Support</h3>

                        <p>
                            Reach out to the hospital support team.
                        </p>

                    </div>

                </div>

            </section>


            {/* =========================================
                FOOTER
            ========================================= */}

            <footer className="public-footer">

                <div className="public-footer-bottom">

                    <span className="public-developer-credit">

                        Project Developed by Manesh Vedpathak

                    </span>

                </div>

            </footer>

        </div>

    );

}


export default Home;