const express = require("express");
const {authorize}  = require('../middleware/authentication')
const router = express.Router();

let { addReview , deleteReview} = require('../controller/reviewController')

router.post('/:id' ,authorize, addReview)
router.get('/:id/:reviewId',authorize , deleteReview)

module.exports= router;