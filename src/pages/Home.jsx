import React from 'react';
import { ArrowRight, Clock, HeartHandshake, BarChart3, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero section">
                <div className="container hero-container">
                    <div className="hero-content animate-fade-in-up">
                        <h1 className="hero-title">
                            <span className="text-primary">Smart Surplus</span><br />
                            Smart AI Solutions to Reduce Food Waste
                        </h1>
                        <p className="hero-description delay-100">
                            Transforming how restaurants, stores, and households manage food. Our AI predicts expiry dates, automates donations, and tracks your impact—saving money and the planet.
                        </p>
                        <div className="hero-actions delay-200">
                            <button className="btn btn-primary btn-large group">
                                Download App
                                <ArrowRight className="ml-2 icon-transition group-hover:translate-x-1" size={20} />
                            </button>
                            <Link to="/how-it-works" className="btn btn-outline btn-large">
                                See How It Works
                            </Link>
                        </div>

                        <div className="hero-stats delay-300">
                            <div className="stat-item">
                                <span className="stat-value">50K+</span>
                                <span className="stat-label">Meals Saved</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">98%</span>
                                <span className="stat-label">Prediction Accuracy</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">200+</span>
                                <span className="stat-label">NGO Partners</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-visual animate-fade-in-up delay-200">
                        <div className="app-mockup">
                            <div className="img-placeholder mockup-image">
                                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Fresh produce" className="cover-img" />
                                <div className="mockup-overlay">
                                    <div className="mockup-card glass-panel">
                                        <div className="flex-between">
                                            <div>
                                                <h4 className="card-title">Tomatoes (Organic)</h4>
                                                <p className="card-subtitle">Expires in 2 days</p>
                                            </div>
                                            <span className="status-badge warning">Consume Soon</span>
                                        </div>
                                        <button className="btn btn-primary btn-full mt-3">Match with NGO</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background elements */}
                        <div className="blob blob-1"></div>
                        <div className="blob blob-2"></div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section section-alt">
                <div className="container">
                    <div className="text-center section-header">
                        <h2 className="section-title">Why Choose Smart Surplus?</h2>
                        <p className="section-subtitle">Powerful features designed to make food management effortless and sustainable.</p>
                    </div>

                    <div className="grid md:grid-cols-3 features-grid">
                        {/* Feature 1 */}
                        <div className="feature-card animate-fade-in-up">
                            <div className="feature-icon-wrapper">
                                <Clock className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">AI Food Expiry Prediction</h3>
                            <p className="feature-desc">
                                Log your inventory and let our advanced AI models perfectly predict when food will spoil. Get timely alerts before it's too late.
                            </p>
                            <Link to="/how-it-works" className="feature-link group">
                                Learn more <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Feature 2 */}
                    
    <div className="feature-card animate-fade-in-up delay-100">
                            <div className="feature-icon-wrapper">
                                <HeartHandshake className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">Smart Donation Matching</h3>
                            <p className="feature-desc">
                                Got surplus? Our algorithm instantly connects you with nearby NGOs, food banks, or discounted buyers, facilitating quick transfers.
                            </p>
                            <Link to="/how-it-works" className="feature-link group">
                                Learn more <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                        {/* Feature 3 */}
                        <div className="feature-card animate-fade-in-up delay-200">
                            <div className="feature-icon-wrapper">
                                <BarChart3 className="feature-icon text-primary" size={32} />
                            </div>
                            <h3 className="feature-title">Waste Analytics Dashboard</h3>
                            <p className="feature-desc">
                                Track your financial savings and environmental impact. Visualize how much carbon footprint you've reduced over time.
                            </p>
                            <Link to="/how-it-works" className="feature-link group">
                                Learn more <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-banner text-center">
                        <h2 className="cta-title">Ready to join the Smart Surplus Movement?</h2>
                        <p className="cta-desc">Download the app today and take the first step towards a greener, more sustainable future.</p>
                        <div className="hero-actions justify-center">
                            <button className="btn btn-primary btn-large">Download for iOS</button>
                            <button className="btn btn-outline btn-large">Download for Android</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
