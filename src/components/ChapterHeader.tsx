import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "src/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import useNovelStore from "src/store";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const WINDOW_WIDTH = Dimensions.get("window").width;

function ChapterHeader() {
	const navigation = useNavigation();
	const { currentChapterId, selectedNovelId, novels, chapters } = useNovelStore();
	const chapterNumber = useNovelStore(
		(state) => state.chapters.find((chapter) => chapter._id === currentChapterId)!.chapterNumber
	);
	const novelTitle = novels.find((novel) => novel._id === selectedNovelId)!.title;
	const chapterTitle = chapters.find((chapter) => chapter._id === currentChapterId)!.title;

	return (
		<View style={styles.header}>
			<View style={styles.lowerContainer}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<Ionicons name='arrow-back-circle' size={24} color={COLORS.lightGrey} />
				</TouchableOpacity>
				<View style={styles.titleBox}>
					<Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode='tail'>
						{capitaliseFirstLetterOfEveryWord(novelTitle)}
					</Text>
					<FontAwesome name='angle-double-right' size={12} color={COLORS.lightGrey} />
					<Text style={styles.headerTitle2} numberOfLines={1} ellipsizeMode='tail'>
						Chapter {chapterNumber}: {capitaliseFirstLetterOfEveryWord(chapterTitle)}
					</Text>
				</View>
			</View>
			<View />
		</View>
	);
}

export default ChapterHeader;

const styles = StyleSheet.create({
	lowerContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		padding: 10,
		backgroundColor: COLORS.darkGrey,
		height: 90,
	},
	titleBox: {
		maxWidth: WINDOW_WIDTH * 0.9,
		flexDirection: "row",
		gap: 5,
		alignItems: "center",
		justifyContent: "center",
	},
	backButton: {
		marginRight: 10,
	},
	headerTitle: {
		fontSize: 13,
		color: COLORS.grey,
		maxWidth: WINDOW_WIDTH * 0.4,
		fontFamily: "Lora-MediumItalic",
	},
	headerTitle2: {
		fontSize: 13,
		color: COLORS.grey,
		maxWidth: WINDOW_WIDTH * 0.45,
		fontFamily: "Lora-MediumItalic",
	},
});
