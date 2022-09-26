import express from 'express';

import { UserModal } from '../../database/user';

const Router = express.Router();

Router.post("/signup", async (req, res) => {

    try {
        await UserModal.findByEmailAndPhone(req.body.credentials);

        const newUser = UserModal.create(req.body.credentials);
        const tokens = newUser.genrateJsonWebTokens();
        return res.status(200).json({ tokens, status: "success" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

Router.post("/signin", async (req, res) => {

    try {
        const user = await UserModal.findByEmailAndPassword(req.body.credentials);
        const tokens = user.genrateJsonWebTokens();
        return res.status(200).json({ tokens, status: "success" })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})