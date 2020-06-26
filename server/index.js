const express = require('express');
const path = require('path');
const readFileAsync = require('./utils/readFileAsync');
const writeFileAsync = require('./utils/writeFileAsync');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 4320;

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

app.get('/astronauts', async (req, res) => {
    try {
        const astronauts = await readFileAsync('data', 'astronauts.json');
        res.status(200).send(astronauts);    
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        });
    }
})

app.post('/astronauts', async (req, res) => {
    try {
        const astronautsStr = await readFileAsync('data', 'astronauts.json');
        const astronautsArr = JSON.parse(astronautsStr);
        astronautsArr.push(req.body);
        
        await writeFileAsync('data', 'astronauts.json', astronautsArr);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
    
})

app.put('/', async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
    console.log(req);
})

app.delete('/', async (req, res) => {
    try {

    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: 'Server error'
        })
    }
    console.log(req);
})

app.listen(port, () => console.log(`Listening on port ${port}`));