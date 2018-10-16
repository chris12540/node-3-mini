const sessions = {};
let nextSessionId = 1;

module.exports = (req, res, next) => {
	const createSession = () => {
		const newSession = {};
		sessions[nextSessionId] = newSession;
		req.session = newSession;
		res.setHeader("set-cookie", "cookieId=" + nextSessionId + "; path=/;");
		nextSessionId++;
	};

	if (req.headers.cookie) {
		const sessionID = req.headers.cookie.split("=")[1];
		if (sessions[sessionID]) {
			req.session = sessions[sessionID];
		} else {
			createSession();
		}
	} else {
		createSession();
	}
	next();
};
