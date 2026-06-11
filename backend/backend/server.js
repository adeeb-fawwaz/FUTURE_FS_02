const express = require('express');
const app = express();

// ... your middleware and routes (like /api/auth) go here ...

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server is actively running on port ${PORT}`);
});
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to the Client Lead Management System API!",
        status: "Server is up and running smoothly"
    });
});