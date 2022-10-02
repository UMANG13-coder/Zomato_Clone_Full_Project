import express from 'express'
import { ReviewModel } from '../../database/allModules'
import passport from 'passport';

const Router = express.Router();

/**
 * Route     /:resId
 * Des       Get all review for a particular restaurant
 * Params    resId
 * Access    Public
 * Method    GET
 */
Router.get('/:resId', async (req, res) => {
    try {
        const { resId } = req.params;
        const getReviews = await ReviewModel.findOne({ resturant: resId }).sort({ createdAt: -1 });
        return res.status(200).json({ getReviews });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /new
 * Des       Add new food/restaurant review and rating
 * Params    none
 * Access    Private
 * Method    POST
 */
Router.post('/new', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { _id } = req.user;
        const { reviewData } = req.body;
        const newReview = await ReviewModel.create({ ...reviewData, user: _id });
        return res.status(200).json({ newReview })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route     /delete/:id
 * Des       Delete a specific review
 * Params    _id
 * Access    Private
 * Method    Delete
 */
Router.delete('/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const deleteReview = await ReviewModel.findByIdAndDelete({ _id: id, user: user._id });
        if (!deleteReview) return res.status(400).json({ Error: " Review not Found ! " })
        return res.status(200).json({ message: "Review Deleted Successfully ", deleteReview });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;
