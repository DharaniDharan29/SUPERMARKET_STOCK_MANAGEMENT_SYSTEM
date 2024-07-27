// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simple hardcoded users for demonstration
const users = [
    { username: 'admin', password: 'admin', type: 'admin' },
    { username: 'user', password: 'user', type: 'user' }
];

// Login route
app.post('/login', (req, res) => {
    const { username, password, type } = req.body;
    const user = users.find(u => u.username === username && u.password === password && u.type === type);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
