import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Adminlogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            toast.error("Please enter your username and password.");
            return;
        }

        try {
            setIsLoggingIn(true);

            const response = await axios.post(
                "http://localhost:5000/api/admin/login",
                {
                    username: username.trim(),
                    password,
                }
            );

            localStorage.setItem("adminLoggedIn", "true");

            toast.success("Login successful!");

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 700);

        } catch (error) {
            console.error("Login error:", error);

            toast.error(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="admin-login-page min-vh-100">

            {/* Navbar */}
            <nav className="navbar bg-white border-bottom">
                <div className="container py-2">

                    <span
                        className="navbar-brand fw-bold fs-4"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Feedback
                        <span className="text-primary">
                            Board
                        </span>
                    </span>

                    <span className="text-muted small d-none d-sm-block">
                        Administration Portal
                    </span>

                </div>
            </nav>


            {/* Login Section */}
            <main className="admin-login-section">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

                            {/* Login Card */}
                            <div className="card border-0 shadow-lg admin-login-card">

                                <div className="card-body">

                                    {/* Icon */}
                                    <div className="admin-icon-wrapper mx-auto mb-4">
                                        🔐
                                    </div>


                                    {/* Heading */}
                                    <div className="text-center mb-4">

                                        <h2 className="fw-bold mb-2">
                                            Welcome Back
                                        </h2>

                                        <p className="text-muted mb-0">
                                            Sign in to access the admin dashboard.
                                        </p>

                                    </div>


                                    {/* Login Form */}
                                    <form onSubmit={handleLogin}>

                                        {/* Username */}
                                        <div className="mb-4">

                                            <label
                                                htmlFor="username"
                                                className="form-label fw-semibold"
                                            >
                                                Username
                                            </label>

                                            <input
                                                id="username"
                                                type="text"
                                                className="form-control form-control-lg admin-input"
                                                placeholder="Enter your username"
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                autoComplete="username"
                                                required
                                            />

                                        </div>


                                        {/* Password */}
                                        <div className="mb-4">

                                            <label
                                                htmlFor="password"
                                                className="form-label fw-semibold"
                                            >
                                                Password
                                            </label>

                                            <input
                                                id="password"
                                                type="password"
                                                className="form-control form-control-lg admin-input"
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                autoComplete="current-password"
                                                required
                                            />

                                        </div>


                                        {/* Login Button */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-100 fw-semibold admin-login-btn"
                                            disabled={isLoggingIn}
                                        >

                                            {isLoggingIn ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>

                                                    Signing in...
                                                </>
                                            ) : (
                                                <>
                                                    Sign In →
                                                </>
                                            )}

                                        </button>

                                    </form>


                                    {/* Security Message */}
                                    <div className="admin-security-note text-center">

                                        <small className="text-muted">
                                            🔒 Secure administrator access
                                        </small>

                                    </div>

                                </div>

                            </div>


                            {/* Back to Home */}
                            <div className="text-center mt-4">

                                <button
                                    type="button"
                                    className="btn btn-link text-decoration-none text-muted"
                                    onClick={() => navigate("/")}
                                >
                                    ← Back to Feedback Board
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>


            {/* Footer */}
            <footer className="border-top bg-white admin-footer">

                <div className="container text-center">

                    <small className="text-muted">
                        © 2026 Feedback Board · Admin Portal
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default Adminlogin;