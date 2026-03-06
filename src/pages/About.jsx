import React from 'react';
import { Target, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page animate-fade-in-up">
            {/* Page Header */}
            <section className="page-header section-alt">
                <div className="container text-center">
                    <h1 className="header-title">About Smart Surplus</h1>
                    <p className="header-subtitle">Pioneering smart solutions for a sustainable future by eliminating food waste globally.</p>
                </div>
            </section>

            {/* The Problem & Solution */}
            <section className="problem-solution section">
                <div className="container">
                    <div className="grid md:grid-cols-2 align-center gap-4">
                        <div className="content-block">
                            <h2 className="section-title">The Problem</h2>
                            <p className="text-lg">
                                Every year, <strong>1.3 billion tons</strong> of food is wasted globally, contributing to 8% of total greenhouse gas emissions. For restaurants and grocery stores, this isn't just an environmental crisis—it's a massive financial loss.
                            </p>
                            <p className="text-lg mt-4">
                                Traditional inventory management relies on manual checks and guesswork, leading to perfectly good food ending up in landfills simply because it wasn't tracked properly.
                            </p>
                        </div>
                        <div className="image-block">
                            <div className="img-placeholder rounded-lg shadow-md aspect-video">
                                <img src="https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&q=80&w=800" alt="Food Waste Problem" />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 align-center gap-4 mt-8 reverse-mobile">
                        <div className="image-block">
                            <div className="img-placeholder rounded-lg shadow-md aspect-video">
                                <img src="https://annamrita.org/wp-content/uploads/2023/02/Everything-you-need-to-know-about-the-functions-of-a-food-NGO.jpg" alt="AI Solution" />
                            </div>
                        </div>
                        <div className="content-block pl-md-4">
                            <h2 className="section-title">Our AI Solution</h2>
                            <p className="text-lg">
                                Smart Surplus turns unstructured data into actionable intelligence. By integrating with your existing inventory systems, or simply snapping photos of your shelves, our AI automatically logs expiry dates.
                            </p>
                            <p className="text-lg mt-4">
                                Our predictive models alert you exactly when to discount items or match them with local NGOs before they spoil. We automate the entire lifecycle, ensuring zero waste and maximum efficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="mission section section-alt text-center">
                <div className="container">
                    <div className="mission-content max-w-3xl mx-auto">
                        <Target className="text-primary mx-auto mb-4" size={48} />
                        <h2 className="section-title">Our Mission</h2>
                        <blockquote className="mission-quote">
                            "To completely eliminate preventable food waste by empowering businesses and households with intelligent, accessible technology."
                        </blockquote>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us section">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">Why Choose Us?</h2>
                        <p className="section-subtitle">We go beyond simple inventory tracking to provide a holistic ecosystem.</p>
                    </div>

                    <div className="grid md:grid-cols-3 features-grid">
                        <div className="feature-card text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <Zap className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">Seamless Integration</h3>
                            <p className="feature-desc">
                                Works alongside your current POS and inventory systems without friction. Set up takes minutes, not weeks.
                            </p>
                        </div>

                        <div className="feature-card text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <HeartHandshake className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">Verified NGO Network</h3>
                            <p className="feature-desc">
                                We've partnered with over 200 legally registered charities and food banks to ensure your donations reach those in need securely.
                            </p>
                        </div>

                        <div className="feature-card text-center">
                            <div className="feature-icon-wrapper mx-auto">
                                <ShieldCheck className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">Compliance & Tax Ready</h3>
                            <p className="feature-desc">
                                Automatically generate reports detailing your donations and carbon offset for tax deductions and ESG compliance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
