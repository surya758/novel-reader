import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { If, Layout, RNText } from "@src/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackRouteProp, HomeStackNavigationProp } from "@src/navigation/RootNav";
import { COLORS } from "src/theme";
import ChapterMovement from "./components/ChapterMovement";
import useNovelStore from "src/store";
import { FlashList } from "@shopify/flash-list";

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
		(state) => state.chapters.find((chapter) => chapter._id === currentChapterId)!.content
	);
	const chapterNumber = useNovelStore(
		(state) => state.chapters.find((chapter) => chapter._id === currentChapterId)!.chapterNumber
	);

	const navigateChapter = (direction: string, chapterId: string | null = currentChapterId) => {
		if (!chapterId) return;

		const currentChapterIndex = chapters.findIndex((chapter) => chapter._id === chapterId);

		const newChapterId =
			direction === "next"
				? chapters[currentChapterIndex + 1]?._id
				: chapters[currentChapterIndex - 1]?._id;

		if (newChapterId) {
			selectChapter(newChapterId);
			fetchChapterContent(newChapterId);
			navigation.replace("Chapter", {
				title: chapters.find((chapter) => chapter._id === newChapterId)!.title,
			});
		}
	};

	const getWordCount = () => {
		return chapterContent?.reduce((acc, item) => acc + item.wordCount, 0);
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
				Chapter {chapterNumber}: {title}
			</RNText>
			<View style={styles.contentContainer}>
				<If condition={!isLoading} otherwise={<ChapterLoading />}>
					<FlashList
						data={chapterContent}
						ListHeaderComponent={() => (
							<RNText style={styles.wordCountText}>Word Count: {getWordCount()}</RNText>
						)}
						renderItem={({ item }) => <RNText style={styles.contentText}>{item.content}</RNText>}
						keyExtractor={(item) => item.id.toString()}
						estimatedItemSize={100}
					/>
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
	wordCountText: {
		marginTop: 10,
		fontSize: 16,
		color: COLORS.lightGrey,
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
