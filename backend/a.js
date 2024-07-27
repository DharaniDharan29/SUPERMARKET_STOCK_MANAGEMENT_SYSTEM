const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/super', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        seedSuppliers();
    })
    .catch(err => console.log(err));

const SupplierSchema = new mongoose.Schema({
    supplierName: String,
    shopName: String,
    address: String,
    mobile: String,
    category: String  // Adding category field
});

const Supplier = mongoose.model('Supplier', SupplierSchema);

const suppliers = [
    { supplierName: 'John Doe', shopName: 'Fresh Fruits', address: '123 Fruit St', mobile: '1234567890', category: 'Fruits' },
    { supplierName: 'Jane Smith', shopName: 'Veggie Delight', address: '456 Veggie Ave', mobile: '2345678901', category: 'Vegetables' },
    { supplierName: 'Sam Brown', shopName: 'Organic Goods', address: '789 Organic Blvd', mobile: '3456789012', category: 'Organic' },
    { supplierName: 'Alice Johnson', shopName: 'Dairy Best', address: '101 Dairy Ln', mobile: '4567890123', category: 'Dairy' },
    { supplierName: 'Mike Wilson', shopName: 'Bakery Fresh', address: '202 Bakery St', mobile: '5678901234', category: 'Bakery' },
    { supplierName: 'Sara Davis', shopName: 'Meat Market', address: '303 Meat Rd', mobile: '6789012345', category: 'Meat' },
    { supplierName: 'Tom Lee', shopName: 'Seafood Select', address: '404 Seafood Dr', mobile: '7890123456', category: 'Seafood' },
    { supplierName: 'Emma Harris', shopName: 'Spice Rack', address: '505 Spice Ct', mobile: '8901234567', category: 'Spices' },
    { supplierName: 'Chris Young', shopName: 'Beverage Barn', address: '606 Beverage Way', mobile: '9012345678', category: 'Beverages' },
    { supplierName: 'Anna Scott', shopName: 'Grain Store', address: '707 Grain Pl', mobile: '0123456789', category: 'Grains' },
    { supplierName: 'Bob White', shopName: 'Nutty Nuts', address: '808 Nutty Rd', mobile: '1234509876', category: 'Nuts' },
    { supplierName: 'David Green', shopName: 'Sweet Treats', address: '909 Sugar Ln', mobile: '2345617890', category: 'Sweets' },
    { supplierName: 'Laura Gray', shopName: 'Frozen Foods', address: '101 Frozen Ave', mobile: '3456728901', category: 'Frozen' },
    { supplierName: 'Peter Black', shopName: 'Condiments Corner', address: '202 Condiment Pl', mobile: '4567839012', category: 'Condiments' },
    { supplierName: 'Rachel Blue', shopName: 'Pantry Palace', address: '303 Pantry Rd', mobile: '5678940123', category: 'Pantry' }
];

async function seedSuppliers() {
    try {
        await Supplier.deleteMany(); // Clear existing data
        await Supplier.insertMany(suppliers);
        console.log('Suppliers seeded successfully');
    } catch (error) {
        console.error('Error seeding suppliers:', error);
    } finally {
        mongoose.disconnect(); // Close the connection after seeding
    }
}
