const path = require('path');
const express = require('express');
const app = express();

app.use('/config', function(req,res){
    res.send({
        api_url: process.env.API_URL
    });
});

app.use('/', express.static(path.resolve(__dirname, 'client')));

app.listen(process.env.PORT || 3000);