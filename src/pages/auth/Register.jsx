import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    User,
    Mail,
    Phone,
    MapPin,
    LockKeyhole,
    CalendarDays,
    HeartPulse
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/common/AuthLayout";
import "../../styles/auth.css";


function Register() {

    const navigate = useNavigate();

    const { register, loading } = useAuth();

    const [formData, setFormData] = useState({
        patientName: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        disease: "",
        loginEmail: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =========================================
    // INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };


    // =========================================
    // VALIDATION
    // =========================================

    const validateForm = () => {

        if (!formData.patientName.trim()) {
            return "Patient name is required.";
        }

        if (!formData.age) {
            return "Age is required.";
        }

        if (
            Number(formData.age) < 1 ||
            Number(formData.age) > 120
        ) {
            return "Age must be between 1 and 120.";
        }

        if (!formData.gender) {
            return "Gender is required.";
        }

        if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            return "Enter a valid 10-digit phone number.";
        }

        if (!formData.email.trim()) {
            return "Patient email is required.";
        }

        if (!formData.address.trim()) {
            return "Address is required.";
        }

        if (!formData.loginEmail.trim()) {
            return "Login email is required.";
        }

        if (!formData.password) {
            return "Password is required.";
        }

        if (formData.password.length < 6) {
            return "Password must be at least 6 characters.";
        }

        return null;
    };


    // =========================================
    // REGISTER
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        const patientData = {

            patientName: formData.patientName.trim(),

            age: Number(formData.age),

            gender: formData.gender,

            phone: formData.phone.trim(),

            email: formData.email.trim(),

            address: formData.address.trim(),

            disease: formData.disease.trim(),

            loginEmail: formData.loginEmail.trim(),

            password: formData.password

        };

        try {

            const result = await register(patientData);

            if (!result.success) {

                setError(
                    result.message ||
                    "Patient registration failed."
                );

                return;
            }

            setSuccess(
                result.message ||
                "Patient registration successful."
            );

            setTimeout(() => {

                navigate("/login", {
                    replace: true
                });

            }, 1500);

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to create account. Please try again."
            );

        }
    };


    return (

        <AuthLayout mode="register">

            <div className="auth-form-inner auth-register-inner">

                <div className="auth-mobile-logo">
                    <HeartPulse size={25} />
                    HealthCare
                </div>


                {/* HEADER */}

                <div className="auth-heading">

                    <span className="auth-heading-tag">
                        GET STARTED
                    </span>

                    <h2>Create your account</h2>

                    <p>
                        Enter your details to register as a patient.
                    </p>

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


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* PATIENT INFORMATION */}

                    <div className="auth-section-heading">
                        Patient Information
                    </div>


                    {/* NAME */}

                    <div className="auth-field">

                        <label>Patient full name *</label>

                        <div className="auth-input-wrapper">

                            <User size={18} />

                            <input
                                type="text"
                                name="patientName"
                                placeholder="Enter your full name"
                                value={formData.patientName}
                                onChange={handleChange}
                                autoComplete="name"
                            />

                        </div>

                    </div>


                    {/* AGE + GENDER */}

                    <div className="auth-register-grid">

                        <div className="auth-field">

                            <label>Age *</label>

                            <div className="auth-input-wrapper">

                                <CalendarDays size={18} />

                                <input
                                    type="number"
                                    name="age"
                                    min="1"
                                    max="120"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <div className="auth-field">

                            <label>Gender *</label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select gender
                                </option>

                                <option value="MALE">
                                    Male
                                </option>

                                <option value="FEMALE">
                                    Female
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* PHONE */}

                    <div className="auth-field">

                        <label>Mobile number *</label>

                        <div className="auth-input-wrapper">

                            <Phone size={18} />

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter 10-digit mobile number"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength={10}
                                autoComplete="tel"
                            />

                        </div>

                    </div>


                    {/* PATIENT EMAIL */}

                    <div className="auth-field">

                        <label>Patient email *</label>

                        <div className="auth-input-wrapper">

                            <Mail size={18} />

                            <input
                                type="email"
                                name="email"
                                placeholder="Enter patient email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />

                        </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="auth-field">

                        <label>Address *</label>

                        <div className="auth-input-wrapper auth-textarea-wrapper">

                            <MapPin size={18} />

                            <textarea
                                name="address"
                                rows="3"
                                placeholder="Enter your address"
                                value={formData.address}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    {/* DISEASE */}

                    <div className="auth-field">

                        <label>Medical condition (optional)</label>

                        <input
                            className="auth-standalone-input"
                            type="text"
                            name="disease"
                            placeholder="Enter disease, if applicable"
                            value={formData.disease}
                            onChange={handleChange}
                        />

                    </div>


                    {/* LOGIN INFORMATION */}

                    <div className="auth-section-heading">
                        Login Information
                    </div>


                    <div className="auth-field">

                        <label>Login email *</label>

                        <div className="auth-input-wrapper">

                            <Mail size={18} />

                            <input
                                type="email"
                                name="loginEmail"
                                placeholder="Enter login email"
                                value={formData.loginEmail}
                                onChange={handleChange}
                                autoComplete="username"
                            />

                        </div>

                        <span className="auth-field-hint">
                            Use this email when signing in.
                        </span>

                    </div>


                    {/* PASSWORD */}

                    <div className="auth-field">

                        <label>Password *</label>

                        <div className="auth-input-wrapper">

                            <LockKeyhole size={18} />

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="new-password"
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

                        <span className="auth-field-hint">
                            Password must contain at least 6 characters.
                        </span>

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating account..."
                            : "Create Patient Account"
                        }

                        {!loading && <ArrowRight size={19} />}

                    </button>

                </form>


                <div className="auth-switch-text">

                    Already have an account?

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </button>

                </div>


                <button
                    type="button"
                    className="auth-back-link"
                    onClick={() => navigate("/")}
                >

                    <ArrowLeft size={16} />
                    Back to home

                </button>


                <div className="auth-security-note">
                    <LockKeyhole size={14} />
                    Your information is protected by secure authentication.
                </div>

            </div>

        </AuthLayout>

    );
}

export default Register;