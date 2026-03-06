import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar-container">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="navbar-logo">
            <Leaf className="logo-icon" />
            <span className="logo-text">Smart Surplus</span>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-links desktop">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <button className="btn btn-primary btn-sm">Download App</button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="container">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`mobile-nav-item ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button className="btn btn-primary mobile-btn">Download App</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
