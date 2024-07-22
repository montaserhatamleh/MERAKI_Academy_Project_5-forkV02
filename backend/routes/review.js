const express = require ("express")
const reviewRouter = express.Router()

reviewRouter.post("/", reviewsController.createReview);
reviewRouter.get("/:id", reviewsController.getReviewById);
const { getReviewsForRestaurant, getReviewById, createReview } = require('../controllers/reviewsController');

reviewRouter.get('/:restaurant_id', getReviewsForRestaurant);
reviewRouter.get('/:id', getReviewById);
reviewRouter.post('/:restaurant_id', createReview);

module.exports = reviewRouter