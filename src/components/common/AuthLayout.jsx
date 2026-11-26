import React from "react";
import {
    HeartPulse,
    ShieldCheck,
    CheckCircle,
    Activity
} from "lucide-react";

import PublicNavbar from "./PublicNavbar";

function AuthLayout({ children, mode = "login" }) {

    const content = {
        login: {
            eyebrow: "WELCOME BACK",
            title: "Your health. Our priority.",
            description:
                "Sign in to access your hospital services, manage appointments and stay connected with your healthcare journey.",
            features: [
                "Easy appointment management",
                "Access your medical records",
                "Manage your healthcare profile"
            ],
            bottom: "Quality healthcare, managed digitally."
        },

        forgot: {
            eyebrow: "ACCOUNT RECOVERY",
            title: "Secure your healthcare account.",
            description:
                "Recover access to your account through your registered email address and continue managing your healthcare services.",
            features: [
                "Secure email verification",
                "Protected account recovery",
                "Easy password restoration"
            ],
            bottom: "Your account security matters."
        },

        reset: {
            eyebrow: "CREATE NEW PASSWORD",
            title: "A fresh start for your account.",
            description:
                "Create a new secure password and regain access to your hospital management account.",
            features: [
                "Secure password update",
                "Protected patient information",
                "Reliable account access"
            ],
            bottom: "Your health information stays protected."
        },

        register: {
            eyebrow: "WELCOME TO HEALTHCARE",
            title: "Better healthcare starts here.",
            description:
                "Create your patient account to access hospital services, manage your appointments and stay informed about your healthcare.",
            features: [
                "Easy patient registration",
                "Convenient appointment access",
                "Personal healthcare management"
            ],
            bottom: "Your health journey starts here."
        }
    };

    const current = content[mode] || content.login;

    return (
        <div className="auth-layout">

            <PublicNavbar />

            <main className={`auth-main auth-mode-${mode}`}>

                {/* LEFT PROMOTIONAL PANEL */}

                <section className="auth-promo">

                    <div className="auth-promo-brand">

                        <div className="auth-promo-logo">
                            <HeartPulse size={30} />
                        </div>

                        <div>
                            <h2>HealthCare</h2>
                            <span>Hospital Management System</span>
                        </div>

                    </div>

                    <div className="auth-promo-content">

                        <span className="auth-promo-eyebrow">
                            <Activity size={15} />
                            {current.eyebrow}
                        </span>

                        <h1>{current.title}</h1>

                        <p>{current.description}</p>

                        <div className="auth-promo-features">

                            {current.features.map((feature, index) => (
                                <div key={index}>
                                    <CheckCircle size={20} />
                                    <span>{feature}</span>
                                </div>
                            ))}

                        </div>

                    </div>

                    <div className="auth-promo-bottom">

                        <ShieldCheck size={17} />

                        <span>{current.bottom}</span>

                    </div>

                    <div className="auth-promo-decoration">
                        <HeartPulse />
                    </div>

                </section>


                {/* RIGHT FORM PANEL */}

                <section className="auth-form-panel">

                    <div className="auth-form-content">
                        {children}
                    </div>

                </section>

            </main>

            {/* DEVELOPER CREDIT */}

            <footer className="auth-developer-footer">
                Project Developed by Manesh Vedpathak
            </footer>

        </div>
    );
}

export default AuthLayout;