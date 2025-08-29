const navLinks = [
	{ id: 1, name: "home", path: "/" },
	{ id: 2, name: "pricing", path: "/pricing" },
	{ id: 3, name: "support", path: "/support" },
];

const authLinks = [
	{ id: 1, name: "dashboard", path: "/dashboard" },
	{ id: 2, name: "trades", path: "/trades" },
	{ id: 3, name: "analytics", path: "/analytics" },
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
