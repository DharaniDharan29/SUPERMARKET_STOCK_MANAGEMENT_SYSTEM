const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/super';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Stock Schema
const StockSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    category: String
});

const Stock = mongoose.model('Stock', StockSchema);

const products = [
    { name: 'Orange', quantity: 100, price: 0.6, category: 'Fruits' },
    { name: 'Strawberry', quantity: 150, price: 0.8, category: 'Fruits' },
    { name: 'Cucumber', quantity: 180, price: 0.3, category: 'Vegetables' },
    { name: 'Bell Pepper', quantity: 90, price: 1.2, category: 'Vegetables' },
    { name: 'Tomato', quantity: 160, price: 0.4, category: 'Vegetables' },
    { name: 'Pork Chops', quantity: 55, price: 4.0, category: 'Meat' },
    { name: 'Lamb Leg', quantity: 35, price: 7.0, category: 'Meat' },
    { name: 'Tuna', quantity: 45, price: 9.0, category: 'Fish' },
    { name: 'Lobster', quantity: 25, price: 15.0, category: 'Fish' },
    { name: 'Butter', quantity: 95, price: 1.8, category: 'Dairy' },
    { name: 'Ice Cream', quantity: 85, price: 3.5, category: 'Dairy' },
    { name: 'Walnuts', quantity: 65, price: 10.0, category: 'Nuts' },
    { name: 'Cashews', quantity: 90, price: 9.0, category: 'Nuts' },
    { name: 'Muffin', quantity: 70, price: 2.2, category: 'Bakery' },
    { name: 'Bagel', quantity: 80, price: 1.7, category: 'Bakery' },
    { name: 'Popcorn', quantity: 110, price: 1.5, category: 'Snacks' },
    { name: 'Pretzels', quantity: 95, price: 2.1, category: 'Snacks' },
    { name: 'Tea', quantity: 130, price: 2.5, category: 'Beverages' },
    { name: 'Coffee', quantity: 140, price: 3.0, category: 'Beverages' },
    { name: 'Avocado', quantity: 60, price: 1.5, category: 'Fruits' },
    { name: 'Grapes', quantity: 130, price: 2.0, category: 'Fruits' },
    { name: 'Spinach', quantity: 120, price: 0.5, category: 'Vegetables' },
    { name: 'Zucchini', quantity: 110, price: 0.6, category: 'Vegetables' },
    { name: 'Duck Breast', quantity: 40, price: 6.0, category: 'Meat' },
    { name: 'Crab', quantity: 35, price: 13.0, category: 'Fish' },
    { name: 'Greek Yogurt', quantity: 115, price: 1.2, category: 'Dairy' },
    { name: 'Macadamia Nuts', quantity: 50, price: 12.0, category: 'Nuts' },
    { name: 'Pancakes', quantity: 80, price: 3.0, category: 'Bakery' },
    { name: 'Trail Mix', quantity: 90, price: 5.0, category: 'Snacks' },
    { name: 'Smoothie', quantity: 100, price: 4.0, category: 'Beverages' },
];

const addProducts = async () => {
    try {
        await Stock.insertMany(products);
        console.log('Products added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error adding products:', error);
        mongoose.connection.close();
    }
};

addProducts();
