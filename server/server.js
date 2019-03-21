'use strict';
// Load dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid access_token sent in the Authorization header
const authCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://<your.auth0.com>/.well-known/jwks.json'
    }),
    // This is the identifier we set when we created the API
    audience: 'https://<your.auth0.com>/api/v2/',
    issuer: 'https://<your.auth0.com>/', // e.g., you.auth0.com
    algorithms: ['RS256']
});


// Public route
app.get('/api/deals/public', (req, res) => {
    let deals = [
        {
            id: 12231,
            name: 'Playstation 4 500GB Console',
            description: 'The Playstation 4 is the next gen console to own. With the best games and online experience.',
            originalPrice: 399.99,
            salePrice: 299.99
        },
        {
            id: 12234,
            name: 'Galaxy Note 7',
            description: 'The Note 7 has been fixed and will no longer explode. Get it an amazing price!',
            originalPrice: 899.99,
            salePrice: 499.99
        },
        {
            id: 12245,
            name: 'Macbook Pro 2016',
            description: 'The Macbook Pro is the de-facto standard for best in breed mobile computing.',
            originalPrice: 2199.99,
            salePrice: 1999.99
        }
    ];
    res.json(deals);
});

// Private route
app.get('/api/deals/private', authCheck, (req, res) => {
    let deals = [
        {
            id: 14423,
            name: 'Tesla S',
            description: 'Ride in style and say goodbye to paying for gas. The Tesla S is the car of the future.',
            originalPrice: 90000.00,
            salePrice: 75000.00
        },
        {
            id: 14553,
            name: 'DJI Phantom 4',
            description: 'The Drone revolution is here. Take to the skies with the DJI Phantom 4.',
            originalPrice: 1299.99,
            salePrice: 749.99
        },
        {
            id: 15900,
            name: 'iPhone 7 - Jet Black',
            description: 'Get the latest and greatest iPhone in the limited edition jet black.',
            originalPrice: 899.99,
            salePrice: 799.99
        }
    ];
    res.json(deals);
});

app.listen(3001);
console.log('Serving deals on localhost:3001');