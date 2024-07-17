import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	StyleProp,
	ViewStyle,
	ScrollView,
} from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "src/theme";
import If from "./If";

type LayoutProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
	type?: "view" | "scroll";
	refreshControl?: React.ReactElement;
}>;

const Layout = ({ children, style, type = "view", refreshControl }: LayoutProps) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<If
				condition={type === "view"}
				otherwise={
					<ScrollView showsVerticalScrollIndicator={false} refreshControl={refreshControl}>
						{children}
					</ScrollView>
				}
			>
				<>{children}</>
			</If>
		</SafeAreaView>
	);
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.darkGrey,
	},
});
