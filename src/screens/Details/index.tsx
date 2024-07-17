import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Layout, Loader, RNText } from "@src/components";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "@src/theme";
import ChapterCard from "./components/ChapterCard";
import { useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "@src/navigation/RootNav";
import useNovelStore from "src/store";

const NovelDetailScreen = () => {
	const { chapters, selectedNovelId, fetchAllChaptersTitles, isLoading } = useNovelStore();
	const params = useRoute<HomeStackRouteProp<"Detail">>().params!;

	useEffect(() => {
		fetchAllChaptersTitles(selectedNovelId!);
	}, []);

	const headerComponent = () => {
		return (
			<View style={styles.headerContainer}>
				<RNText style={styles.headerTitle}>{params.title}</RNText>
			</View>
		);
	};

	const sortedChapters = useMemo(() => {
		return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
	}, [chapters]);

	return (
		<Layout>
			<FlashList
				data={!isLoading ? sortedChapters : []}
				ListHeaderComponent={headerComponent}
				renderItem={({ item }) => <ChapterCard chapter={item} />}
				keyExtractor={(item) => item._id}
				estimatedItemSize={30}
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
	},
});
