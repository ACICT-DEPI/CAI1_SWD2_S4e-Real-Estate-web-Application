/*  import React from "react";
import { Avatar, Menu } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const ProfileMenu = ({ user, logout }) => {
	const navigate = useNavigate();
	return (
		<Menu>
			<Menu.Target>
				<Avatar src={user?.picture} alt="user image" radius={"xl"} />
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
					Favourites
				</Menu.Item>

				<Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
					Bookings
				</Menu.Item>

				<Menu.Item
					onClick={() => {
						localStorage.clear();
						logout();
					}}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default ProfileMenu; 
 */

/* import React from "react";
import { Navigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
	return (
		<div>
			<div>ff</div>
			<div onClick={() => Navigate("./favourites", { replace: true })}>
				Favourites
			</div>

			<div>Booking</div>
		</div>
	);
};

export default ProfileMenu;
 */

import React from "react";
import { Avatar, Menu, useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
	const theme = useMantineTheme();
	const navigate = useNavigate();

	return (
		<Menu withinPortal={false}>
			<Menu.Target>
				<Avatar src={user?.picture} alt="user image" radius={"xl"} />
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item onClick={() => navigate("./favourites", { replace: true })}>
					Favourites
				</Menu.Item>

				<Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
					Bookings
				</Menu.Item>

				<Menu.Item
					onClick={() => {
						localStorage.clear();
						logout();
					}}
				>
					Logout
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default ProfileMenu;
