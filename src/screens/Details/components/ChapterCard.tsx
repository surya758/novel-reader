import type { Chapter } from "@src/utils/types";
import { COLORS } from "@src/theme";
import { Pressable, StyleSheet, View } from "react-native";
import { RNText } from "@src/components";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp } from "@src/navigation/RootNav";
import useNovelStore from "src/store";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";

const ChapterCard = ({ chapter }: { chapter: Chapter }) => {
	const { fetchChapterContent, selectChapter, setNovelReadingProgress, selectedNovelId } =
		useNovelStore();
	const navigation = useNavigation<HomeStackNavigationProp<"Chapter">>();

	const handleOnPress = () => {
		selectChapter(chapter._id);
		fetchChapterContent(chapter._id);
		setNovelReadingProgress(selectedNovelId!, chapter._id);
		navigation.navigate("Chapter", { title: chapter.title });
	};

	return (
		<Pressable style={styles.chapterCardContainer} onPress={handleOnPress}>
			<RNText style={styles.chapterCardText} numberOfLines={2} ellipsizeMode='tail'>
				Chapter {chapter.chapterNumber}: {capitaliseFirstLetterOfEveryWord(chapter.title)}
			</RNText>
		</Pressable>
	);
};

export default ChapterCard;

const styles = StyleSheet.create({
	chapterCardContainer: {
		minHeight: 30,
		justifyContent: "center",
		borderBottomWidth: 1,
		borderBottomColor: COLORS.lightGrey,
		margin: 10,
		paddingBottom: 2,
	},
	chapterCardText: {
		fontSize: 16,
		color: COLORS.lightGrey,
		fontFamily: "Lora-Regular",
	},
});
