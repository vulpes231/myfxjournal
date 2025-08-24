const navLinks = [
	{ id: 1, name: "support" },
	{ id: 2, name: "pricing" },
];

const authLinks = [
	{ id: 1, name: "dashboard" },
	{ id: 2, name: "strategies" },
];

function getAccessToken() {
	const token = sessionStorage.getItem("token");
	if (!token) {
		console.log("Token not found!");
		return null;
	}
	return token;
}

export { navLinks, authLinks, getAccessToken };
