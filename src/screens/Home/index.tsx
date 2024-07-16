import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "@src/components/Layout";
import { COLORS } from "@src/theme";
import { useNavigation } from "@react-navigation/native";
import NovelCard from "./components/NovelCard";
import { FlashList } from "@shopify/flash-list";

const NOVEL_DATA = [
	{
		title: "The Beginning After The End",
		image: "https://www.novelupdates.com/img/noimagefound.jpg",
	},
	{
		title: "The Beginning After The End",
		image: "https://www.novelupdates.com/img/noimagefound.jpg",
	},
	{
		title: "The Beginning After The End",
		image: "https://www.novelupdates.com/img/noimagefound.jpg",
	},
	{
		title: "The Beginning After The End",
		image: "https://www.novelupdates.com/img/noimagefound.jpg",
	},
];

const HomeScreen = () => {
	return (
		<Layout style={styles.layout}>
			<FlashList
				contentContainerStyle={styles.flashlistContent}
				data={NOVEL_DATA}
				renderItem={({ item }) => <NovelCard item={item} />}
				keyExtractor={(item, index) => String(index)}
				estimatedItemSize={10}
				numColumns={3}
			/>
		</Layout>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	layout: {},
	flashlistContent: {
		padding: 10,
	},
});
