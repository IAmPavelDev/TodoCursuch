const { hash, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const UserRepository = require("../Repositories/UserRepository");

function jwtGenerator(id, username) {
	return sign({ id, username }, "SECRET_KEY", {
		expiresIn: "24h",
	});
}

class UserController {

	async getAll(req, res) {
		const users = (await UserRepository.findAll()).map(user => {
			const { userId, username, isAdmin } = user;
			return { userId, username, isAdmin };
		})
		const { userId: currentUserId } = await UserRepository.findByName(req.user.username);
		res.json({ users, currentUserId })
	}

	checkIsAuth(req, res) {
		res.json({isAuth: true, isAdmin: req.user.isAdmin});
	}

	async changeAdminRoles(req, res) {
		const { userId: userIdReq, isAdminSet } = req.body;
		if (!userIdReq) {
			res.json({ error: "UserId was not provided" });
			return;
		}
		const { userId, username, isAdmin } = await UserRepository.updateUser(userIdReq, { isAdmin: isAdminSet });
		if (!userId && !username) {
			res.json({ error: "can't find user" });
			return;
		}
		res.json({ userId, username, isAdmin })
	}

	async registration(req, res) {
		const { username, password } = req.body;

		if (!username || !password) {
			res.json({ error: "Error, username or password are not provided" });
			return;
		}
		const candidate = await UserRepository.findByName(username);
		if (candidate) {
			res.json({ error: "User already existed" });
			return;
		}
		const hashPassword = await hash(password, 5);
		const user = await UserRepository.createUser(username, hashPassword);
		const token = jwtGenerator(user.userId, username);
		res.json({ token, isUserAdmin: user.isAdmin, userId: user.userId });
	}

	async login(req, res) {
		const { username, password } = req.body;
		const user = await UserRepository.findByName(username);
		if (!user) {
			res.send({ error: "User does not exist" });
			return;
		}
		let comparePassword = compareSync(password, user.password);
		if (!comparePassword) {
			res.json("Invalid password");
			return;
		}
		const token = jwtGenerator(user.userId, username);
		res.json({ token, isUserAdmin: user.isAdmin, userId: user.userId });
	}
}

module.exports = new UserController();
