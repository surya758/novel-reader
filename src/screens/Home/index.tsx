import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Layout from "@src/components/Layout";
import NovelCard from "./components/NovelCard";
import { FlashList } from "@shopify/flash-list";
import useNovelStore from "@src/store";
import { Loader } from "src/components";

const HomeScreen = () => {
	const { novels, fetchAllNovels } = useNovelStore();

	useEffect(() => {
		fetchAllNovels();
	}, []);

	return (
		<Layout>
			<FlashList
				contentContainerStyle={styles.flashlistContent}
				data={novels}
				renderItem={({ item }) => <NovelCard novel={item} />}
				ListEmptyComponent={<Loader />}
				keyExtractor={(item) => item._id}
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
