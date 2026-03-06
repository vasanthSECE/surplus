import React, { useState } from 'react';
import {
    LayoutDashboard,
    Package,
    HeartHandshake,
    TrendingUp,
    Settings,
    Bell,
    Search,
    MoreVertical,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Users
} from 'lucide-react';
import './Admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Admin = () => {
    const [activeTab, setActiveTab] = useState('user-logs');
    const [endUserLogs, setEndUserLogs] = useState([]);
    const [inventoryLogs, setInventoryLogs] = useState([]);
    // start with some placeholder/demo rows so Overview isn't empty
    const [inventoryItems, setInventoryItems] = useState([
        { id: "INV-DEMO-001", name: "Demo Tomatoes", category: "Produce", expiry: "3 Days", status: "Warning" },
        { id: "INV-DEMO-002", name: "Demo Milk", category: "Dairy", expiry: "1 Day", status: "Critical" },
        { id: "INV-DEMO-003", name: "Demo Bread", category: "Bakery", expiry: "Today", status: "Expiring Today" }
    ]);
    const [newItem, setNewItem] = useState({ name: '', quantity: '', expiry: '' });
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);

    // User state
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{"name": "Admin User", "organization": "Platform"}');

    // Fetch real logs from db
    React.useEffect(() => {
        if (activeTab === 'user-logs') {
            fetchLogs();
        } else if (activeTab === 'inventory') {
            fetchInventoryLogs();
            fetchInventoryItems();
        } else if (activeTab === 'overview') {
            // show real inventory if available (overwrites demo)
            fetchInventoryItems();
        }
    }, [activeTab]);

    const fetchLogs = async () => {
        setIsLoadingLogs(true);
        try {
            const resp = await fetch(`${API_URL}/api/logs`);
            if (resp.ok) {
                const data = await resp.json();
                setEndUserLogs(data);
            }
        } catch (err) {
            console.error('Error fetching logs:', err);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const fetchInventoryItems = async () => {
        try {
            const resp = await fetch(`${API_URL}/api/inventory`);
            if (resp.ok) {
                const data = await resp.json();
                // only replace demo rows when we actually received something
                if (Array.isArray(data) && data.length > 0) {
                    setInventoryItems(data);
                }
            }
        } catch (err) {
            console.error('Error fetching inventory items:', err);
        }
    };

    const handleAddInventory = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(`${API_URL}/api/inventory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newItem,
                    addedBy: adminUser.name
                })
            });
            if (resp.ok) {
                setNewItem({ name: '', quantity: '', expiry: '' });
                fetchInventoryItems();
                fetchInventoryLogs();
            } else {
                console.error('Error adding inventory', await resp.text());
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchInventoryLogs = async () => {
        setIsLoadingLogs(true);
        try {
            const resp = await fetch(`${API_URL}/api/logs?type=inventory`);
            if (resp.ok) {
                const data = await resp.json();
                setInventoryLogs(data);
            }
        } catch (err) {
            console.error('Error fetching inventory logs:', err);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminUser');
        window.location.href = '/admin/login';
    };

    // Mock data for the rest of the dashboard
    const stats = [
        { title: "Total Items Logged", value: "2,450", change: "+12%", type: "positive" },
        { title: "Items Expiring Soon", value: "32", change: "-5%", type: "positive" },
        { title: "Meals Donated", value: "840", change: "+24%", type: "positive" },
        { title: "CO2 Saved (kg)", value: "1,250", change: "+18%", type: "positive" }
    ];

    const recentUpdates = [
        { id: 1, action: "System predicted 15 items expiring in 48h", time: "10 mins ago", icon: <AlertTriangle size={16} className="text-warning" /> },
        { id: 2, action: "Successfully matched 50kg produce with City Food Bank", time: "2 hours ago", icon: <CheckCircle2 size={16} className="text-success" /> },
        { id: 3, action: "Store manager uploaded new inventory via OCR", time: "5 hours ago", icon: <Package size={16} className="text-primary" /> },
        { id: 4, action: "Weekly analytics report generated", time: "1 day ago", icon: <TrendingUp size={16} className="text-text-light" /> },
    ];


    return (
        <div className="admin-page bg-bg-alt min-h-screen">
            {/* Top Navigation */}
            <div className="admin-topbar">
                <div className="container-fluid flex justify-between items-center h-16">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-text-dark">Smart Surplus</h2>
                        <span className="badge-primary">Live App Data</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="search-bar hidden md:flex">
                            <Search size={18} className="text-text-light" />
                            <input type="text" placeholder="Search inventory, NGOs..." />
                        </div>
                        <button className="icon-btn relative">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile" onClick={handleLogout} title="Click to logout">
                            <div className="avatar">{adminUser.name.charAt(0).toUpperCase()}</div>
                            <span className="hidden md:block font-medium">{adminUser.name}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid admin-layout">
                {/* Sidebar */}
                <aside className="admin-sidebar hidden lg:block animate-fade-in-up">
                    <nav className="sidebar-nav">
                        <button
                            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            <LayoutDashboard size={20} />
                            <span>Overview</span>
                        </button>
                        <button
                            className={`nav-link ${activeTab === 'user-logs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('user-logs')}
                        >
                            <Users size={20} />
                            <span>End User Logs</span>
                        </button>
                        <button
                            className={`nav-link ${activeTab === 'inventory' ? 'active' : ''}`}
                            onClick={() => setActiveTab('inventory')}
                        >
                            <Package size={20} />
                            <span>Inventory Logs</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="admin-content animate-fade-in-up delay-100">
                    <div className="dashboard-header mb-8">
                        <h1 className="text-2xl font-bold">
                            {activeTab === 'overview' && `Welcome, ${adminUser.name.split(' ')[0]}`}
                            {activeTab === 'user-logs' && 'End User Activity Logs'}
                            {activeTab === 'inventory' && 'Inventory Logs'}
                            {activeTab !== 'overview' && activeTab !== 'user-logs' && activeTab !== 'inventory' && 'Module Overview'}
                        </h1>
                        <p className="text-text-light">
                            {activeTab === 'overview' && "Here's what's happening with your inventory today."}
                            {activeTab === 'user-logs' && "Real-time activity logs from all app end-users across the platform."}
                            {activeTab === 'inventory' && "Actions related to inventory management (uploads, edits, OCR scans etc.)."}
                        </p>
                    </div>

                    {activeTab === 'overview' ? (
                        <>
                            {/* Stats Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, index) => (
                                    <div key={index} className="stat-card">
                                        <h4 className="stat-card-title">{stat.title}</h4>
                                        <div className="flex items-end justify-between mt-2">
                                            <span className="stat-card-value">{stat.value}</span>
                                            <span className={`stat-card-change ${stat.type === 'positive' ? 'text-success' : 'text-danger'}`}>
                                                {stat.change}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Inventory Table */}
                                <div className="lg:col-span-2 admin-panel">
                                    <div className="panel-header">
                                        <h3 className="panel-title">AI Expiry Watchlist</h3>
                                        <button className="btn btn-outline btn-sm">View All</button>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Item Name</th>
                                                    <th>Category</th>
                                                    <th>Predicted Expiry</th>
                                                    <th>Status Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {inventoryItems.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className="text-text-light font-medium">{item.id}</td>
                                                        <td className="font-semibold">{item.name}</td>
                                                        <td><span className="category-badge">{item.category || '-'}</span></td>
                                                        <td>
                                                            <div className="flex items-center gap-2">
                                                                <Clock size={14} className="text-text-light" />
                                                                <span>{item.expiry}</span>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className={`status-pill ${((item.status||'').toLowerCase().replace(' ', '-'))}`}>
                                                                {item.status || '–'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Live Feed */}
                                <div className="admin-panel">
                                    <div className="panel-header">
                                        <h3 className="panel-title">Real-time App Updates</h3>
                                        <button className="icon-btn"><MoreVertical size={18} /></button>
                                    </div>
                                    <div className="feed-list">
                                        {recentUpdates.map((update) => (
                                            <div key={update.id} className="feed-item">
                                                <div className="feed-icon-container">
                                                    {update.icon}
                                                    <div className="feed-line"></div>
                                                </div>
                                                <div className="feed-content">
                                                    <p className="feed-action">{update.action}</p>
                                                    <span className="feed-time">{update.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="btn btn-outline w-full mt-4">View Full Log</button>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'user-logs' ? (
                        <div className="admin-panel animate-fade-in-up">
                            <div className="panel-header flex justify-between items-center">
                                <h3 className="panel-title">All End User Logs</h3>
                                <div className="flex gap-2">
                                    <button className="btn btn-outline btn-sm" onClick={fetchLogs}>Refresh Logs</button>
                                    <button className="btn btn-primary btn-sm">Filter Data</button>
                                </div>
                            </div>
                            <div className="table-responsive p-2">
                                {isLoadingLogs ? (
                                    <div className="text-center py-12 text-text-light">Fetching logs from database...</div>
                                ) : endUserLogs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-text-light mb-4">No end user logs found.</p>
                                        <button className="btn btn-outline btn-sm" onClick={() => fetch(`${API_URL}/api/seed-logs`, { method: 'POST' }).then(fetchLogs)}>Seed Demo Data</button>
                                    </div>
                                ) : (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Log ID</th>
                                                <th>User / Entity</th>
                                                <th>Activity / Action</th>
                                                <th>Timestamp</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {endUserLogs.map((log) => (
                                                <tr key={log._id}>
                                                    <td className="text-text-light font-medium text-xs">...{log._id.slice(-6)}</td>
                                                    <td className="font-semibold text-primary-dark">{log.user}</td>
                                                    <td>{log.action}</td>
                                                    <td className="text-text-light text-sm">{new Date(log.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <span className={`status-pill ${log.status.toLowerCase().replace(' ', '-')}`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                     ) : activeTab === 'inventory' ? (
                        <div className="admin-panel animate-fade-in-up">
                            <div className="panel-header flex justify-between items-center">
                                <h3 className="panel-title">Inventory Management</h3>
                                <div className="flex gap-2">
                                    <button className="btn btn-outline btn-sm" onClick={fetchInventoryItems}>Refresh Items</button>
                                    <button className="btn btn-outline btn-sm" onClick={fetchInventoryLogs}>Refresh Logs</button>
                                </div>
                            </div>

                            {/* add new item form */}
                            <div className="p-4 border-b border-gray-200">
                                <h4 className="font-semibold mb-2">Add New Item</h4>
                                <form className="flex flex-wrap gap-2 items-end" onSubmit={handleAddInventory}>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Item name"
                                        value={newItem.name}
                                        onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                                        className="input input-sm"
                                    />
                                    <input
                                        required
                                        type="number"
                                        min="0"
                                        placeholder="Quantity"
                                        value={newItem.quantity}
                                        onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                                        className="input input-sm w-24"
                                    />
                                    <input
                                        required
                                        type="date"
                                        placeholder="Expiry"
                                        value={newItem.expiry}
                                        onChange={e => setNewItem({ ...newItem, expiry: e.target.value })}
                                        className="input input-sm"
                                    />
                                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                                </form>
                            </div>

                            {/* inventory item table */}
                            <div className="table-responsive p-2">
                                {inventoryItems.length === 0 ? (
                                    <div className="text-center py-12 text-text-light">No inventory items.</div>
                                ) : (
                                    <table className="admin-table mb-6">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Qty</th>
                                                <th>Expiry</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryItems.map(item => (
                                                <tr key={item._id}>
                                                    <td className="text-text-light font-medium text-xs">...{item._id.slice(-6)}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{new Date(item.expiry).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* inventory logs below items */}
                            <div className="table-responsive p-2">
                                {isLoadingLogs ? (
                                    <div className="text-center py-12 text-text-light">Fetching inventory logs...</div>
                                ) : inventoryLogs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-text-light mb-4">No inventory logs found.</p>
                                        <button className="btn btn-outline btn-sm" onClick={() => fetch(`${API_URL}/api/seed-logs`, { method: 'POST' }).then(fetchInventoryLogs)}>Seed Demo Data</button>
                                    </div>
                                ) : (
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Log ID</th>
                                                <th>User / Entity</th>
                                                <th>Activity / Action</th>
                                                <th>Timestamp</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inventoryLogs.map((log) => (
                                                <tr key={log._id}>
                                                    <td className="text-text-light font-medium text-xs">...{log._id.slice(-6)}</td>
                                                    <td className="font-semibold text-primary-dark">{log.user}</td>
                                                    <td>{log.action}</td>
                                                    <td className="text-text-light text-sm">{new Date(log.createdAt).toLocaleString()}</td>
                                                    <td>
                                                        <span className={`status-pill ${log.status.toLowerCase().replace(' ', '-')}`}>
                                                            {log.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="admin-panel p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                            <Package size={64} className="text-text-light opacity-30 mb-6" />
                            <h3 className="text-2xl font-semibold mb-2 capitalize">{activeTab.replace('-', ' ')}</h3>
                            <p className="text-text-light max-w-md mx-auto">This module is part of the comprehensive ZeroWaste OS suite. Detailed views and analytics will populate here based on live data.</p>
                            <button
                                className="btn btn-primary mt-8"
                                onClick={() => setActiveTab('user-logs')}
                            >
                                Return to Logs
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Admin;
