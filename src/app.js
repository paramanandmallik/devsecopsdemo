const express = require('express');
const app = express();
const fs = require('fs');

// Hardcoded Secret (Secrets Manager will replace this)
const secretKey = "hardcoded_secret_key_12345";

// SQL Injection vulnerability
app.get('/user', (req, res) => {
    const userId = req.query.id;
    const query = `SELECT * FROM users WHERE id=${userId}`;  // SQL Injection flaw
    res.send(`Fetching data for user ID: ${userId}`);
});

// File system exposure vulnerability
app.get('/file', (req, res) => {
    const fileName = req.query.file;
    fs.readFile(`/files/${fileName}`, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading file');
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

