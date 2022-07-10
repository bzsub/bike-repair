const RepairService = require('../services/repair');


const apiGetRepair = async (req, res) => {
    const repair = await RepairService.getRepair()
    if (!repair) res.sendStatus(400) 
    res.json(repair);
}   

const apiSaveRepair = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment || 
        !req.body.problems || 
        res.locals.user.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const repair = await RepairService.saveRepair(req.body)
    if (!repair) res.sendStatus(400) 
    res.json(repair);   
}  

const apiUpdateRepair = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment || 
        !req.body.problems || 
        res.locals.user.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const repair = await RepairService.updateRepair(req.params.repair_id, req.body)
    if (!repair) res.sendStatus(400) 
    res.json(repair); 
}  

const apiDeleteRepair = async (req, res) => {
    if ( res.locals.user.userId !== req.params.user_id) return res.sendStatus(400)
    const repair = await RepairService.deleteRepair(req.params.repair_id)
    if (!repair) res.sendStatus(400) 
    res.json(repair);
} 


module.exports = { 
    apiGetRepair,
    apiSaveRepair,
    apiUpdateRepair,
    apiDeleteRepair
}