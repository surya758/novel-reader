import { Pressable, StyleSheet, View, RefreshControl, Dimensions } from "react-native";
import React, { useState } from "react";
import { If, Layout, Loader, RNText } from "@src/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ChapterDrawerNavigationProp } from "@src/navigation/RootNav";
import { COLORS } from "@src/theme";
import ChapterMovement from "./components/ChapterMovement";
import useNovelStore from "@src/store";
import { FlashList } from "@shopify/flash-list";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

const ChapterScreen = () => {
	const navigation = useNavigation<ChapterDrawerNavigationProp>();
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

	const title = chapters.find((chapter) => chapter._id === currentChapterId)!.title;

	const openDrawer = () => {
		navigation.openDrawer();
	};

	const gestureHandler = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd((_event, success) => {
			"worklet";
			if (success) {
				runOnJS(openDrawer)();
			}
		});

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
			navigation.navigate("ChapterDrawer");
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
			<If condition={!isLoading} otherwise={<ChapterLoading />}>
				<RNText style={styles.titleText}>
					Chapter {chapterNumber}: {capitaliseFirstLetterOfEveryWord(title)}
				</RNText>

				<View style={styles.contentContainer}>
					<GestureDetector gesture={gestureHandler}>
						<FlashList
							data={chapterContent}
							ListHeaderComponent={() => (
								<RNText style={styles.wordCountText}>Word Count: {getWordCount()}</RNText>
							)}
							renderItem={({ item }) => <RNText style={styles.contentText}>{item.content}</RNText>}
							keyExtractor={(item) => item.id.toString()}
							estimatedItemSize={200}
						/>
					</GestureDetector>
				</View>

				<ChapterAction />
			</If>
		</Layout>
	);
};

export default ChapterScreen;

const styles = StyleSheet.create({
	layout: {
		paddingStart: 10,
		paddingEnd: 10,
	},
	contentContainer2: {
		flex: 1,
		alignItems: "center",
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
