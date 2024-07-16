import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Layout, RNText } from "@src/components";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "@src/theme";
import ChapterCard from "./components/ChapterCard";
import { useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "@src/navigation/RootNav";
import useNovelStore from "src/store";

const NovelDetailScreen = () => {
	const { chapters } = useNovelStore();
	const params = useRoute<HomeStackRouteProp<"Detail">>().params!;
	const headerComponent = () => {
		return (
			<View style={styles.headerContainer}>
				<RNText style={styles.headerTitle}>{params.title}</RNText>
			</View>
		);
	};

	return (
		<Layout>
			<FlashList
				data={chapters}
				ListHeaderComponent={headerComponent}
				renderItem={({ item }) => <ChapterCard chapter={item} />}
				keyExtractor={(item) => String(item.id)}
				estimatedItemSize={30}
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
