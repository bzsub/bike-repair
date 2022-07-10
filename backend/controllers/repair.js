const RepairService = require('../services/repair');


const apiGetRepair = async (req, res) => {
    const repair = await RepairService.getRepair()
    if (!repair) res.sendStatus(400) 
    res.status(200).json(repair);
}  

const apiGetRepairToShop = async (req, res) => {
    console.log("controller", req.params.shop_id)
    if ( !req.params.repair_id ) return res.sendStatus(400)
    const repairs = await RepairService.getRepair(req.params.repair_id)
    if (!repairs) res.sendStatus(400) 
    res.status(200).json(repair);
} 

const apiSaveRepair = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment /* || 
        !req.body.problems ||  */
    ) return res.sendStatus(400)
    const repair = await RepairService.saveRepair(req.body)
    if (!repair) res.sendStatus(400) 
    res.status(200).json(repair);   
}  

const apiUpdateRepair = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment || 
        !req.body.problems || 
        res.locals.entity.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const repair = await RepairService.updateRepair(req.params.repair_id, req.body)
    if (!repair) res.sendStatus(400) 
    res.status(200).json(repair); 
}  

const apiDeleteRepair = async (req, res) => {
    if ( res.locals.entity.userId !== req.params.user_id) return res.sendStatus(400)
    const repair = await RepairService.deleteRepair(req.params.repair_id)
    if (!repair) res.sendStatus(400) 
    res.status(200).json(repair);
} 


module.exports = { 
    apiGetRepair,
    apiGetRepairToShop,
    apiSaveRepair,
    apiUpdateRepair,
    apiDeleteRepair
}