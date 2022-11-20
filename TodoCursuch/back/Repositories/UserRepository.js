const { model } = require("mongoose");
const UserScheme = require("../Scheme/UserScheme");
const { v4: uuidv4 } = require('uuid');

class UserRepository {
    userModel = model("User", UserScheme); //создаём модель user-a для доступа к базе данных  

    async findAll() {
        return await this.userModel.find();
    }

    async findByName(username) {
        return await this.userModel.findOne({ username })
    }

    async createUser(username, password) {
        const newUser = new this.userModel({ username, password, userId: uuidv4(), isAdmin: false });
        await newUser.save();
        return await this.findByName(username);
    }

    async updateUser(userId, newData) {
        return await this.userModel.findOneAndUpdate({ userId }, newData, { new: true });
    }

    async deleteUser(userId) {
        return await this.userModel.findByIdAndDelete(userId);
    }
}

module.exports = new UserRepository();