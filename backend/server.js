const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/super', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Schemas
const StockSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    category: String
});

const SupplierSchema = new mongoose.Schema({
    supplierName: String,
    shopName: String,
    address: String,
    mobile: String,
    category: String // Adding category field to Supplier schema
});

const CustomerSchema = new mongoose.Schema({
    name: String,
    phone: String,
    dateVisited: { type: Date, default: Date.now }
});

const BillItemSchema = new mongoose.Schema({
    customerName: String,
    customerPhone: String,
    items: Array,
    date: { type: Date, default: Date.now }
});

const Stock = mongoose.model('Stock', StockSchema, 'stocks');
const Supplier = mongoose.model('Supplier', SupplierSchema, 'suppliers');
const Customer = mongoose.model('Customer', CustomerSchema);
const BillItem = mongoose.model('BillItem', BillItemSchema);

// Routes

// Get all categories of stocks
app.get('/get_categories', async (req, res) => {
    try {
        const categories = await Stock.distinct('category');
        res.json({ categories });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get stocks by category
app.get('/stocks/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const items = await Stock.find({ category }, 'name quantity');
        res.json({ items });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all suppliers and display as a table
app.get('/suppliers', async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.json({ suppliers });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get all customers (from BillItem collection)
app.get('/customers', async (req, res) => {
    try {
        const billItems = await BillItem.find();
        const customers = billItems.map(item => ({
            name: item.customerName,
            phone: item.customerPhone
        }));
        res.json({ customers });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Download (add new customer and bill item)
app.post('/download', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, phone, items } = req.body;

        // Step 1: Save new customer
        const newCustomer = new Customer({ name, phone });
        await newCustomer.save();

        // Step 2: Save new bill item
        const newBillItem = new BillItem({ customerName: name, customerPhone: phone, items });
        await newBillItem.save();

        // Step 3: Update stock quantities
        for (let item of items) {
            const { name, category, quantity } = item;
            await Stock.findOneAndUpdate(
                { name, category },
                { $inc: { quantity: -quantity } }, // Decrement quantity by item quantity
                { session }
            );
        }

        await session.commitTransaction();
        session.endSession();

        res.json({ success: true, message: 'Bill stored successfully' });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        res.status(500).send(error);
    }
});

// Get price for an item
app.get('/get_price', async (req, res) => {
    try {
        const { name, category } = req.query;
        const stockItem = await Stock.findOne({ name, category });
        if (stockItem) {
            res.json({ price: stockItem.price });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
