// Requirements 
const express = require('express');
const app = express();

// Middleware
app.use(express.static('public'));

// Start Server

app.listen(3000,()=>{
    console.log("HTTP server is listen at localhost:3000")
})