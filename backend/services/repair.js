const Repair = require("../models/repair");

const getRepairs = async () => {
    try {
        const repairs = await Repair.find();
        return repairs;
    } catch (error) {
        console.log(`Could not get repairs ${ error }`)
    }
}

const getRepairById = async (repair_id) => {
    try {
        const repairs = await Repair.findOne({ "_id": repair_id });
        return repairs;
    } catch (error) {
        console.log(`Could not get repairsById ${ error }`)
    }
}

const getRepairsToShop = async (shop_id) => {
    console.log("service", shop_id)
    try {
        const repairs = await Repair.find({ shop_id: shop_id });
        return repairs;
    } catch (error) {
        console.log(`Could not get repairsToShop ${ error }`)
    }
}

const saveRepair = async (repairData) => {
    try {
        const repair = await Repair.create(repairData);
        return repair;
    } catch (error) {
        console.log(`Could not save repair ${ error }`)
    }
}

const updateRepair = async (repair_id, repairData) => {
    try {
        const repair = await Repair.findOneAndUpdate({ "_id": repair_id }, repairData, { new: true });
        return repair;
    } catch (error) {
        console.log(`Could not update repair ${ error }`)
    }
}

const deleteRepair = async (repair_id) => {
    try {
        const repair = await Repair.findOne({ "_id": repair_id })
        return repair;
    } catch (error) {
        console.log(`Could not delete repair ${ error }`)
    }
}

module.exports = { 
    getRepairs,
    getRepairsToShop,
    getRepairById,
    saveRepair,
    updateRepair,
    deleteRepair
}