import React from 'react';
import { Camera, BrainCircuit, Route, BarChart4 } from 'lucide-react';
import './HowItWorks.css';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            title: "Log Your Inventory",
            description: "Quickly upload your food inventory via API integration with your POS system or simply take photos. Our OCR instantly catalogs items and extracts existing expiry data.",
            icon: <Camera size={32} className="step-icon text-primary" />,
            delay: "delay-100"
        },
        {
            id: 2,
            title: "AI Analysis & Prediction",
            description: "Our proprietary machine learning models analyze the data against environmental factors to accurately predict exactly when each item will spoil. No more guesswork.",
            icon: <BrainCircuit size={32} className="step-icon text-primary" />,
            delay: "delay-200"
        },
        {
            id: 3,
            title: "Smart Matching & Dispatch",
            description: "Before items spoil, the system automatically suggests actions—whether it's applying a dynamic discount in-store or connecting instantly with nearby registered NGOs for pickup.",
            icon: <Route size={32} className="step-icon text-primary" />,
            delay: "delay-300"
        },
        {
            id: 4,
            title: "Track Impact & Savings",
            description: "Visualize your results in real-time. The dashboard tracks the financial value of food saved, meals donated, and your total CO2 emissions reduced.",
            icon: <BarChart4 size={32} className="step-icon text-primary" />,
            delay: "delay-400"
        }
    ];

    return (
        <div className="how-it-works-page">
            {/* Header */}
            <section className="page-header section-alt text-center animate-fade-in-up">
                <div className="container">
                    <h1 className="header-title">How It Works</h1>
                    <p className="header-subtitle">Four simple steps to transform your waste management process from a cost center into a sustainable advantage.</p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section section">
                <div className="container max-w-4xl mx-auto">
                    <div className="timeline">
                        {steps.map((step, index) => (
                            <div key={step.id} className={`timeline-item animate-fade-in-up ${step.delay}`}>
                                {/* Connector Line */}
                                {index !== steps.length - 1 && <div className="timeline-connector"></div>}

                                {/* Step Number Badge */}
                                <div className="timeline-number">{step.id}</div>

                                {/* Step Content */}
                                <div className="timeline-content">
                                    <div className="timeline-icon-wrapper">
                                        {step.icon}
                                    </div>
                                    <div className="timeline-text">
                                        <h3 className="timeline-title">{step.title}</h3>
                                        <p className="timeline-desc">{step.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Demo/Metrics Section */}
            <section className="demo-section section section-alt">
                <div className="container text-center">
                    <h2 className="section-title mb-8">Ready to see it in action?</h2>
                    <div className="demo-metrics grid md:grid-cols-2 gap-8 max-w-4xl mx-auto align-center">
                        <div className="metric-card bg-white p-6 rounded-lg shadow-sm text-center">
                            <h4 className="metric-title text-primary-dark text-xl font-semibold mb-2">For Businesses</h4>
                            <p className="metric-desc text-text-light mb-4">Integrate seamlessly with your existing systems and boost your bottom line.</p>
                            <button className="btn btn-primary">Request Demo</button>
                        </div>
                        <div className="metric-card bg-white p-6 rounded-lg shadow-sm text-center">
                            <h4 className="metric-title text-primary-dark text-xl font-semibold mb-2">For NGOs</h4>
                            <p className="metric-desc text-text-light mb-4">Join our network to receive high-quality surplus food from local businesses.</p>
                            <button className="btn btn-outline">Partner With Us</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWorks;
