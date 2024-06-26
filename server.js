const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

// CORS middleware to allow requests from your front-end
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

// Route to handle signup
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Here you would normally save the data to a database
    console.log(`New user: ${username}, ${email}`);

    // Simulate a session token for the user
    const token = 'dummy-session-token';

    // Set a cookie for the session token
    res.cookie('session_token', token, { httpOnly: true });

    // Send a response back to the client
    res.json({ success: true, message: 'Signup successful!' });
});

// Route to check session
app.get('/check-session', (req, res) => {
    const token = req.cookies.session_token;
    if (token === 'dummy-session-token') {
        res.json({ signedIn: true });
    } else {
        res.json({ signedIn: false });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
