import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { If, Layout, Loader, RNText } from "@src/components";
import { useNavigation } from "@react-navigation/native";
import { ChapterDrawerNavigationProp } from "@src/navigation/RootNav";
import { COLORS } from "@src/theme";
import ChapterMovement from "./components/ChapterMovement";
import useNovelStore from "@src/store";
import { FlashList } from "@shopify/flash-list";
import Animated, {
	runOnJS,
	useAnimatedRef,
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { capitaliseFirstLetterOfEveryWord } from "src/utils/helpers";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const OVERSCROLL_THRESHOLD = 200;
const NAVIGATION_COOLDOWN = 1000;
const height = Dimensions.get("window").height;

const ChapterScreen = () => {
	const navigation = useNavigation<ChapterDrawerNavigationProp>();
	const aref = useAnimatedRef<Animated.ScrollView>();
	const scrollY = useSharedValue(0);
	const contentHeight = useSharedValue(0);
	const layoutHeight = useSharedValue(0);
	let lastNavigationTime = 0;

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

	const navigateChapter = useCallback(
		(direction: "next" | "previous") => {
			const currentTime = Date.now();
			console.log(isLoading);
			if (currentTime - lastNavigationTime < NAVIGATION_COOLDOWN || isLoading) return;

			lastNavigationTime = currentTime;
			const currentChapterIndex = chapters.findIndex((chapter) => chapter._id === currentChapterId);
			const newChapterId =
				direction === "next"
					? chapters[currentChapterIndex + 1]?._id
					: chapters[currentChapterIndex - 1]?._id;

			if (newChapterId) {
				setNovelReadingProgress(selectedNovelId!, newChapterId);
				selectChapter(newChapterId);
				fetchChapterContent(newChapterId);
				navigation.navigate("ChapterDrawer");
			}
		},
		[
			chapters,
			currentChapterId,
			setNovelReadingProgress,
			selectedNovelId,
			selectChapter,
			fetchChapterContent,
			isLoading,
		]
	);

	const gestureHandler = Gesture.Tap()
		.numberOfTaps(2)
		.onEnd((_event, success) => {
			"worklet";
			if (success) {
				runOnJS(openDrawer)();
			}
		});

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

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y;
			contentHeight.value = event.contentSize.height;
			layoutHeight.value = event.layoutMeasurement.height;

			const isAtEndOfContent = scrollY.value >= contentHeight.value - layoutHeight.value - 50;

			if (isAtEndOfContent) {
				const overscrollAmount = scrollY.value - (contentHeight.value - layoutHeight.value);
				if (overscrollAmount > OVERSCROLL_THRESHOLD) {
					runOnJS(navigateChapter)("next");
				}
			} else if (scrollY.value < -OVERSCROLL_THRESHOLD) {
				runOnJS(navigateChapter)("previous");
			}
		},
	});

	return (
		<Layout
			style={styles.layout}
			type='scroll'
			ref={aref}
			onScroll={scrollHandler}
			scrollEventThrottle={16}
			bounces={true}
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

				{/* <ChapterAction /> */}
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
		alignItems: "center",
	},
	chapterLoadingContainer: {
		marginTop: 20,
		flex: 1,
		flexGrow: 1,
		height: 0.8 * height,
		justifyContent: "center",
		alignItems: "center",
	},
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
