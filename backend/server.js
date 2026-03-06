import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';
import Log from './models/Log.js';
import Inventory from './models/Inventory.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('MongoDB connection established successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

connectDB();

mongoose.connection.on('error', err => {
    console.error('MongoDB runtime error:', err);
});


// ================= AUTH ROUTES =================

// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { name, organization, email, password } = req.body;

        // Normalize email to lowercase for case-insensitive comparison
        const normalizedEmail = email.toLowerCase().trim();

        // Check existing user
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            organization,
            email: normalizedEmail,
            password
        });

        await user.save();

        // create log
        await Log.create({
            user: `${name} (${organization})`,
            action: 'Created new Admin account',
            status: 'Success'
        });

        res.status(201).json({
            message: 'User created successfully',
            userId: user._id
        });

    } catch (error) {

        console.error('SIGNUP ERROR:', error);

        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });

    }
});


// Login
app.post('/api/auth/login', async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log("LOGIN REQUEST:", email, password);

        // Normalize email to lowercase for case-insensitive comparison
        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({ email: normalizedEmail });

        console.log("USER FOUND:", user);

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        // plain text comparison
        if (user.password !== password) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        res.json({
            message: 'Login successful',
            userId: user._id,
            name: user.name,
            organization: user.organization
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: 'Error logging in'
        });

    }
});


// ================= LOG ROUTES =================

// ================= INVENTORY ROUTES =================

// Get all inventory items
app.get('/api/inventory', async (req, res) => {
    try {
        const items = await Inventory.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching inventory', error: err.message });
    }
});

// Add a new inventory item
app.post('/api/inventory', async (req, res) => {
    try {
        const { name, quantity, expiry, addedBy } = req.body;
        if (!name || quantity == null || !expiry) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const item = await Inventory.create({
            name,
            quantity,
            expiry: new Date(expiry),
            addedBy
        });

        // log the inventory action as well
        await Log.create({
            user: addedBy || 'unknown',
            action: `Added inventory item "${name}" (qty ${quantity}, exp ${new Date(expiry).toLocaleDateString()})`,
            status: 'Success'
        });

        res.status(201).json({ message: 'Inventory item added', item });
    } catch (err) {
        console.error('INVENTORY ADD ERROR:', err);
        res.status(500).json({ message: 'Error adding inventory item', error: err.message });
    }
});


// Get logs (optionally filtered)
app.get('/api/logs', async (req, res) => {

    try {
        const { type, search } = req.query;

        const filter = {};

        if (type === 'inventory') {
            // simple text match on action field
            filter.action = { $regex: /inventory/i };
        } else if (search) {
            filter.action = { $regex: search, $options: 'i' };
        }

        const logs = await Log.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(logs);

    } catch (error) {

        res.status(500).json({
            message: 'Error fetching logs',
            error: error.message
        });

    }

});


// Seed logs
app.post('/api/seed-logs', async (req, res) => {

    try {

        const count = await Log.countDocuments();

        if (count === 0) {

            const initialLogs = [

                {
                    user: "John Doe (Household)",
                    action: "Logged 5 new items to virtual fridge",
                    status: "Success"
                },
                {
                    user: "Green Earth Supermarket",
                    action: "Logged 120kg of apples to inventory via OCR",
                    status: "Success"
                },
                {
                    user: "City Food Bank",
                    action: "Accepted donation pick-up #DN-452",
                    status: "In Progress"
                },
                {
                    user: "Sarah Smith",
                    action: "Marked 'Milk' as consumed",
                    status: "Success"
                },
                {
                    user: "Fresh Bakery",
                    action: "Failed OCR scan for inventory upload",
                    status: "Failed"
                }

            ];

            await Log.insertMany(initialLogs);

            // also seed a few inventory items for demonstration
            await Inventory.insertMany([
                {
                    name: 'Organic Tomatoes',
                    quantity: 50,
                    expiry: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
                    addedBy: 'Seeder'
                },
                {
                    name: 'Whole Milk',
                    quantity: 20,
                    expiry: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
                    addedBy: 'Seeder'
                }
            ]);

            res.json({
                message: 'Database seeded with sample logs and inventory'
            });

        } else {

            res.json({
                message: 'Database already has logs'
            });

        }

    } catch (error) {

        res.status(500).json({
            message: 'Error seeding database'
        });

    }

});


// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});