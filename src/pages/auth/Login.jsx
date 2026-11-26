import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ArrowLeft,
    HeartPulse
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import AuthLayout from "../../components/common/AuthLayout";
import "../../styles/auth.css";


function Login() {

    const navigate = useNavigate();

    const { login, loading } = useAuth();

    const [view, setView] = useState("login");

    const [formData, setFormData] = useState({
        loginEmail: "",
        password: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [resetEmail, setResetEmail] = useState("");
    const [resetToken, setResetToken] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };


    const getErrorMessage = (err, fallback) => {

        const data = err.response?.data;

        if (typeof data === "string") {
            return data;
        }

        return data?.message || fallback;
    };


    // =========================================
    // LOGIN
    // =========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.loginEmail.trim()) {
            setError("Email is required.");
            return;
        }

        if (!formData.password) {
            setError("Password is required.");
            return;
        }

        const result = await login(
            formData.loginEmail.trim(),
            formData.password
        );

        if (!result.success) {
            setError(
                result.message || "Invalid email or password."
            );
            return;
        }

        const role = String(
            result.user?.role || ""
        ).toUpperCase();

        if (role === "ADMIN") {
            navigate("/admin/dashboard", { replace: true });
        } else if (role === "DOCTOR") {
            navigate("/doctor/dashboard", { replace: true });
        } else if (role === "PATIENT") {
            navigate("/patient/dashboard", { replace: true });
        } else {
            setError("User role is not configured.");
        }
    };


    // =========================================
    // SHOW FORGOT PASSWORD IN SAME PAGE
    // =========================================

    const openForgotPassword = () => {

        setError("");
        setSuccess("");

        setResetEmail(formData.loginEmail);

        setView("forgot");
    };


    // =========================================
    // VERIFY EMAIL
    // =========================================

    const handleForgotPassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!resetEmail.trim()) {
            setError("Email is required.");
            return;
        }

        try {

            setActionLoading(true);

            const response = await api.post(
                "/auth/forgot-password",
                {
                    loginEmail: resetEmail.trim()
                }
            );

            let token = "";

            if (typeof response.data === "string") {
                token = response.data;
            } else {
                token = response.data?.token || "";
            }

            if (!token) {
                setError(
                    "Unable to create password reset session."
                );
                return;
            }

            setResetEmail(resetEmail.trim());
            setResetToken(token);

            setSuccess("Email verified successfully.");

            setView("reset");

        } catch (err) {

            setError(
                getErrorMessage(
                    err,
                    "Unable to verify email. Please try again."
                )
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================
    // RESET PASSWORD
    // =========================================

    const handleResetPassword = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!resetEmail || !resetToken) {
            setError(
                "Password reset session expired. Please start again."
            );
            return;
        }

        if (!formData.newPassword) {
            setError("New password is required.");
            return;
        }

        if (formData.newPassword.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        if (!formData.confirmPassword) {
            setError("Please confirm your password.");
            return;
        }

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setActionLoading(true);

            const response = await api.post(
                "/auth/reset-password",
                {
                    loginEmail: resetEmail,
                    token: resetToken,
                    newPassword: formData.newPassword
                }
            );

            setSuccess(
                typeof response.data === "string"
                    ? response.data
                    : response.data?.message ||
                      "Password updated successfully."
            );

            setResetToken("");

            setFormData(previous => ({
                ...previous,
                password: "",
                newPassword: "",
                confirmPassword: ""
            }));

            setTimeout(() => {

                setView("login");

                setResetEmail("");
                setSuccess("");

            }, 1500);

        } catch (err) {

            setError(
                getErrorMessage(
                    err,
                    "Unable to reset password. Please try again."
                )
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================
    // BACK TO LOGIN
    // =========================================

    const backToLogin = () => {

        setView("login");

        setError("");
        setSuccess("");

        setResetToken("");
        setResetEmail("");

        setFormData(previous => ({
            ...previous,
            newPassword: "",
            confirmPassword: ""
        }));
    };


    // =========================================
    // LOGIN VIEW
    // =========================================

    const renderLogin = () => (

        <>

            <div className="auth-heading">

                <span className="auth-heading-tag">
                    YOUR ACCOUNT
                </span>

                <h2>Welcome back!</h2>

                <p>
                    Enter your details to sign in to your account.
                </p>

            </div>


            <form onSubmit={handleLogin} className="auth-form">

                <div className="auth-field">

                    <label>Email address</label>

                    <div className="auth-input-wrapper">

                        <Mail size={19} />

                        <input
                            type="email"
                            name="loginEmail"
                            placeholder="you@example.com"
                            value={formData.loginEmail}
                            onChange={handleChange}
                            autoComplete="email"
                        />

                    </div>

                </div>


                <div className="auth-field">

                    <div className="auth-label-row">

                        <label>Password</label>

                        <button
                            type="button"
                            className="auth-text-link"
                            onClick={openForgotPassword}
                        >
                            Forgot Password?
                        </button>

                    </div>

                    <div className="auth-input-wrapper">

                        <LockKeyhole size={19} />

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            className="auth-eye-button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }
                        </button>

                    </div>

                </div>


                {error && (
                    <div className="auth-alert auth-alert-error">
                        {error}
                    </div>
                )}


                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign In"}

                    {!loading && <ArrowRight size={19} />}
                </button>

            </form>


            <div className="auth-switch-text">

                Don't have an account?

                <button
                    type="button"
                    onClick={() => navigate("/register")}
                >
                    Create account
                </button>

            </div>


            <button
                type="button"
                className="auth-back-home"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={16} />
                Back to home
            </button>


            <div className="auth-security-note">
                <LockKeyhole size={14} />
                Your account is protected by secure authentication.
            </div>

        </>
    );


    // =========================================
    // FORGOT PASSWORD VIEW
    // =========================================

    const renderForgot = () => (

        <>

            <div className="auth-heading">

                <span className="auth-heading-tag">
                    ACCOUNT RECOVERY
                </span>

                <h2>Forgot Password?</h2>

                <p>
                    Enter the email address associated with your hospital account.
                </p>

            </div>


            <form
                onSubmit={handleForgotPassword}
                className="auth-form"
            >

                <div className="auth-field">

                    <label>Email address</label>

                    <div className="auth-input-wrapper">

                        <Mail size={19} />

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={resetEmail}
                            onChange={(e) => {
                                setResetEmail(e.target.value);
                                setError("");
                                setSuccess("");
                            }}
                            autoComplete="email"
                        />

                    </div>

                </div>


                {error && (
                    <div className="auth-alert auth-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="auth-alert auth-alert-success">
                        {success}
                    </div>
                )}


                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={actionLoading}
                >
                    {actionLoading ? "Verifying..." : "Continue"}

                    {!actionLoading && <ArrowRight size={19} />}
                </button>

            </form>


            <button
                type="button"
                className="auth-back-link"
                onClick={backToLogin}
            >
                <ArrowLeft size={16} />
                Back to Login
            </button>


            <div className="auth-security-note">
                <LockKeyhole size={14} />
                Your account is protected by secure authentication.
            </div>

        </>
    );


    // =========================================
    // RESET PASSWORD VIEW
    // =========================================

    const renderReset = () => (

        <>

            <div className="auth-heading">

                <span className="auth-heading-tag">
                    ACCOUNT RECOVERY
                </span>

                <h2>Reset Password</h2>

                <p>
                    Create a new password for your account.
                </p>

            </div>


            <div className="auth-verified-email">
                <Mail size={17} />
                <span>{resetEmail}</span>
            </div>


            <form
                onSubmit={handleResetPassword}
                className="auth-form"
            >

                <div className="auth-field">

                    <label>New password</label>

                    <div className="auth-input-wrapper">

                        <LockKeyhole size={19} />

                        <input
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            placeholder="At least 6 characters"
                            value={formData.newPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            className="auth-eye-button"
                            onClick={() =>
                                setShowNewPassword(!showNewPassword)
                            }
                        >
                            {showNewPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }
                        </button>

                    </div>

                </div>


                <div className="auth-field">

                    <label>Confirm new password</label>

                    <div className="auth-input-wrapper">

                        <LockKeyhole size={19} />

                        <input
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            name="confirmPassword"
                            placeholder="Re-enter your new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                        <button
                            type="button"
                            className="auth-eye-button"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword
                                ? <EyeOff size={19} />
                                : <Eye size={19} />
                            }
                        </button>

                    </div>

                </div>


                {error && (
                    <div className="auth-alert auth-alert-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="auth-alert auth-alert-success">
                        {success}
                    </div>
                )}


                <button
                    type="submit"
                    className="auth-submit-button"
                    disabled={actionLoading}
                >
                    {actionLoading
                        ? "Updating..."
                        : "Reset Password"
                    }

                    {!actionLoading && <ArrowRight size={19} />}
                </button>

            </form>


            <button
                type="button"
                className="auth-back-link"
                onClick={backToLogin}
            >
                <ArrowLeft size={16} />
                Back to Login
            </button>


            <div className="auth-security-note">
                <LockKeyhole size={14} />
                Your account is protected by secure authentication.
            </div>

        </>
    );


    return (

        <AuthLayout mode={view}>

            <div className="auth-form-inner">

                <div className="auth-mobile-logo">
                    <HeartPulse size={25} />
                    HealthCare
                </div>

                {view === "login" && renderLogin()}

                {view === "forgot" && renderForgot()}

                {view === "reset" && renderReset()}

            </div>

        </AuthLayout>

    );
}

export default Login;