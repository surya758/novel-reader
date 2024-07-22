import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import RNText from "./RNText";
import { Chapter as ChapterDrawerProps } from "src/utils/types";
import useNovelStore from "src/store";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";
import { COLORS } from "src/theme";

type ChapterProps = {
	chapter: ChapterDrawerProps;
	navigation: DrawerNavigationHelpers;
};
const Chapter = ({ chapter, navigation }: ChapterProps) => {
	const { selectChapter, fetchChapterContent, setNovelReadingProgress, selectedNovelId } =
		useNovelStore();

	const handleOnPress = () => {
		selectChapter(chapter._id);
		fetchChapterContent(chapter._id);
		setNovelReadingProgress(selectedNovelId!, chapter._id);
		navigation.closeDrawer();
	};

	return (
		<View style={styles.itemContainer}>
			<Pressable onPress={handleOnPress}>
				<RNText style={styles.title}>
					Chapter {chapter.chapterNumber}: {capitaliseFirstLetterOfEveryWord(chapter.title)}
				</RNText>
			</Pressable>
		</View>
	);
};

export default Chapter;

const styles = StyleSheet.create({
	itemContainer: { padding: 10 },
	title: {
		color: COLORS.grey,
		fontSize: 14,
	},
});
