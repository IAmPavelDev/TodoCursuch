const { model } = require("mongoose");
const ItemScheme = require("./../Scheme/ItemScheme");
const { v4: uuidv4 } = require('uuid');

class ItemRepository {
    itemModel = model("Item", ItemScheme)

    async create(title, content) {
        return await this.itemModel.create({
            itemId: uuidv4(),
            title,
            content
        });
    }

    async getById(itemId) {
        return await this.itemModel.findOne({ itemId });
    }

    async getAll() {
        return await this.itemModel.find();
    }

    async updateItem(itemId, updateData) {
        return await this.itemModel.findOneAndUpdate({ itemId }, updateData, { new: true });
    }

    async deleteItem(itemId) {
        return await this.itemModel.deleteOne({ itemId });
    }
}

module.exports = new ItemRepository();