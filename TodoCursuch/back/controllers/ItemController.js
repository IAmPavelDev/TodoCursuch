const ItemRepository = require("./../Repositories/ItemRepository");

class ItemController {
	async create(req, res) {
		const { title, content } = req.body;
		const newItem = await ItemRepository.create(title, content);
		res.send({ newItem })
	}

	async get(req, res) {
		const items = await ItemRepository.getAll();
		res.json({ items });
	}

	async edit(req, res) {
		const { itemId, ...rest } = req.body;
		const item = await ItemRepository.updateItem(itemId, rest);
		res.json({ item });
	}

	async deleteItem(req, res) {
		const { itemId } = req.body;
		const item = await ItemRepository.deleteItem(itemId);
		res.json({ ...item });
	}
}

module.exports = new ItemController();
