const RepairService = require('../services/repair');


/* const apiGetRepair = async (req, res) => {
    const repair = await RepairService.getRepair()
    if (!repair) return res.sendStatus(400) 
    res.status(200).json(repair);
}   */

const apiGetRepairById = async (req, res) => {
    const repair = await RepairService.getRepairById(req.params.repair_id)
    if (!repair) return res.status(400) .json(null)
    res.status(200).json(repair);
}  

const apiGetRepairToShop = async (req, res) => {
    console.log("controller", req.params.shop_id)
    if ( !req.params.shop_id ) return res.sendStatus(400)
    const repairs = await RepairService.getRepairsToShop(req.params.shop_id)
    if (!repairs) return res.sendStatus(400) 
    res.status(200).json(repairs);
} 

const apiSaveRepair = async (req, res) => {
    if (
        !req.body.user_id || 
        !req.body.shop_id || 
        !req.body.comment /* || 
        !req.body.problems ||  */
    ) return res.sendStatus(400)
    const repair = await RepairService.saveRepair(req.body)
    if (!repair) return res.sendStatus(400) 
    res.status(200).json(repair);   
}  

const apiUpdateRepair = async (req, res) => {
    if (
        !req.body.status /* || 
         !req.body.shop_id || 
        !req.body.comment || 
        !req.body.problems || 
        res.locals.entity.userId !== req.params.user_id */
    ) return res.sendStatus(400)
    const repair = await RepairService.updateRepair(req.params.repair_id, req.body)
    if (!repair) return res.sendStatus(400) 
    res.status(200).json(repair); 
}  

/* const apiDeleteRepair = async (req, res) => {
    if ( res.locals.entity.userId !== req.params.user_id) return res.sendStatus(400)
    const repair = await RepairService.deleteRepair(req.params.repair_id)
    if (!repair) return res.sendStatus(400) 
    res.status(200).json(repair);
}  */


module.exports = { 
    //apiGetRepair,
    apiGetRepairToShop,
    apiGetRepairById,
    apiSaveRepair,
    apiUpdateRepair,
    //apiDeleteRepair
}