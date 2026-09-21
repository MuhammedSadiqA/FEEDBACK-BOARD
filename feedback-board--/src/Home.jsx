import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Home() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim() || !message.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        try {
            setIsSubmitting(true);

            // Send feedback to backend
            await axios.post(
                "http://localhost:5000/api/feedback",
                {
                    name: name.trim(),
                    message: message.trim(),
                }
            );

            // Success notification
            toast.success("Feedback submitted successfully!");

            // Clear form
            setName("");
            setMessage("");

        } catch (error) {
            console.error("Feedback submission error:", error);

            toast.error(
                "Something went wrong. Please try again."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-light min-vh-100">

            {/* ================= NAVBAR ================= */}
            <nav className="navbar bg-white border-bottom">

                <div className="container navbar-container py-2">

                    <span className="navbar-brand fw-bold fs-4 mb-0">
                        Feedback
                        <span className="text-primary">
                            Board
                        </span>
                    </span>

                    <span className="text-muted small d-none d-sm-block">
                        Your voice matters
                    </span>

                </div>

            </nav>


            {/* ================= HERO SECTION ================= */}
            <section className="hero-section">

                <div className="container">

                    <div className="row justify-content-center text-center">

                        <div className="col-12 col-lg-9 col-xl-8">

                            {/* Badge */}
                            <div
                                className="
                                    d-inline-flex
                                    align-items-center
                                    gap-2
                                    bg-white
                                    border
                                    rounded-pill
                                    hero-badge
                                    shadow-sm
                                "
                            >
                                <span>
                                    💬
                                </span>

                                <small className="fw-semibold text-secondary">
                                    We want to hear from you
                                </small>
                            </div>


                            {/* Heading */}
                            <h1 className="hero-title fw-bold">

                                Your Feedback
                                <br />

                                <span className="text-primary">
                                    Makes Us Better.
                                </span>

                            </h1>


                            {/* Description */}
                            <p className="hero-description lead text-secondary mx-auto mb-0">

                                Have a suggestion, idea, or experience
                                to share? Tell us what you think.
                                Your feedback helps us improve and
                                create a better experience for everyone.

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEEDBACK FORM ================= */}
            <section className="feedback-section">

                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">

                            <div className="card border-0 shadow-lg feedback-card">

                                <div className="card-body feedback-card-body">

                                    {/* Form Header */}
                                    <div className="text-center feedback-header">

                                        <div className="feedback-icon">
                                            📝
                                        </div>

                                        <h3 className="fw-bold mb-2">
                                            Share Your Thoughts
                                        </h3>

                                        <p className="text-muted mb-0">
                                            It only takes a minute.
                                        </p>

                                    </div>


                                    {/* ================= FORM ================= */}
                                    <form onSubmit={handleSubmit}>

                                        {/* Name */}
                                        <div className="mb-4">

                                            <label
                                                htmlFor="name"
                                                className="form-label fw-semibold"
                                            >
                                                Your Name
                                            </label>

                                            <input
                                                id="name"
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter your name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                required
                                            />

                                        </div>


                                        {/* Feedback */}
                                        <div className="mb-4">

                                            <label
                                                htmlFor="message"
                                                className="form-label fw-semibold"
                                            >
                                                Your Feedback
                                            </label>

                                            <textarea
                                                id="message"
                                                className="form-control"
                                                rows="6"
                                                placeholder="Tell us what you think..."
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                                required
                                            ></textarea>

                                            <div className="form-text">
                                                Be honest — constructive
                                                feedback helps us improve.
                                            </div>

                                        </div>


                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="
                                                btn
                                                btn-primary
                                                w-100
                                                fw-semibold
                                                submit-btn
                                            "
                                            disabled={isSubmitting}
                                        >

                                            {isSubmitting ? (
                                                <>
                                                    <span
                                                        className="
                                                            spinner-border
                                                            spinner-border-sm
                                                            me-2
                                                        "
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>

                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Feedback →
                                                </>
                                            )}

                                        </button>

                                    </form>

                                </div>

                            </div>


                            {/* Privacy Note */}
                            <div className="text-center privacy-note">

                                <small className="text-muted">
                                    🔒 Your feedback is securely submitted
                                    and reviewed by the administration.
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FOOTER ================= */}
            <footer className="border-top bg-white footer">

                <div className="container text-center">

                    <p className="text-muted small mb-0">
                        © 2026 Feedback Board · Built to listen and improve.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default Home;