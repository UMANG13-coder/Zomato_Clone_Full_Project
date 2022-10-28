import express from 'express'
import dotenv from 'dotenv'
import passport from 'passport';
import session from 'express-session'

import privateConfig from './config/route.config';

import ConnectDB from './database/connection.js'
import Auth from './api/auth'
import restaurant from './api/resturant'
import User from './api/user'
import Food from './api/food'
import Order from './api/order'
import Menu from './api/menu'
import Order from './api/order'
import Review from './api/review'
// import Image from './api/image'

dotenv.config();

const app = express();
const port = 3000;

privateConfig(passport);

app.use(express.json());
app.use(session({ secret: process.env.SECRETORKEY }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is running !"
    })
});

app.use('/auth', Auth);
app.use('/resturant', restaurant);
app.use('/user', User);
app.use('/food', Food);
app.use('/order', Order);
app.use('/menu', Menu);
app.use('/order', Order);
app.use('/review', Review);
// app.use('/image', Image);


app.listen(port, () => {
    ConnectDB().then(() => {
        console.log('Server is Running !');
    }).catch((err) => {
        console.log('DataBase connection Failed !!');
        console.log(err);
    });
});