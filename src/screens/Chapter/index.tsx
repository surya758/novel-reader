import { Pressable, StyleSheet, View, RefreshControl } from "react-native";
import React, { useState } from "react";
import { If, Layout, Loader, RNText } from "@src/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackRouteProp, HomeStackNavigationProp } from "@src/navigation/RootNav";
import { COLORS } from "@src/theme";
import ChapterMovement from "./components/ChapterMovement";
import useNovelStore from "@src/store";
import { FlashList } from "@shopify/flash-list";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";

const ChapterScreen = () => {
	const navigation = useNavigation<HomeStackNavigationProp<"Chapter">>();
	const { title } = useRoute<HomeStackRouteProp<"Chapter">>().params;
	const [refreshing, setRefreshing] = useState(false);

	const {
		currentChapterId,
		isLoading,
		selectChapter,
		fetchChapterContent,
		chapters,
		setNovelReadingProgress,
		selectedNovelId,
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

		setNovelReadingProgress(selectedNovelId!, newChapterId);

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
				<ChapterMovement icon='caret-back-outline' onPress={() => navigateChapter("previous")} />
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
				<Loader />
			</View>
		);
	};

	const handleRefresh = () => {
		setRefreshing(true);
		navigateChapter("previous");
		setRefreshing(false);
	};

	return (
		<Layout
			style={styles.layout}
			type='scroll'
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
		>
			<RNText style={styles.titleText}>
				Chapter {chapterNumber}: {capitaliseFirstLetterOfEveryWord(title)}
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
						estimatedItemSize={200}
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
		marginTop: 10,
		fontSize: 24,
		color: COLORS.white,
		fontFamily: "Lora-MediumItalic",
	},
	wordCountText: {
		marginTop: 10,
		fontSize: 16,
		color: COLORS.lightGrey,
		fontFamily: "Lora-Bold",
	},
	contentText: {
		marginTop: 10,
		fontSize: 16,
		color: COLORS.lightGrey,
		fontFamily: "Lora-Regular",
	},
	chapterAction: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginVertical: 20,
	},
	chaptersText: {
		fontSize: 20,
		color: COLORS.lightGrey,
		fontFamily: "Lora-Regular",
	},
});
