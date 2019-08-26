const express = require('express');
const router = express.Router();
const axios = require('axios');



const config = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Auth-Token': process.env.ACCESS_TOKEN,
        'X-Auth-Client': process.env.CLIENT_ID
    }
};


app.get('/', function(req, res){
    res.redirect('/');
 });

router.get('/xhr/records', async (req, res) => {
    const URL = `${process.env.API_PATH}catalog/products`;

    const result = await axios.get(URL, config)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.data.data;
        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });

    res.send(result);
});


router.get('/xhr/categories', async (req, res) => {
    const URL = `${process.env.API_PATH}catalog/categories`;

    const result = await axios.get(URL, config)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.data.data;
        })
        .catch(err => {
            console.log('Fetch Error :-S', err);
        });

    res.send(result);
});


router.post('/xhr/records', async (req, res) => {
    const URL = `${process.env.API_PATH}catalog/products`;
    const payload = req.body;

    const result = await axios.post(URL, payload, config)
        .then(response => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }

            return response.data.data;
        })
        .catch(err => {
            console.log('Fetch Error :-S', err.response);
        });

    res.send(result);
});


module.exports = router;