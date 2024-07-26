const express = require ("express")
const reviewRouter = express.Router()

const { getReviewsForRestaurant, getReviewById, createReview } = require('../controllers/reviewsController');
const authentication = require("../middleware/authentication")

reviewRouter.get('/:restaurant_id', getReviewsForRestaurant);
reviewRouter.get('/:id', getReviewById);
reviewRouter.post('/:restaurant_id', authentication,createReview);

module.exports = reviewRouter