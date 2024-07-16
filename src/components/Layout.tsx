import { SafeAreaView, StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { COLORS } from "src/theme";

type LayoutProps = PropsWithChildren<{
	style?: StyleProp<ViewStyle>;
}>;

const Layout = ({ children, style }: LayoutProps) => {
	return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>;
};

export default Layout;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.darkGrey,
	},
});
