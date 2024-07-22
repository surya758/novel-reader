import { StyleSheet, View, Dimensions, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { If, Layout, Loader, RNText } from "@src/components";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "@src/theme";
import ChapterCard from "./components/ChapterCard";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "@src/navigation/RootNav";
import useNovelStore from "@src/store";
import { Chapter } from "src/utils/types";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "@rneui/base";

const NovelDetailScreen = () => {
	const {
		chapters,
		selectedNovelId,
		fetchAllChaptersTitles,
		isLoading,
		novelReadingProgress,
		novels,
	} = useNovelStore();
	const params = useRoute<HomeStackRouteProp<"Detail">>().params!;
	const [refreshing, setRefreshing] = useState(false);
	const flashListRef = useRef<FlashList<Chapter>>(null);
	const characters = novels.find((novel) => novel._id === selectedNovelId)?.characters;
	const width = Dimensions.get("window").width;

	useFocusEffect(
		useCallback(() => {
			if (chapters.length > 0 && novelReadingProgress.length > 0) {
				const currentNovel = novelReadingProgress.find(
					(novel) => novel.novelId === selectedNovelId
				);
				const indexOfReadingChapter = chapters.findIndex(
					(chapter) => chapter._id === currentNovel?.chapterId
				);

				if (indexOfReadingChapter < 15) return;

				if (indexOfReadingChapter === 0) return;

				if (indexOfReadingChapter !== -1 && flashListRef.current) {
					// Use setTimeout to ensure this runs after the current render cycle
					setTimeout(() => {
						flashListRef.current?.scrollToIndex({
							index: indexOfReadingChapter,
							animated: indexOfReadingChapter > 100 ? false : true,
							viewPosition: 0.2,
						});
					}, 300);
				}
			}
		}, [chapters, novelReadingProgress, selectedNovelId])
	);

	useEffect(() => {
		fetchAllChaptersTitles(selectedNovelId!);
	}, []);

	const headerComponent = () => {
		return (
			<View style={styles.headerContainer}>
				<RNText style={styles.headerTitle}>{params.title}</RNText>
				<If condition={!isLoading} otherwise={null}>
					<RNText style={styles.length}>Number of Chapters: {chapters.length}</RNText>
					{!!characters!.length && (
						<Carousel
							mode='parallax'
							width={width}
							height={400}
							style={styles.carousalContainer}
							data={characters || []}
							scrollAnimationDuration={1000}
							renderItem={({ item, index }) => (
								<View style={styles.carousalItemContainer}>
									<Image
										source={{ uri: item.imageUrl }}
										style={styles.imageStyle}
										PlaceholderContent={<ActivityIndicator />}
									/>
									<RNText style={styles.characterName}>{item.name}</RNText>
								</View>
							)}
						/>
					)}
				</If>
			</View>
		);
	};

	const sortedChapters = useMemo(() => {
		return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
	}, [chapters]);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchAllChaptersTitles(selectedNovelId!);
		setRefreshing(false);
	};

	return (
		<Layout>
			<FlashList
				onRefresh={handleRefresh}
				refreshing={refreshing}
				ref={flashListRef}
				data={!isLoading ? sortedChapters : []}
				ListHeaderComponent={headerComponent}
				renderItem={({ item }) => <ChapterCard chapter={item} />}
				keyExtractor={(item) => item._id}
				estimatedItemSize={500}
				ListEmptyComponent={<Loader />}
			/>
		</Layout>
	);
};

export default NovelDetailScreen;

const styles = StyleSheet.create({
	headerContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 20,
		color: COLORS.white,
		fontWeight: "bold",
		fontFamily: "Lora-Regular",
	},
	length: {
		color: COLORS.lightGrey,
		fontSize: 16,
		fontFamily: "Lora-Regular",
	},
	imageStyle: {
		width: 300,
		height: 400,
		aspectRatio: 3 / 4,
		resizeMode: "contain",
		borderRadius: 30,
	},
	carousalContainer: {
		marginBottom: -35,
	},
	carousalItemContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	characterName: {
		color: COLORS.white,
		fontSize: 20,
		fontFamily: "Lora-SemiBoldItalic",
	},
});
