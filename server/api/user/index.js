import express from "express";
import { UserModel } from "../../database/allModules";
import passport from "passport";

const Router = express.Router();

/**
 * Route     /
 * Des       Get authorized user data
 * Params    none
 * Access    Private
 * Method    GET
 */
Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, fullName, phoneNumber, address } = req.user;

      return res.json({ user: { email, fullName, phoneNumber, address } });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /:_id
 * Des       Get user data (For review system) by _id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    const { fullName } = getUser;
    if (!getUser) return res.status(404).json({ message: 'User not Found !' });
    return res.status(200).json({ fullName });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

export default Router;