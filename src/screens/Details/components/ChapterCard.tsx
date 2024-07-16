import type { Chapter } from "@src/utils/types";
import { COLORS } from "@src/theme";
import { Pressable, StyleSheet, View } from "react-native";
import { RNText } from "@src/components";
import { useNavigation } from "@react-navigation/native";
import { HomeStackNavigationProp } from "@src/navigation/RootNav";

const ChapterCard = ({ chapter, index }: { chapter: Chapter; index: number }) => {
	const navigation = useNavigation<HomeStackNavigationProp>();
	const handleOnPress = () => {
		console.log(`Chapter ${index + 1} pressed`);
		navigation.navigate("Chapter");
	};

	return (
		<Pressable style={styles.chapterCardContainer} onPress={handleOnPress}>
			<RNText style={styles.chapterCardText} numberOfLines={2} ellipsizeMode='tail'>
				Chapter {index + 1}: {chapter.title}
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
		borderBottomColor: COLORS.grey,
		margin: 10,
		paddingBottom: 2,
	},
	chapterCardText: {
		fontSize: 16,
		color: COLORS.white,
	},
});
