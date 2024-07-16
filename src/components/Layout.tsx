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
}>;

const Layout = ({ children, style, type = "view" }: LayoutProps) => {
	return (
		<SafeAreaView style={[styles.container, style]}>
			<If
				condition={type === "view"}
				otherwise={<ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>}
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
