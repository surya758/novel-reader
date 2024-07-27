import { Alert, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "src/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import useNovelStore, { Mode } from "@src/store";

const Delete = () => {
	const { chaptersToDelete, setMode, mode, deleteChapters } = useNovelStore();

	const handleChapterDeletion = () => {
		if (chaptersToDelete && mode === Mode.DELETE_CHAPTER) {
			Alert.alert("Delete", "Are you sure you want to delete these chapters?", [
				{
					text: "Cancel",
					onPress: () => console.log("Cancel"),
				},
				{
					text: "Yes",
					onPress: () => {
						deleteChapters(chaptersToDelete);
						setMode(null);
					},
				},
			]);
		}
	};
	return (
		<LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.container}>
			<Pressable onPress={handleChapterDeletion} style={styles.lowerContainer} disabled={false}>
				<Ionicons name='trash' size={24} color={COLORS.darkGrey} />
			</Pressable>
		</LinearGradient>
	);
};

export default Delete;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 80,
		right: 20,
		height: 50,
		width: 50,
		borderRadius: 30,
	},
	lowerContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
