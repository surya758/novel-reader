import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Layout, RNText } from "@src/components";
import { FlashList } from "@shopify/flash-list";
import { COLORS } from "@src/theme";
import ChapterCard from "./components/ChapterCard";
import { useRoute } from "@react-navigation/native";
import { HomeStackRouteProp } from "@src/navigation/RootNav";

const CHAPTERS = [
	{
		title: "Chapter 1",
	},
	{
		title: "Chapter 2",
	},
	{
		title: "Chapter 3",
	},
	{
		title: "Chapter 4",
	},
	{
		title: "Chapter 5",
	},
	{
		title: "Chapter 6",
	},
	{
		title: "Chapter 7",
	},
	{
		title: "Chapter 8",
	},
	{
		title: "Chapter 9",
	},
	{
		title: "Chapter 10",
	},
	{
		title: "Chapter 11",
	},
	{
		title: "Chapter 12",
	},
	{
		title: "Chapter 13",
	},
	{
		title: "Chapter 14",
	},
	{
		title: "Chapter 15",
	},
	{
		title: "Chapter 16",
	},
	{
		title: "Chapter 17",
	},
	{
		title: "Chapter 18",
	},
	{
		title: "Chapter 19",
	},
	{
		title: "Chapter 20",
	},
];

const NovelDetailScreen = () => {
	const params = useRoute<HomeStackRouteProp>().params!;
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
				data={CHAPTERS}
				ListHeaderComponent={headerComponent}
				renderItem={({ item, index }) => <ChapterCard chapter={item} index={index} />}
				keyExtractor={(item, index) => String(index)}
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
