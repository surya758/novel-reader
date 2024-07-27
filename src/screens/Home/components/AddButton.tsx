import { Alert, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "src/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import useNovelStore, { Mode } from "@src/store";

const AddButton = () => {
	const { setMode } = useNovelStore();

	return (
		<LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
			<Pressable
				onPress={() => {
					setMode(Mode.ADD_NOVEL);
				}}
				style={styles.lowerContainer}
				disabled={false}
			>
				<Ionicons name='add' size={24} color={COLORS.darkGrey} />
			</Pressable>
		</LinearGradient>
	);
};

export default AddButton;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 60,
		right: 30,
		height: 50,
		width: 50,
		borderRadius: 30,
		zIndex: 999,
	},
	lowerContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
