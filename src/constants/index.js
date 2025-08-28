const navLinks = [
	{ id: 1, name: "home" },
	{ id: 2, name: "pricing" },
	{ id: 3, name: "support" },
];

const authLinks = [
	{ id: 1, name: "dashboard" },
	{ id: 2, name: "trades" },
	{ id: 3, name: "strategies" },
];
const footerLinks = [
	{ id: 1, name: "privacy" },
	{ id: 2, name: "terms & conditions" },
	{ id: 3, name: "faq" },
	{ id: 4, name: "support" },
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

export {
	navLinks,
	authLinks,
	getAccessToken,
	liveServer,
	devServer,
	footerLinks,
};
