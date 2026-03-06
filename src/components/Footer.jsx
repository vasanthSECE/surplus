import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Twitter, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="navbar-logo footer-logo">
                            <Leaf className="logo-icon footer-icon" />
                            <span className="logo-text">Smart Surplus</span>
                        </Link>
                        <p className="footer-description">
                            Smart AI Solutions to Reduce Food Waste. Connect with us to build a sustainable future.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/how-it-works">How It Works</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-heading">Support</h4>
                        <ul>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/admin">Admin Demo</Link></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    <div className="footer-social">
                        <h4 className="footer-heading">Connect With Us</h4>
                        <div className="social-icons">
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                            <a href="#" className="social-link"><Facebook size={20} /></a>
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                            <a href="#" className="social-link"><Linkedin size={20} /></a>
                        </div>
                        <div className="footer-contact">
                            <Mail size={16} />
                            <a href="mailto:hello@smartsurplus.com">hello@smartsurplus.com</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Smart Surplus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
