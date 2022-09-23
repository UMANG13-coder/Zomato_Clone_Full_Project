import express from 'express'
import dotenv from 'dotenv'

import ConnectDB from './database/connection'

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "server is run"
    })
})

app.listen(port, () => {
    ConnectDB().then(() => {
        console.log('Server is Running !');
    }).catch((err) => {
        console.log('DataBase connection Failed !!');
        console.log(err);
    });
});