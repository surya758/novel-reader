import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@src/theme";

const NovelCard = () => {
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: COLORS.darkGrey,
			alignItems: "center",
			justifyContent: "center",
		},
	});

	return (
		<View style={styles.container}>
			<Text>NovelCard</Text>
		</View>
	);
};

export default NovelCard;
