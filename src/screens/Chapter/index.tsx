import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { If, Layout, RNText } from "@src/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackRouteProp, HomeStackNavigationProp } from "@src/navigation/RootNav";
import { COLORS } from "src/theme";
import ChapterMovement from "./components/ChapterMovement";
import useNovelStore from "src/store";

const ChapterScreen = () => {
	const navigation = useNavigation<HomeStackNavigationProp<"Chapter">>();
	const { title } = useRoute<HomeStackRouteProp<"Chapter">>().params;
	const {
		currentChapterId,
		isLoading,
		selectChapter,
		fetchChapterContent,
		selectedNovelId,
		chapters,
	} = useNovelStore();
	const chapterContent = useNovelStore(
		(state) => state.chapters.find((chapter) => chapter.id === currentChapterId)!.content
	);

	const navigateChapter = (direction: string, chapterId: number | null = currentChapterId) => {
		if (!chapterId) return;
		const newChapterId = direction === "next" ? chapterId + 1 : chapterId - 1;
		if (newChapterId > 0 && newChapterId < chapters.length) {
			selectChapter(newChapterId);
			fetchChapterContent(selectedNovelId!, newChapterId);
			navigation.replace("Chapter", {
				title: `Chapter ${newChapterId}`,
			});
		}
	};

	const ChapterAction = () => {
		return (
			<View style={styles.chapterAction}>
				<ChapterMovement icon='caret-back-sharp' onPress={() => navigateChapter("previous")} />
				<Pressable onPress={() => navigation.goBack()}>
					<RNText style={styles.chaptersText}>Chapters</RNText>
				</Pressable>
				<ChapterMovement icon='caret-forward-outline' onPress={() => navigateChapter("next")} />
			</View>
		);
	};

	const ChapterLoading = () => {
		return (
			<View style={styles.chapterLoadingContainer}>
				<ActivityIndicator />
			</View>
		);
	};

	return (
		<Layout style={styles.layout} type='scroll'>
			<RNText style={styles.titleText}>
				Chapter {currentChapterId}: {title}
			</RNText>
			<View style={styles.contentContainer}>
				<If condition={!isLoading} otherwise={<ChapterLoading />}>
					<RNText style={styles.contentText}>{chapterContent}</RNText>
				</If>
			</View>

			<ChapterAction />
		</Layout>
	);
};

export default ChapterScreen;

const styles = StyleSheet.create({
	layout: {
		paddingStart: 10,
		paddingEnd: 10,
	},
	chapterLoadingContainer: { marginTop: 20 },
	contentContainer: { minHeight: 40 },
	titleText: {
		fontSize: 24,
		color: COLORS.white,
		fontWeight: "bold",
	},
	contentText: {
		marginTop: 10,
		fontSize: 16,
		color: COLORS.lightGrey,
	},
	chapterAction: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginVertical: 20,
	},
	chaptersText: {
		fontSize: 20,
		color: COLORS.white,
		fontWeight: "bold",
	},
});
