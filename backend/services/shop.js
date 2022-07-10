const Shop = require("../models/shop")

const getShops = async () => {
    try {
        const shops = await Shop.find(/* { "username": { "$regex": searchWord, "$options": "gi" }} */);
        return shops;
    } catch (error) {
        console.log(`Could not get shops ${ error }`)
    }
}

const getOneShop = async (shop_id) => {
    try {
        const shop = await Shop.findById({ "_id": shop_id });
        return shop;
    } catch (error) {
        console.log(`Could not find shop ${ error }`)
    }
}

const saveShop = async (shopData) => {
    try {
        const shop = await Shop.create(shopData);
        return shop;
    } catch (error) {
        console.log(`Could not save shop ${ error }`)
    }
}

const updateShop = async (shop_id, shopData) => {
    try {
        const shop = await Shop.findOneAndUpdate({ "_id": shop_id }, shopData,  { new: true });
        return shop;
    } catch (error) {
        console.log(`Could not update shop ${ error }`)
    }
}

const deleteShop = async (shop_id) => {
    try {
        const shop = await Shop.findOneAndDelete({ "_id": shop_id })
        return shop;
    } catch (error) {
        console.log(`Could not delete shop ${ error }`)
    }
}

module.exports = { 
    getShops,
    getOneShop,
    saveShop,
    updateShop,
    deleteShop
}