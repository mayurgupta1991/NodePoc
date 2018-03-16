const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

const server = require('./serverPort');

const port = process.env.PORT || server.SERVER_PORT;

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('./server.log', `${log} \n`, err => {
        if(err) {
            console.log('Unable to append in log file');
        }
    });
    next();
});

hbs.registerPartials(`${__dirname}/src/views/partials`);

// nodemon server -e js,hbs (e stands out for extentions to look out for while compiling)

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(`${__dirname}/src/public`));

app.get('/about', (req, res) => {
    res.render(`${__dirname}/src/views/about.hbs`, {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.send('About Page');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${server.SERVER_PORT}`);
});