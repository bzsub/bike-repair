const jwt = require("jsonwebtoken");
const UserService = require("../services/user")


const apiCreateUser = async (req, res) => {
    if (!req.body?.username) return res.sendStatus(400);

    const user = await UserService.saveUser({
        username: req.body.username,
        providers: res.locals.entity.providers,
    });

    const token = jwt.sign({ userId: user._id, entity: user.entity, providers: user.providers }, process.env.SECRET_KEY, { expiresIn: "1h" });
    return res.status(200).json({ token });
}

const apiGetOneUser = async (req, res) => {
    const user = await UserService.getOneUser(req.params.user_id)
    if (!user) return res.sendStatus(400) 
    return res.status(200).json(user);
} 

const apiGetSearchedUsers = async (req, res) => {
    const users = await UserService.getSearchedUsers(req.query.search)
    if (!users) return res.sendStatus(400) 
    return res.status(200).json(users);
}  

const apiUpdateUser = async (req, res) => {
    console.log("update")
    if ( !req.body.username || 
        /* !req.body.prof_pics || 
        !req.body.bikes || */ 
        res.locals.entity.userId !== req.params.user_id
    ) return res.sendStatus(400)
    const user = await UserService.updateUser(req.params.user_id, req.body)
    if (!user) return res.sendStatus(400) 
    return res.sendStatus(200);
}

const apiDeleteUser = async (req, res) => { 
    if ( res.locals.entity.userId !== req.params.user_id ) return res.sendStatus(400) 
    const user = await UserService.deleteUser(req.params.user_id)
    if (!user) return res.sendStatus(400) 
    return res.status(200).json(user);
}


module.exports = { 
    apiCreateUser,
    apiGetOneUser,
    apiGetSearchedUsers,
    apiUpdateUser,
    apiDeleteUser
}