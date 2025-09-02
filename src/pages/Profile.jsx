import React, { useEffect } from "react";

const Profile = () => {
	useEffect(() => {
		document.title = "Journo - Profile";
	}, []);
	return <div>Profile</div>;
};

export default Profile;
