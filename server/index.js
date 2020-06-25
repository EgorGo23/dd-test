const express = require('express');
const path = require('path');
const readFileAsync = require('./utils/readFileAsync');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4300;

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/api/astronauts', async (req, res) => {
    try {
        const astronauts = await readFileAsync('data', 'astronauts.json');
        res.status(200).send(astronauts);    
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        });
    }
})

app.listen(port, () => console.log(`Listening on port ${port}`));