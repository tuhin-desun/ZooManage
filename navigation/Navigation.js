import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginStack from "./LoginStack";
import DrawerNavigation from "./DrawerNavigation";
import AppContext from "../context/AppContext";

export default class Navigation extends React.Component {
	static contextType = AppContext;

	render = () => (
		<NavigationContainer>
			{this.context.userDetails === null ? (
				<LoginStack />
			) : (
				<DrawerNavigation />
			)}
		</NavigationContainer>
	);
}
