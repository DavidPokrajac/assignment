const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv').config();

const corsOptions = {
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}
 
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
    const passedLevel = req.query.level

    const options = {
        method: 'GET',
        url: `http://api.duckduckgo.com/?q=${passedLevel}&format=json`,
        params: {level: passedLevel}
    }

    axios.request(options).then((response) => {
        res.json(response.data)

    }).catch((error) => {
        console.error(error)
    })
})

app.listen(port, () => 'Listening on port ' + port);