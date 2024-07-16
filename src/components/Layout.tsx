import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "src/theme";

type LayoutProps = PropsWithChildren<{}>;

const Layout = ({ children }: LayoutProps) => {
	return <View style={styles.container}>{children}</View>;
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.darkGrey,
		alignItems: "center",
		justifyContent: "center",
	},
});
