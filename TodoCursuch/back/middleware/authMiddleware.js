const { verify } = require("jsonwebtoken");

module.exports = function (req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401);
		}
		const decoded = verify(token, "SECRET_KEY");
		req.user = decoded;
		next();
	} catch (e) {
		res.status(401);
	}
};
