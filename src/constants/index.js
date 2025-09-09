const navLinks = [
	{ id: 1, name: "home", path: "/" },
	// { id: 2, name: "pricing", path: "/pricing" },
	{ id: 3, name: "support", path: "/support" },
	{ id: 4, name: "position size calculator", path: "/calculator" },
];

const authLinks = [
	{ id: 1, name: "dashboard", path: "/dashboard" },
	{ id: 2, name: "trade history", path: "/history" },
	{ id: 3, name: "position size calculator", path: "/calculator" },
];

const footerLinks = [
	{ id: 1, name: "privacy" },
	{ id: 2, name: "terms & conditions" },
	{ id: 3, name: "faq" },
	{ id: 4, name: "support" },
];

const liveServer = `https://server.rhs40gs.store`;
const devServer = `http://localhost:4000`;

function getAccessToken() {
	const token = sessionStorage.getItem("token");
	if (!token) {
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
