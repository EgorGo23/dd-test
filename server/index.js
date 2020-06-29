const path = require('path');
const express = require('express');
const readFileAsync = require('./utils/readFileAsync');
const writeFileAsync = require('./utils/writeFileAsync');
const addId = require('./utils/addId');


const app = express();
const port = process.env.PORT || 4320;


app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api', async (req, res) => {
    try {
        const astronauts = await readFileAsync('data', 'astronauts.json');
        const withId = addId(JSON.parse(astronauts));

        res.status(200).json(withId);    
    } catch (e) {
        res.status(500).json({
            message: 'Server error',
        });
    }
})

app.post('/api', async (req, res) => {
    try {
        await writeFileAsync('data', 'astronauts.json', req.body);
    
        res.status(200);
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        })
    }
    
})

app.listen(port, () => console.log(`Listening on port ${port}`));