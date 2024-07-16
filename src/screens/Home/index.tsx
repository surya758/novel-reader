import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "@src/components/Layout";
import NovelCard from "./components/NovelCard";
import { FlashList } from "@shopify/flash-list";
import useNovelStore from "@src/store";

const DUMMY_CHAPTERS = [
	{
		id: 1,
		title: "Chapter 1",
		content: "",
	},
	{
		id: 2,
		title: "Chapter 2",
		content: "",
	},
	{
		id: 3,
		title: "Chapter 3",
		content: "",
	},
	{
		id: 4,
		title: "Chapter 4",
		content: "",
	},
	{
		id: 5,
		title: "Chapter 5",
		content: "",
	},
];

const HomeScreen = () => {
	const { novels, setChapters } = useNovelStore();

	React.useEffect(() => {
		setChapters(DUMMY_CHAPTERS);
	}, []);

	return (
		<Layout>
			<FlashList
				contentContainerStyle={styles.flashlistContent}
				data={novels}
				renderItem={({ item }) => <NovelCard novel={item} />}
				keyExtractor={(item, index) => String(index)}
				estimatedItemSize={10}
				numColumns={3}
			/>
		</Layout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	flashlistContent: {
		padding: 10,
	},
});
