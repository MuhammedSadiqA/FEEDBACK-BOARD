import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Admindashboard() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const navigate = useNavigate();

    // Check admin login
    useEffect(() => {
        const isLoggedIn = localStorage.getItem("adminLoggedIn");

        if (isLoggedIn !== "true") {
            navigate("/admin");
        }
    }, [navigate]);


    // Fetch feedback
    const fetchFeedbacks = async () => {
        try {
            setRefreshing(true);

            const response = await axios.get(
                "http://localhost:5000/api/feedback"
            );

            setFeedbacks(response.data);

        } catch (error) {
            console.error("Error fetching feedback:", error);

            toast.error(
                "Failed to load feedback."
            );

        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };


    useEffect(() => {
        fetchFeedbacks();
    }, []);


    // Logout
    const handleLogout = () => {
        localStorage.removeItem("adminLoggedIn");

        toast.success("Logged out successfully!");

        setTimeout(() => {
            navigate("/admin");
        }, 500);
    };


    // Delete feedback
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this feedback?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:5000/api/feedback/${id}`
            );

            setFeedbacks((currentFeedbacks) =>
                currentFeedbacks.filter(
                    (feedback) => feedback._id !== id
                )
            );

            toast.success(
                "Feedback deleted successfully!"
            );

        } catch (error) {

            console.error(
                "Error deleting feedback:",
                error
            );

            toast.error(
                "Failed to delete feedback."
            );
        }
    };


    // Format date
    const formatDate = (date) => {
        if (!date) return "Recently";

        return new Date(date).toLocaleString(
            "en-IN",
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        );
    };


    return (
        <div className="admin-dashboard-page min-vh-100">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar navbar-dark bg-dark shadow-sm">

                <div className="container py-2">

                    <span className="navbar-brand fw-bold fs-4">
                        Feedback
                        <span className="text-primary">
                            Board
                        </span>
                    </span>


                    <div className="d-flex align-items-center gap-3">

                        <span className="text-white-50 d-none d-md-block small">
                            Administrator
                        </span>

                        <button
                            className="btn btn-outline-light btn-sm dashboard-logout-btn"
                            onClick={handleLogout}
                        >
                            <span className="me-1">
                                ↪
                            </span>

                            Logout
                        </button>

                    </div>

                </div>

            </nav>


            {/* ================= MAIN ================= */}
            <main className="container dashboard-container">

                {/* Welcome */}
                <div className="dashboard-welcome">

                    <div>

                        <p className="text-primary fw-semibold mb-2">
                            ADMIN DASHBOARD
                        </p>

                        <h1 className="fw-bold mb-2">
                            Hello, Admin 👋
                        </h1>

                        <p className="text-muted mb-0">
                            Manage and review feedback submitted
                            by users.
                        </p>

                    </div>

                </div>


                {/* ================= STATISTICS ================= */}
                <div className="row g-3 dashboard-stats">

                    <div className="col-12 col-sm-6 col-lg-4">

                        <div className="card border-0 shadow-sm stat-card h-100">

                            <div className="card-body">

                                <div className="d-flex justify-content-between align-items-center">

                                    <div>

                                        <p className="text-muted mb-2">
                                            Total Feedback
                                        </p>

                                        <h2 className="fw-bold mb-0">
                                            {feedbacks.length}
                                        </h2>

                                    </div>


                                    <div className="stat-icon">
                                        💬
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= FEEDBACK ================= */}
                <div className="card border-0 shadow-sm feedback-panel">

                    {/* Panel Header */}
                    <div className="card-body feedback-panel-body">

                        <div className="feedback-panel-header">

                            <div>

                                <h3 className="fw-bold mb-1">
                                    Submitted Feedback
                                </h3>

                                <p className="text-muted mb-0">
                                    Review feedback received from users.
                                </p>

                            </div>


                            {/* Refresh */}
                            <button
                                type="button"
                                className="btn btn-light border refresh-btn"
                                onClick={fetchFeedbacks}
                                disabled={refreshing}
                                title="Refresh feedback"
                            >

                                <span
                                    className={
                                        refreshing
                                            ? "refresh-icon spinning"
                                            : "refresh-icon"
                                    }
                                >
                                    ↻
                                </span>

                                <span className="d-none d-sm-inline ms-2">
                                    Refresh
                                </span>

                            </button>

                        </div>


                        {/* ================= LOADING ================= */}
                        {loading && (

                            <div className="dashboard-empty-state">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="text-muted mt-3 mb-0">
                                    Loading feedback...
                                </p>

                            </div>

                        )}


                        {/* ================= EMPTY ================= */}
                        {!loading && feedbacks.length === 0 && (

                            <div className="dashboard-empty-state">

                                <div className="empty-icon">
                                    📭
                                </div>

                                <h5 className="fw-bold mt-3">
                                    No feedback yet
                                </h5>

                                <p className="text-muted mb-0">
                                    Submitted feedback will appear here.
                                </p>

                            </div>

                        )}


                        {/* ================= FEEDBACK LIST ================= */}
                        {!loading && feedbacks.length > 0 && (

                            <div className="row g-4 mt-1">

                                {feedbacks.map((feedback) => (

                                    <div
                                        className="col-12 col-md-6"
                                        key={feedback._id}
                                    >

                                        <div className="feedback-item-card">

                                            {/* Card Header */}
                                            <div className="d-flex justify-content-between align-items-start gap-3">

                                                <div className="d-flex align-items-center gap-3">

                                                    <div className="user-avatar">
                                                        {feedback.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase()}
                                                    </div>

                                                    <div>

                                                        <h5 className="fw-bold mb-1">
                                                            {feedback.name}
                                                        </h5>

                                                        <small className="text-muted">
                                                            {formatDate(
                                                                feedback.createdAt
                                                            )}
                                                        </small>

                                                    </div>

                                                </div>


                                                {/* Delete */}
                                                <button
                                                    type="button"
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            feedback._id
                                                        )
                                                    }
                                                    title="Delete feedback"
                                                    aria-label="Delete feedback"
                                                >
                                                    🗑️
                                                </button>

                                            </div>


                                            {/* Divider */}
                                            <div className="feedback-divider"></div>


                                            {/* Message */}
                                            <p className="feedback-message mb-0">
                                                {feedback.message}
                                            </p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </main>


            {/* ================= FOOTER ================= */}
            <footer className="dashboard-footer">

                <div className="container text-center">

                    <small className="text-muted">
                        © 2026 Feedback Board · Administration Portal
                    </small>

                </div>

            </footer>

        </div>
    );
}

export default Admindashboard;