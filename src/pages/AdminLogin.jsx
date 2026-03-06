import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import './AdminAuth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
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
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('adminUser', JSON.stringify({ userId: data.userId, name: data.name, organization: data.organization }));
            navigate('/admin/dashboard');
        } catch (err) {
            setErrorMsg(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page bg-bg-alt flex-center">
            <div className="auth-container animate-fade-in-up">
                <div className="auth-header text-center">
                    <Link to="/" className="auth-logo justify-center">
                        <Leaf className="logo-icon w-8 h-8" />
                        <span className="logo-text text-2xl">Smart Surplus</span>
                    </Link>
                    <h2 className="mt-6 text-2xl font-bold text-text-dark">Welcome Back</h2>
                    <p className="mt-2 text-text-light">Sign in to your admin dashboard</p>
                </div>

                <div className="auth-card bg-white mt-8">
                    {errorMsg && <div className="text-danger text-center mb-4 text-sm font-medium">{errorMsg}</div>}
                    <form onSubmit={handleSubmit} className="auth-form space-y-5">
                        <div className="form-group">
                            <label className="form-label">Email address</label>
                            <div className="input-with-icon">
                                <Mail className="input-icon" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input pl-10"
                                    placeholder="admin@smartsurplus.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="flex justify-between items-center mb-1">
                                <label className="form-label mb-0">Password</label>
                                <a href="#" className="forgot-password text-sm font-medium text-primary">Forgot password?</a>
                            </div>
                            <div className="input-with-icon">
                                <Lock className="input-icon" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    className="form-input pl-10"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input id="remember-me" type="checkbox" className="custom-checkbox h-4 w-4 text-primary rounded border-gray-300" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-dark">
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={`btn btn-primary w-full flex-center gap-2 ${isLoading ? 'opacity-70' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : (
                                <>Sign in <LogIn size={18} /></>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer text-center mt-6 pt-6 border-t border-border-color">
                        <p className="text-text-light text-sm">
                            Don't have an account?{' '}
                            <Link to="/admin/signup" className="font-semibold text-primary hover:text-primary-dark">
                                Create new account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
