const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Database Connection
mongoose.connect('mongodb://127.0.0.1/ticket_system').then(()=>{
    console.log('MongoDB Connected!');
}).catch(err=>{console.log('MongoDB connection error! ', err)});

app.get('/', (req, res) => {
    res.send('<h1> App is Running on localhost:5173. This is the backend server </h1>')
})

// POST endpoint to receive form data
app.post('/register', (req, res) => {
    const data = req.body;

    // Handle the data, save it to a database or send it to another service
    console.log('Form data received:', data);
    const user = new User(data);
    user.save().then(() =>{
        console.log('data saved to DB') ;
    }).catch((e) => {
        console.log('error occured in data saving', e) ;
    });

    // Respond with a success message
    res.json({ message: 'Form data received successfully' });
});

// POST endpoint to receive form data
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = User.findOne({email});
        if(user){
            if (user.password === password) {
                res.status(200).json({ message: 'Login successful', userId: user.id });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
