const navLinks = [
	{ id: 1, name: "support" },
	{ id: 2, name: "pricing" },
];

const authLinks = [
	{ id: 1, name: "dashboard" },
	{ id: 2, name: "trades" },
	{ id: 3, name: "strategies" },
];

const liveServer = ``;
const devServer = `http://localhost:4000`;

function getAccessToken() {
	const token = sessionStorage.getItem("token");
	if (!token) {
		// console.log("Token not found!");
		return null;
	}
	return token;
}

export { navLinks, authLinks, getAccessToken, liveServer, devServer };
