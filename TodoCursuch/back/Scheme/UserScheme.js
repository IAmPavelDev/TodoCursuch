const { Schema } = require("mongoose");

const UserScheme = new Schema({
    userId: String,
    username: String,
    password: String,
    isAdmin: Boolean,
});

module.exports = UserScheme;