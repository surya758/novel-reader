import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { If, Layout, Loader, RNText } from "@src/components";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "@src/theme";
import ChapterCard from "./components/ChapterCard";
import { useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "@src/navigation/RootNav";
import useNovelStore from "@src/store";

const NovelDetailScreen = () => {
	const { chapters, selectedNovelId, fetchAllChaptersTitles, isLoading } = useNovelStore();
	const params = useRoute<HomeStackRouteProp<"Detail">>().params!;
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
		fetchAllChaptersTitles(selectedNovelId!);
	}, []);

	const headerComponent = () => {
		return (
			<View style={styles.headerContainer}>
				<RNText style={styles.headerTitle}>{params.title}</RNText>
				<If condition={!isLoading} otherwise={null}>
					<RNText style={styles.length}>Number of Chapters: {chapters.length}</RNText>
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
		height: 50,
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
});
