const { Schema } = require("mongoose");

const ItemScheme = new Schema({
    itemId: String,
    title: String,
    content: String
});

module.exports = ItemScheme;