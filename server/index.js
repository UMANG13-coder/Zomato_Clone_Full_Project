import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport';
import session from 'express-session'

import privateConfig from './config/route.config';

import ConnectDB from './database/connection.js'
import Auth from './api/auth'
import restaurant from './api/resturant'
import User from './api/user'



dotenv.config();

const app = express();
const port = 3000;

privateConfig(passport);

app.use(express.json());
app.use(session({ secret: "ZomatoApp" }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is run"
    })
});

app.use('/auth', Auth);

app.use('/resturant', restaurant);

app.use('/user',User);

app.listen(port, () => {
    ConnectDB().then(() => {
        console.log('Server is Running !');
    }).catch((err) => {
        console.log('DataBase connection Failed !!');
        console.log(err);
    });
});