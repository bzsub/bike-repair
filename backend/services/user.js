const User = require("../models/user")

const getSearchedUsers = async (searchWord) => {
    try {
        const users = await User.find({ "username": { "$regex": searchWord, "$options": "gi" }});
        //
        return users;
    } catch (error) {
        console.log(`Could not get users ${ error }`)
    }
}

const getOneUser = async (user_id) => {
    try {
        const user = await User.findById({ "_id": user_id });
        return user;
    } catch (error) {
        console.log(`Could not find user ${ error }`)
    }
}

const saveUser = async (userData) => {
    try {
        const user = await User.create(userData);
        return user;
    } catch (error) {
        console.log(`Could not save user ${ error }`)
    }
}

const updateUser = async (user_id, userData) => {
    console.log("update service")
    try {
        const user = await User.findOneAndUpdate({"_id": user_id}, userData,  { new: true });
        return user;
    } catch (error) {
        console.log(`Could not update user ${ error }`)
    }
}

const deleteUser = async (user_id) => {
    try {
        const user = await User.findOneAndDelete({ "_id": user_id })
        return user;
    } catch (error) {
        console.log(`Could not delete user ${ error }`)
    }
}

module.exports = { 
    getSearchedUsers,
    getOneUser,
    saveUser,
    updateUser,
    deleteUser
}