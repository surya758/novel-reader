import type { Chapter } from "@src/utils/types";
import { COLORS } from "@src/theme";
import { Pressable, StyleSheet } from "react-native";
import { If, RNText } from "@src/components";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp } from "@src/navigation/RootNav";
import useNovelStore, { Mode } from "src/store";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";
import { RadioButton } from "react-native-paper";
import { useState } from "react";

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
	const {
		fetchChapterContent,
		selectChapter,
		setNovelReadingProgress,
		selectedNovelId,
		mode,
		setChapterToDelete,
	} = useNovelStore();
	const navigation = useNavigation<HomeStackNavigationProp<"ChapterDrawer">>();
	const [isChecked, setIsChecked] = useState(false);

	const handleOnPress = () => {
		if (mode === Mode.DELETE_CHAPTER) {
			markForDeletion();
			return;
		}
		selectChapter(chapter._id!);
		fetchChapterContent(chapter._id!);
		setNovelReadingProgress(selectedNovelId!, chapter._id!);
		navigation.navigate("ChapterDrawer");
	};
	const markForDeletion = () => {
		setIsChecked((prev) => !prev);
		setChapterToDelete(chapter._id!);
	};

	return (
		<Pressable style={styles.chapterCardContainer} onPress={handleOnPress}>
			<If condition={mode === Mode.DELETE_CHAPTER}>
				<RadioButton
					value={chapter.title}
					status={isChecked ? "checked" : "unchecked"}
					onPress={markForDeletion}
					theme={{ colors: { primary: COLORS.lightGrey } }}
				/>
			</If>

			<RNText style={styles.chapterCardText} numberOfLines={2} ellipsizeMode='tail'>
				Chapter {chapter.chapterNumber}: {capitaliseFirstLetterOfEveryWord(chapter.title)}
			</RNText>
		</Pressable>
	);
};

export default ChapterCard;

const styles = StyleSheet.create({
	chapterCardContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey,
		paddingVertical: 10,
		marginHorizontal: 10,
	},
	chapterCardText: {
		fontSize: 16,
		color: COLORS.lightGrey,
		fontFamily: "Lora-Regular",
		maxWidth: "90%",
	},
});
