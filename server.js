const express = require('express');
const app = express();

// ... your middleware and routes (like /api/auth) go here ...

const PORT = 5000; 
app.listen(PORT, () => {
    console.log(`Server is actively running on port ${PORT}`);
});