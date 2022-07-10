const RatingService = require('../services/rating');


const apiGetRatings = async (req, res) => {
    const ratings = await RatingService.getRatings()
    if (!ratings) return res.sendStatus(400) 
    return res.status(200).json(ratings);
}   

const apiSaveRating = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment || 
        !req.body.rating || 
        res.locals.entity.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const rating = await RatingService.saveRating(req.body)
    if (!rating) return res.sendStatus(400) 
    return res.status(200).json(rating);   
}  

const apiUpdateRating = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment || 
        !req.body.rating || 
        res.locals.entity.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const rating = await RatingService.updateRating(req.params.rating_id, req.body)
    if (!rating) return res.sendStatus(400) 
    return res.status(200).json(rating); 
}  

const apiDeleteRating = async (req, res) => {
    if ( res.locals.entity.userId !== req.params.user_id) return res.sendStatus(400)
    const rating = await RatingService.deleteRating(req.params.rating_id)
    if (!rating) return res.sendStatus(400) 
    return res.status(200).json(rating);
} 


module.exports = { 
    apiGetRatings,
    apiSaveRating,
    apiUpdateRating,
    apiDeleteRating
}