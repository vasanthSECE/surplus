import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="contact-page animate-fade-in-up">
            {/* Header */}
            <section className="page-header section-alt text-center">
                <div className="container">
                    <h1 className="header-title">Get in Touch</h1>
                    <p className="header-subtitle">We're here to help you reduce food waste. Reach out with any questions or partnership inquiries.</p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="section">
                <div className="container max-w-5xl mx-auto">
                    <div className="contact-grid">

                        {/* Contact Info */}
                        <div className="contact-info bg-primary text-white p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <p className="opacity-90 mb-8">Fill up the form and our team will get back to you within 24 hours.</p>

                            <div className="info-items space-y-6">
                                <div className="info-item flex items-center gap-4">
                                    <Phone size={24} className="opacity-80" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="info-item flex items-center gap-4">
                                    <Mail size={24} className="opacity-80" />
                                    <span>hello@smartsurplus.com</span>
                                </div>
                                <div className="info-item flex items-center gap-4">
                                    <MapPin size={24} className="opacity-80" />
                                    <span>123 Green Way, San Francisco, CA 94107</span>
                                </div>
                            </div>

                            <div className="contact-social mt-12 pt-8 border-t border-white/20">
                                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="social-icon-btn"><Twitter size={20} /></a>
                                    <a href="#" className="social-icon-btn"><Facebook size={20} /></a>
                                    <a href="#" className="social-icon-btn"><Instagram size={20} /></a>
                                    <a href="https://www.linkedin.com/in/sowmiya-s-246534293" className="social-icon-btn"><Linkedin size={20} /></a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper p-8 bg-white rounded-lg shadow-md border border-gray-100">
                            {isSubmitted ? (
                                <div className="success-message text-center py-12">
                                    <div className="w-16 h-16 bg-green-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                    <p className="text-text-light">Thank you for reaching out. We'll be in touch shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Your Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-input"
                                                required
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                                required
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mb-6">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-input"
                                            required
                                            placeholder="How can we help?"
                                        />
                                    </div>

                                    <div className="form-group mb-6">
                                        <label htmlFor="message" className="form-label">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="form-textarea"
                                            required
                                            placeholder="Tell us more about your needs..."
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : (
                                            <>Send Message <Send size={18} /></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
