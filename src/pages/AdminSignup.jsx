import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, User, Building, ArrowRight } from 'lucide-react';
import './AdminAuth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            const response = await fetch(`${API_URL}/api/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            // Store user info
            localStorage.setItem('adminUser', JSON.stringify({ userId: data.userId, name: formData.name, organization: formData.organization }));
            navigate('/admin/dashboard');
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page bg-bg-alt flex-center py-12">
            <div className="auth-container animate-fade-in-up">
                <div className="auth-header text-center">
                    <Link to="/" className="auth-logo justify-center">
                        <Leaf className="logo-icon w-8 h-8" />
                        <span className="logo-text text-2xl">Smart Surplus</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-text-dark">Create an Account</h2>
                    <p className="mt-2 text-text-light">Start managing your food inventory sustainably</p>
                </div>

                <div className="auth-card bg-white mt-8">
                    {errorMsg && <div className="text-danger text-center mb-4 text-sm font-medium">{errorMsg}</div>}
                    <form onSubmit={handleSubmit} className="auth-form space-y-5">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <div className="input-with-icon">
                                <User className="input-icon" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input pl-10"
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Organization Name</label>
                            <div className="input-with-icon">
                                <Building className="input-icon" size={20} />
                                <input
                                    type="text"
                                    name="organization"
                                    className="form-input pl-10"
                                    placeholder="Green Earth Supermarket"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Work Email</label>
                            <div className="input-with-icon">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input pl-10"
                                    placeholder="jane@greenearth.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-with-icon">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input pl-10"
                                    placeholder="Create a strong password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength="8"
                                />
                            </div>
                            <p className="mt-1 text-xs text-text-light">Must be at least 8 characters long</p>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full flex-center gap-2 mt-6 ${isLoading ? 'opacity-70' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating account...' : (
                                <>Sign Up <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer text-center mt-6 pt-6 border-t border-border-color">
                        <p className="text-text-light text-sm">
                            Already have an account?{' '}
                            <Link to="/admin/login" className="font-semibold text-primary hover:text-primary-dark">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSignup;
