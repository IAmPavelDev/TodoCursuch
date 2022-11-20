const UserRepository = require("../Repositories/UserRepository");


module.exports = async function (req, res, next) {
    try {
        const user = await UserRepository.findByName(req.user.username)
        if (!user) {
            throw new Error("user not found")
        }
        if (user.isAdmin) next();
        throw new Error("user doesn`t have admin rights")

    } catch (e) {
        // res.status(403) //у пользователя нет прав доступа к этому endpoint
    }
}