const Rating = require("../models/rating");

const getRatings = async () => {
    try {
        const ratings = await Rating.find();
        return ratings;
    } catch (error) {
        console.log(`Could not get ratings ${ error }`)
    }
}

const saveRating = async (ratingData) => {
    try {
        const rating = await Rating.create(ratingData);
        return rating;
    } catch (error) {
        console.log(`Could not save rating ${ error }`)
    }
}

const updateRating = async (rating_id, ratingData) => {
    try {
        const rating = await Rating.findOneAndUpdate({ "_id": rating_id}, ratingData, { new: true });
        return rating;
    } catch (error) {
        console.log(`Could not update rating ${ error }`)
    }
}

const deleteRating = async (rating_id) => {
    try {
        const rating = await Rating.findOne({ "_id": rating_id })
        return rating;
    } catch (error) {
        console.log(`Could not delete rating ${ error }`)
    }
}

module.exports = { 
    getRatings,
    saveRating,
    updateRating,
    deleteRating
}